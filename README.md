# Field Day

**Outdoor scavenger hunts for families. No screens required after you start.**

---

## What is this?

An app/website with a paradox at its core: its success metric is getting people *off* the app.

Field Day hands families a structured outdoor adventure — clues, discoveries, and small challenges — all designed for their own neighborhood. The platform takes 90 seconds. The experience takes 2–3 hours outside.

**The product is the experience, not a pointer to one.**

---

## Where we are

Early discovery. We have a working fake door (landing page + email capture) and a clear segment to start with: **parents with kids ages 6–12** who want to get outside but are paralyzed by planning fatigue.

### The insight
The enemy isn't desire — it's friction. Parents know what they *should* be doing on a Saturday. They just don't do it.

### The format
A scavenger hunt whose clues require the physical world:
- Find a building older than your parents. How do you know?
- Collect 5 things from the ground. Build the smallest possible sculpture. Leave it.
- Ask someone who works outside what the best part of their day was.
- Find something in nature that's exactly the color of your front door.

You print it. You go outside. Phone goes in the bag.

---

## This repo

| Path | What's here |
|---|---|
| `public/index.html` | Fake door landing page (Field Day) |
| `server.js` | Express server — serves landing page, captures signups |
| `docs/brief.md` | Project brief |
| `docs/market-brainstorm.md` | Six addressable segments + wedge hypotheses |
| `docs/segments/parents.md` | Deep dive on the parents segment |
| `docs/concepts/scavenger-hunt.md` | The core product format — how it works, format options, what to test |

---

## Running it locally

```bash
npm install
node server.js
```

Landing page → `http://localhost:4000`
Signup admin → `http://localhost:4000/admin`

---

## Docs

- [Brief](docs/brief.md)
- [Market brainstorm](docs/market-brainstorm.md)
- [Competitive landscape](docs/competitive-landscape.md)
- [Segment: Parents](docs/segments/parents.md)
- [Concept: Scavenger hunt format](docs/concepts/scavenger-hunt.md)

---

## Next steps

1. Write one complete Austin neighborhood hunt (10–12 clues, ages 6–12)
2. Give it to 5 families — watch what happens
3. Talk to 3–5 parents about the last 3 Saturdays
4. Test a post in one Austin parent Facebook group — no product, just the curated pick
