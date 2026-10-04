# Amirali Daliri (@theAllmaker) — Systems Portfolio

Production portfolio and systems console for **Amirali Daliri** ([@ThunderRonin](https://github.com/ThunderRonin)), built with **Astro**, **Tailwind CSS**, and **Three.js**, configured for deployment on **Cloudflare Workers**.

Calibrated for **OLED 3AM** optical conditions (deep `#000000` pitch blacks, softened zinc-slate typography, and restrained laser crimson accents).

---

## 🚀 Cloudflare Deployment

### 1. Direct Cloudflare Workers Deploy
```bash
npm run deploy
# Runs 'astro build && wrangler deploy' configured with @astrojs/cloudflare
```

### 2. Local Development
```bash
npm run dev
# Server running at http://localhost:4321
```

### Resume downloads

The supplied final resume lives at `src/assets/resume.pdf`, bundled only into the server worker. To replace it, copy the new PDF there; do not put a resume in `public/`. The old generated-resume script has been removed.

Hero, contact, CLI, and `/?resume=1` entries open the same Turnstile dialog. Completion sends the token to `POST /resume`; the worker validates it with Cloudflare Siteverify before returning `amiralidaliri-final.pdf`. Downloads use a blob URL so they cannot reopen the gate. The dialog closes before its widget is removed, without resetting a successful challenge.

`GET /resume` redirects to the gate, never to a PDF. `/resume.pdf` is no longer a public asset. Verification requires the `resume-download` action and an `allmaker.dev` or `www.allmaker.dev` hostname. Replayed or expired tokens are rejected; responses are private and uncached. Deploy the worker, not only static assets.

The public sitekey defaults to the existing production widget. Set `PUBLIC_TURNSTILE_SITE_KEY` at build time to use a different widget, and configure its matching server secret:

```bash
npm exec wrangler secret put TURNSTILE_SECRET_KEY
```

Without the secret, downloads fail closed with HTTP 503. Never expose the secret through a `PUBLIC_` variable.

For local testing only, put `PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA` in ignored `.env.local` and `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA` in ignored `.dev.vars`. These are [Cloudflare's official test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/). The fixed dummy verification response is accepted only in development with the exact test secret; production still requires the real hostname and action. Remove the local test files before a production build.

Run `npm test` for authorization regressions. Server validation follows the [Turnstile Siteverify contract](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).

---

## 🌐 Featured Systems ([@ThunderRonin](https://github.com/ThunderRonin))

- **[`Kasb Platform`](https://github.com/Kasb-Platform)**: Financial ledger and B2B commerce services, ASP.NET Core/EF Core, Linux/Docker Swarm migration, Syncfusion Blink Persian RTL invoices, and preparation for SQL Server-to-PostgreSQL migration.
- **[`PetaProc`](https://github.com/PetaProc)**: Go/Pion WebRTC communications, LanceDB/Qdrant AI search, Asynq/Redis media processing, MinIO storage, OpenTelemetry/Sentry, and Flutter/Riverpod clients.
- **Dorj Wallet**: NestJS cryptocurrency APIs, Ethers.js wallet connectivity and smart-contract interactions, and Ledger SDK hardware signing.
- **Independent Software Engineer**: Freelance systems, technical bounties, protocol security, and custom automation for international clients.
- **[`AllKnower`](https://github.com/ThunderRonin/allknower)**: Bun/Elysia AI orchestration with RAG, LanceDB, local embeddings, OpenRouter routing, and MCP connectivity.
- **[`AllCodex Ecosystem`](https://github.com/ThunderRonin/allcodex-core)**: Portal built with Next.js and SvelteKit, integrated with AllKnower.
- **[`AryaMehr Calendar`](https://github.com/ThunderRonin/aryamehr-calendar)**: Zepp OS Persian and Zoroastrian astronomical calendar for Amazfit GTR 4.
- **[`AllTracker`](https://github.com/ThunderRonin/AllTracker)**: Desktop and mobile habit/telemetry tracker with Flutter, Riverpod, system tray integration, and offline-first SQLite.

---

## 🎨 Architectural Design Decisions

- **Eye-Friendly Pure OLED Background (`#000000`):** Hardware pixel shutoff on OLED panels, preventing ocular fatigue.
- **Interactive 3D Artifact Simulation ([`TopologyCanvas.astro`](src/components/TopologyCanvas.astro)):** Five orbiting polyhedra and seeker/orbiter/wanderer/evasive particles. Pointer movement attracts or repels particles, clicks inject impulses, and scrolling moves the scene. Geometry buffers and vector scratch space are reused during animation.
- **Interactive CLI Shell ([`InteractiveCLI.astro`](src/components/InteractiveCLI.astro)):** Supports `help`, `about`, `repos`, `kasb`, `petaproc`, `dorj`, `bounty`, `freelance`, `allknower`, `allcodex`, `aryamehr`, `alltracker`, `skills`, `education`, `contact`, `resume`, `uname -a`, `whoami`, `date`, and `clear`.

The interactive scene, expanded project/profile/CLI content, contact links, and Allmaker identity were recovered from the September 21 Cloudflare deployment, which contained changes absent from the original GitHub checkout. The recovered source retains the private final PDF and server-verified CAPTCHA flow.

### Content source

The final résumé at `src/assets/resume.pdf` is the source of truth for the profile, role dates and titles, project descriptions, technical skills, education, metadata, and CLI copy. Update those existing Astro components when replacing the résumé. Professional experience is displayed alongside selected projects; education appears in the About panel, and the technical index lists the résumé's skills. Do not reintroduce unsupported performance percentages, technology versions, or production guarantees from the recovered older deployment.
