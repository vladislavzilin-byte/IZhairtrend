# IZ Hair Trend — Futuristic Site

Single‑page React app (Vite + Tailwind + Framer Motion + React Router). Three languages (LT/EN/RU), animated intro, starfield background, holographic portrait, and 4 central polymer buttons.

## Quick start

```bash
npm i
npm run dev
```

Open http://localhost:5173

## Build
```bash
npm run build
npm run preview
```

## Assets
- `public/iz-logo.svg` — your logo (already included).
- `public/iz-hero.png` — center portrait (already included). Replace with your export when needed.

## GitHub Pages
1. Add base path for your repo (e.g. `/iz-hair-trend-site/`) in `.env`:
   ```
   VITE_BASE=/iz-hair-trend-site/
   ```
2. Build: `npm run build`
3. Push the repo, then publish the `dist/` folder to `gh-pages` branch (for example with `gh-pages` package or GitHub Actions).

### GitHub Actions (optional)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          enable_jekyll: false
```

## Notes
- Replace placeholder gallery/shop images with your own.
- Hook up shop/booking integrations later (Shopify, etc.).
