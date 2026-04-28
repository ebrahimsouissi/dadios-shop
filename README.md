# The Dadios Fragrance Shop

A luxury perfume e-commerce site for Tunisia, built with vanilla JS and deployed on Cloudflare Pages.

## Features

- 🛒 Product catalog with advanced filters (brand, season, time, notes)
- 🧴 Perfume detail modal with accords, longevity, sillage
- 🛍️ Cart drawer with WhatsApp checkout
- 💎 Loyalty card system (Cloudflare Worker + KV)
- 🔐 Owner admin panel (stamp management, card deletion)
- 🎯 Perfume quiz to recommend fragrances
- 🌙 Dark/light theme toggle

## Stack

- **Frontend**: Vanilla JS, CSS (no framework)
- **Backend**: Cloudflare Worker (loyalty API)
- **Database**: Cloudflare KV
- **Hosting**: Cloudflare Pages

## Deployment

1. Push to GitHub — Cloudflare Pages auto-deploys.
2. Set the `ADMIN_PASSWORD` environment variable in Cloudflare Pages dashboard.
3. Bind the `LOYALTY_KV` namespace in the Worker settings.

## Project Structure

```
├── index.html       # Main page
├── app.js           # All frontend logic
├── owner.js         # Admin panel logic
├── styles.css       # All styles
├── worker.js        # Cloudflare Worker (loyalty API)
├── _routes.json     # Cloudflare Pages routing config
└── sitemap.xml      # SEO sitemap
```
