# Super Key Insurance — Handover

## Project Status: **LIVE**

**Production URL:** https://super-key-insurance.vercel.app
**GitHub:** https://github.com/EvenFuzzball70/super-key-insurance
**Worktree:** `/Users/adelesam/.claude/worktrees/super-key-insurance/`

---

## Pages Deployed (4 static HTML files)

| File | Route | Description |
|------|-------|-------------|
| `index.html` | `/` | Home/Dashboard — hero, quick actions, active policies, recent activity |
| `quotes.html` | `/quotes.html` | Compare Quotes — 3-tier plans, step progress, feature checklists |
| `policies.html` | `/policies.html` | My Policies & Documents — stats grid, policy cards, download actions |
| `search.html` | `/search.html` | Search & Filter — search input, filter chips, provider list |

---

## Design System (shared across all files)

**Tokens** — Material 3 Expressive via Tailwind CDN config:
- Colors: full semantic palette (`primary`, `secondary`, `tertiary`, `surface-container-*`, `outline-variant`, `error`, etc.)
- Spacing: `base: 8px`, `stack-lg: 32px`, `gutter-desktop: 24px`, `margin-desktop: 64px`
- Radius: `DEFAULT: 4px`, `lg: 8px`, `xl: 12px`, `full: 9999px`
- Typography: `headline-lg` (32px) → `label-md` (12px) scale, Inter font
- RTL-ready Arabic copy mixed with English

**Components:**
- Bento cards (hover lift + shadow)
- Material Symbols Outlined (variable font: FILL 0→1)
- Mobile bottom nav + desktop side rail (responsive `md:`)
- Staggered reveal animation (cubic-bezier, 80ms stagger)
- Time-based greeting (Morning/Afternoon/Evening + Arabic)

**Dark mode:** Tokens defined, `darkMode: "class"` — needs `<html class="dark">` toggle to activate

---

## Deployment

```bash
# Vercel (already configured)
vercel --prod
# Output: https://super-key-insurance.vercel.app

# .vercelignore excludes .claude folder (prevents 245MB upload)
```

---

## Commands

```bash
# Local preview
cd /Users/adelesam/.claude/worktrees/super-key-insurance
python3 -m http.server 8080

# Push changes to GitHub (auto-deploys to Vercel)
git add .
git commit -m "your message"
git push origin main
```

---

## Next Steps / Known Gaps

1. **Dark mode toggle** — add a button to toggle `document.documentElement.classList.toggle('dark')`
2. **Shared layout** — extract header/nav into a common include (or migrate to React/Next.js)
3. **Arabic RTL** — `dir="rtl"` on `<html lang="ar">` for full RTL pages; currently mixed
4. **Interactive forms** — quote flow, claim filing, policy download are mock buttons
5. **Accessibility audit** — focus states, ARIA labels, color contrast (tokens pass AA)
6. **Analytics/CSP** — add `vercel.json` for headers, GA/Matomo

---

## Memory Files (auto-loaded)

- `agent-dashboard-project.md` — full-stack React/Node dashboard context
- `agent-dashboard-obsidian-export.md` — Obsidian export endpoint
- `agent-dashboard-commands.md` — quick ref for URLs, endpoints, structure
- `dsms-frontend-progress.md` — DSMS Frontend build progress

---

## Contact / Context

Built for **Super Key Insurance (Iraq)** — bilingual EN/AR, mobile-first, Material 3 Expressive aesthetic. All static, no backend, CDN-only dependencies (Tailwind, Google Fonts, Material Symbols). Ready for framework migration when needed.