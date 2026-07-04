# Royal Traders — Static Website Scaffold

This folder contains a lightweight static site scaffold for *Royal Traders* — a premium security solutions company in Lahore.


Quick start:

1. Open the folder `/Users/ahmadriaz/Desktop/website` in a static server or VS Code Live Server.
2. Start a simple local server and open `http://localhost:8000`:

```bash
python3 -m http.server 8000
```

Or, if you prefer Node.js based server:

```bash
npx serve . -l 8000
```

Open `http://localhost:8000` and navigate to `index.html`.

Files:
- `index.html` — Home page
- `about.html`, `services.html`, `products.html`, `brands.html`, `gallery.html`, `blog.html`, `testimonials.html`, `contact.html`
- `assets/css/style.css` — shared stylesheet
- `assets/js/main.js` — minimal interactions (mobile menu, slider)

Notes & next steps:
- Replace placeholder images in `assets/images` and update `style.css` hero background.
- Add server-side form handling for the contact form if needed.
- Add Google Maps embed iframe to `contact.html`.

What I added now:

- Placeholder SVG images: `assets/images/hero.svg`, `assets/images/project1.svg`, `assets/images/project2.svg`, `assets/images/project3.svg`.
- The hero background in `assets/css/style.css` now uses `assets/images/hero.svg`.
- Embedded Google Map iframe in `contact.html` pointing to the stated Lahore address.
- The contact form now sends through FormSubmit and should not open a broken page.
- A Shopify Buy Button mount point has been added on `products.html`.

Important setup for the form:

- The form uses FormSubmit with `mianraheel62@gmail.com`.
- On first use, FormSubmit may ask you to confirm the email address from their message.
- If you prefer your own backend later, you can replace the FormSubmit endpoint with your server.

Shopify setup for products page:

1. Create or open your Shopify store.
2. Go to the Buy Button channel or Shopify admin embed options.
3. Generate a Buy Button for a product or collection.
4. Paste the generated code or configuration into `assets/js/shopify-buy-button.js`.
5. Replace the placeholder domain and storefront access token in the commented example.

For Vercel deployment:

- Push this folder to GitHub.
- Import the repository into Vercel.
- Deploy as a static site.

Next steps (optional):
- Replace the SVG placeholders with real photos (web-optimized JPEG/WEBP) in `assets/images`.
- Add server-side contact form processing or integrate a form service.
- Add Google Maps API key features or a different map provider if needed.

© 2025 Royal Traders
