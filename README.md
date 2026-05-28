# Antilego

Marketing site for **Antilego** — an AI receptionist agency. Single-page static site with Cal.com booking embed.

## Stack

- Static `index.html` (no build step)
- [Cal.com](https://cal.com) inline embed for demo booking
- Optional React/Tailwind scaffolding in `app/`, `components/`, `lib/` for a future Next.js migration

## Local preview

```bash
npx serve .
# or
python3 -m http.server 3000
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com/new), import the **Antilego** repository.
3. Use defaults — Vercel detects a static site (no framework, no build command).
4. Deploy. The root `index.html` is served at `/`.

No environment variables are required for the marketing site.

## Repo layout

| Path | Purpose |
|------|---------|
| `index.html` | Production landing page |
| `vercel.json` | Static hosting settings |
| `app/`, `components/`, `lib/` | Optional Next.js migration stubs (not deployed today) |

The internal CRM lives in a separate project (`CRM_lite tool/`) and is not part of this deployment.
