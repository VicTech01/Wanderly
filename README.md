# Wanderly — Travel & Stays Booking App UI Kit

A complete, production-ready mobile booking app interface built with **pure HTML, CSS and JavaScript** — no frameworks, no dependencies, no build step. Open `index.html` and it works.

**Live demo:** https://wanderly-five-theta.vercel.app

![Wanderly](shots/explore.png)

---

## What's included

| Screen | Highlights |
|---|---|
| **Explore** | Search bar, category chips, featured stay hero, horizontal scroller, listing cards |
| **Search results** | Filterable results with wishlist hearts |
| **Saved / Wishlists** | Rendered from live state — add/remove hearts anywhere and it updates, with a designed empty state |
| **Property Detail** | Photo gallery, rating & reviews, host card, amenities, sticky reserve bar |
| **Booking / Checkout** | Live price calculation, guests & nights steppers, price breakdown, confirm flow |
| **Trips** | Upcoming / Past tabs with trip cards |
| **Profile** | Working bottom sheets: personal info, payment methods, notification toggles, language & currency selection, log out confirmation |

## Features

- 📱 **Fully responsive** — full-bleed app on phones, device frame showcase on desktop
- 🧩 **Zero dependencies** — vanilla JS (ES5-compatible), system font stack
- 🎨 **Design tokens** — all colors, radii, shadows and timing in CSS custom properties
- ♿ **Accessible** — ARIA roles, `aria-modal` dialogs, keyboard-operable switches, visible focus rings, `prefers-reduced-motion` support
- ✨ **Micro-interactions** — animated bottom sheets, toasts, screen transitions, toggle switches
- 🖼️ **Original imagery** — 6 royalty-free generated destination photos included

## File structure

```
wanderly/
├── index.html        # all 7 screens + bottom sheet + toast
├── css/styles.css    # tokens → base → layout → components → responsive
├── js/app.js         # data · ui · render · booking · sheets · init
└── images/           # hero, mountain, city, safari, room, beachhouse
```

## Quick start

1. Unzip and open `index.html` in any browser — that's it.
2. To serve locally: `python3 -m http.server 8080` then visit `localhost:8080`.

## Customization

### Change the brand colors
Edit the design tokens at the top of `css/styles.css`:

```css
:root{
  --accent:#ff6a5a;        /* main brand color (coral) */
  --accent-dark:#f0503f;   /* pressed / emphasis */
  --accent-soft:#fff0ee;   /* tinted backgrounds */
}
```

### Change listings & prices
Edit the `STAYS` array at the top of `js/app.js` — name, location, image, price, rating, reviews, badge.

### Swap the photos
Replace files in `images/` keeping the same filenames, or update the `img` paths in the `STAYS` array.

### Change the demo user
Search `index.html` for `John Doe` / `johndoe@email.com` and edit the Profile section and the personal-info sheet template in `js/app.js`.

## Browser support

Latest Chrome, Firefox, Safari, Edge and mobile browsers (iOS Safari / Android Chrome).

## License

See [LICENSE](LICENSE). You may use this template in personal and commercial projects. Resale or redistribution of the template itself is not permitted.

---

Designed & built by **VicTech** · [Hire me on Fiverr](https://www.fiverr.com/victech_designz)
