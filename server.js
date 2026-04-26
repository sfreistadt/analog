const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const SIGNUPS_FILE = path.join(__dirname, 'signups.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load existing signups or start fresh
function loadSignups() {
  if (!fs.existsSync(SIGNUPS_FILE)) return [];
  try { return JSON.parse(fs.readFileSync(SIGNUPS_FILE, 'utf8')); }
  catch { return []; }
}

function saveSignups(signups) {
  fs.writeFileSync(SIGNUPS_FILE, JSON.stringify(signups, null, 2));
}

// POST /signup
app.post('/signup', (req, res) => {
  const { email, city, kids_ages } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const signups = loadSignups();

  // Deduplicate by email
  if (signups.find(s => s.email.toLowerCase() === email.toLowerCase())) {
    return res.json({ ok: true, duplicate: true });
  }

  signups.push({
    email: email.trim().toLowerCase(),
    city: (city || '').trim(),
    kids_ages: (kids_ages || '').trim(),
    signed_up_at: new Date().toISOString(),
  });

  saveSignups(signups);
  console.log(`[signup] ${email} — ${city || 'no city'}`);
  res.json({ ok: true });
});

// GET /admin — simple signup list
app.get('/admin', (req, res) => {
  const signups = loadSignups();
  const byCity = signups.reduce((acc, s) => {
    const city = s.city || 'Unknown';
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Analog — Signups</title>
      <style>
        body { font-family: monospace; padding: 40px; background: #fafafa; color: #222; }
        h1 { font-size: 18px; margin-bottom: 24px; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 40px; }
        th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid #ddd; font-size: 13px; }
        th { background: #f0f0f0; }
        .city-list { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 40px; }
        .city-pill { background: #222; color: #fff; padding: 6px 14px; border-radius: 20px; font-size: 13px; }
      </style>
    </head>
    <body>
      <h1>Analog — ${signups.length} signup${signups.length !== 1 ? 's' : ''}</h1>

      <h2 style="font-size:14px;margin-bottom:12px;">By city</h2>
      <div class="city-list">
        ${Object.entries(byCity).sort((a,b) => b[1]-a[1]).map(([city, count]) =>
          `<div class="city-pill">${city} (${count})</div>`
        ).join('')}
      </div>

      <h2 style="font-size:14px;margin-bottom:12px;">All signups</h2>
      <table>
        <thead><tr><th>#</th><th>Email</th><th>City</th><th>Kids ages</th><th>Date</th></tr></thead>
        <tbody>
          ${signups.map((s, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${s.email}</td>
              <td>${s.city || '—'}</td>
              <td>${s.kids_ages || '—'}</td>
              <td>${new Date(s.signed_up_at).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Analog running at http://localhost:${PORT}`);
  console.log(`Admin view:   http://localhost:${PORT}/admin`);
});
