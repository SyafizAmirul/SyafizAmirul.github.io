# SyafizAmirul.github.io

My personal site. Plain HTML, CSS and JavaScript — no build step, no dependencies.

Live at **https://syafizamirul.github.io** (once GitHub Pages is switched on).

## Files

| File | What it holds |
|------|---------------|
| `index.html` | All the content and page structure |
| `styles.css` | All the styling; design tokens are at the top in `:root` |
| `script.js`  | Theme toggle, mobile menu, scroll reveal, active nav link |

## Editing it

Open the folder, change the files, refresh the browser. That's the whole workflow.

To view it locally with a proper server (needed only if you add `fetch` calls):

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Finishing the content

The page ships with bracketed placeholders wrapped in `<span class="ph">`.
Replace that text with your own, then delete the `.ph` block in `styles.css`
to remove the highlighting.

## Publishing

Pushed to `main`, GitHub Pages serves it automatically once enabled under
Settings → Pages → Source: `main` / root.
