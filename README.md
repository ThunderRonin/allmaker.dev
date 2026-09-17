# Amirali Daliri (@ThunderRonin) — Systems Portfolio

Production portfolio and systems console for **Amirali Daliri** ([@ThunderRonin](https://github.com/ThunderRonin)), built with **Astro**, **Tailwind CSS**, and **Three.js**, configured for deployment on **Cloudflare Workers**.

Calibrated for **OLED 3AM** optical conditions (deep `#000000` pitch blacks, softened zinc-slate typography, and restrained laser crimson accents).

---

## 🚀 Cloudflare Deployment

### 1. Direct Cloudflare Workers Deploy
```bash
yarn deploy
# Runs 'astro build && yarn wrangler deploy' configured with @astrojs/cloudflare
```

### 2. Local Development
```bash
yarn dev
# Server running at http://localhost:4321
```

---

## 🌐 Featured Systems ([@ThunderRonin](https://github.com/ThunderRonin))

- **[`kasb-platform`](https://github.com/Kasb-Platform)**: High-concurrency enterprise ERP & double-entry financial ledger platform (.NET 10, C# 14, EF Core, Flutter, Docker Swarm, Linux).
- **[`allknower`](https://github.com/ThunderRonin/allknower)**: AI orchestration service for semantic RAG over vector trees (Elysia, Bun, Prisma, LanceDB, OpenRouter).
- **[`allcodex-core`](https://github.com/ThunderRonin/allcodex-core)**: Knowledge base grimoire data engine (custom Trilium ETAPI fork).
- **[`aryamehr-calendar`](https://github.com/ThunderRonin/aryamehr-calendar)**: Zepp OS Persian & Zoroastrian Astronomical Calendar for Amazfit GTR 4.
- **[`AllTracker`](https://github.com/ThunderRonin/AllTracker)**: Cross-platform habit and activity telemetry in Dart & Flutter.

---

## 🎨 Architectural Design Decisions

- **Eye-Friendly Pure OLED Background (`#000000`):** Hardware pixel shutoff on OLED panels, preventing ocular fatigue.
- **Minimalist 3D Topological Lattice ([`TopologyCanvas.astro`](file:///home/allmaker/projects/portfolio/src/components/TopologyCanvas.astro)):** Ethereal floating constellation with subtle connectivity and mouse parallax.
- **Interactive CLI Shell ([`InteractiveCLI.astro`](file:///home/allmaker/projects/portfolio/src/components/InteractiveCLI.astro)):** Supports commands like `help`, `repos`, `kasb`, `allknower`, `allcodex`, `aryamehr`, `alltracker`, `skills`, `contact`, `resume`.
