# Netflix Movie Demo

A static, front-end-only recreation of the Netflix browsing experience — hero
banner, horizontally-scrolling genre rows, hover-to-preview cards, a title
detail modal, and live search. Pure HTML/CSS/JS, no build step, no backend,
no API keys.

## Run it locally

```bash
cd netflix-movie-demo
python3 -m http.server 8000
```

Then open http://localhost:8000 in a browser.

## Deploy for free (GitHub Pages)

1. In the repo settings, enable **Pages** for this branch, folder `/netflix-movie-demo` (or copy the folder to a `docs/` root).
2. Visit `https://<your-username>.github.io/<repo>/`.

## Structure

| File | Purpose |
|---|---|
| `index.html` | Page markup (nav, hero, rows, modal) |
| `styles.css` | Netflix-style dark theme, responsive layout |
| `script.js` | Renders rows/cards, hero, modal, and search — all client-side |
| `data.js` | Sample movie catalog (title, genre, rating, description); poster/backdrop art is generated at runtime via placehold.co, so no image assets or API keys are needed |

## Notes

This is a portfolio/demo UI only — not affiliated with Netflix, and all
movie titles/descriptions are fictional sample data.
