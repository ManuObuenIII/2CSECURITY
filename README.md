# 2C Security — installable app

Installs the 2C Security Portal on phones and computers like a normal app
(home-screen icon, full screen, splash screen, offline screen).

App link: **https://manuobueniii.github.io/2C-SECURITY/**

## Setup (one time)

1. **Paste your portal link** — open `index.html`, find
   `const APP_URL = 'PASTE_YOUR_SECURITY_PORTAL_EXEC_URL_HERE';`
   and replace the text with your Apps Script web app URL (ends in `/exec`).
2. **Turn on GitHub Pages** — repo **Settings → Pages → Build and deployment →
   Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
   Wait about a minute for the link above to go live.

## Install on a device

- **Android (Chrome):** open the app link → tap **Install** on the banner
  (or ⋮ menu → **Install app**).
- **iPhone / iPad (Safari):** open the app link → **Share** → **Add to Home Screen**.
- **Windows / Mac (Chrome or Edge):** open the app link → click the install icon
  in the address bar.

## Updating

- **Portal code changes:** in Apps Script use **Deploy → Manage deployments →
  ✏️ Edit → Version: New version → Deploy**. The `/exec` link stays the same,
  so the installed app picks it up automatically. (Choosing *New deployment*
  makes a new link — you'd then have to paste it into `index.html` again.)
- **Changes to this repo (icons, splash):** also bump `VERSION` in `sw.js`
  (e.g. `v1` → `v2`) so phones refresh their cached copy.

## Files

| File | Purpose |
|---|---|
| `index.html` | App shell: splash, offline screen, install prompt, loads the portal |
| `manifest.webmanifest` | App name, colors and icons used when installing |
| `sw.js` | Service worker: caches the shell so it opens fast and works offline |
| `icons/` | App icons (normal + Android round "maskable"), favicon, logo |
