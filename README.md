# Tactivo Technologies – Innovative IT Solutions Website

A complete, modern, production-ready website for **Tactivo Technologies** – solutions designed with the customer in mind.

## Features

- **Single-page application** with smooth scroll navigation
- **Fully responsive** – mobile-first design (320 px → 1920 px)
- **Dark professional theme** with magenta/pink brand colors
- **Pure HTML / CSS / JavaScript** – zero frameworks, zero build steps
- **Accessible** – semantic HTML5, ARIA labels, keyboard navigation, reduced-motion support
- **SEO-ready** – meta tags, Open Graph, Twitter Card, canonical URL
- **Animated counters**, scroll-reveal effects, and hover transitions
- **Form validation** with inline error messages and submission feedback

## Sections

| Section | Description |
|---|---|
| Header / Nav | Fixed navbar with smooth scroll, active link highlighting, mobile hamburger |
| Hero | Full-viewport hero with gradient background, floating badges, CTA buttons |
| Stats | Animated counter strip: team members, clients, solutions deployed, uptime |
| Services | 8-card service grid: CCTV, Access Control, Maestro Suite, Custom Software, Network, Fuel Automation, Telematics, Support |
| About | Company story, values: Expert Team, Proven Solutions, Innovative Technology, Committed Partner |
| Testimonials | 3-column client testimonial cards |
| Contact | Two-column layout with contact details and validated form |
| Footer | Brand, quick links, services, contact info |

## File Structure

```
/
├── index.html   – complete HTML structure
├── styles.css   – all styling (CSS custom properties + responsive)
├── script.js    – all JavaScript functionality
└── README.md    – this file
```

## Quick Start

No build step required. Simply open `index.html` in any modern browser:

```bash
# Option 1 – open directly
open index.html

# Option 2 – serve with a simple HTTP server
npx serve .

# Option 3 – VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

## Deployment

### GitHub Pages
1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Set source to **Deploy from a branch → main → / (root)**.
4. Your site is live at `https://<username>.github.io/<repo-name>/`.

### Netlify (drag-and-drop)
1. Visit [app.netlify.com](https://app.netlify.com).
2. Drag the project folder onto the deploy area.
3. Done – live in seconds.

### Custom Domain
Update the `<link rel="canonical">` and Open Graph URL tags in `index.html` to match your domain.

## Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+  
(Intersection Observer and CSS custom properties are required.)

## Customisation

| What | Where |
|---|---|
| Colors / fonts / spacing | `:root` variables at the top of `styles.css` |
| Email / address | `index.html` – search for `info@tactivo.com` |
| Social links | Footer `<a>` tags in `index.html` |
| Services copy | `<article class="service-card">` blocks in `index.html` |
| Stats targets | `data-target` attributes on `.stat-card__number` elements |

## License

© Tactivo Technologies. All rights reserved.
