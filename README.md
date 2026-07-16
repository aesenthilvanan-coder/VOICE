# VOICE

Vegans Organizing for Informed Conversation & Ethics.

Public site for VOICE — a public debate-booth format asking passersby to defend or
reconsider eating animals. Built with React (Vite), Tailwind CSS, and Framer Motion.

## Development

```bash
npm install
npm run dev
```

## Editable content

Copy, image paths, and colors are kept as constants near the top of each
component/page file in `src/`:

- Brand colors and fonts: `src/index.css` (`@theme` block)
- Hero headline: `src/components/Hero.jsx`
- Gallery captions/images: `src/components/Gallery.jsx` (`/public/images/gallery-1.jpg` … `gallery-8.jpg`)
- Founder info: `src/pages/Contact.jsx`
- Stats: `src/pages/Home.jsx`, `src/pages/About.jsx`

Real photos should replace the placeholder images in `public/images/` (hero-booth.jpg,
gallery-1..8.jpg, booth-1..3.jpg, logo.png, founder-aaryan.jpg, founder-mason.jpg).

## Build

```bash
npm run build
```
