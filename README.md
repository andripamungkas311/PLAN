# PLAN – Floorplan Studio

A browser-based floor-plan editor built with **Next.js 14**, **React 18**, **TypeScript**, **Tailwind CSS**, and **Fabric.js**.

---

## Quick start — standalone HTML

The entire site is available as a single self-contained file:

```
index.html
```

Simply open `index.html` in any modern browser — **no build step or server required**.  
All pages (Landing, Pricing, Dashboard, Editor) are loaded within that single file and navigated through hash-based routing:

| URL hash | Page shown |
|----------|------------|
| `#home` (default) | Landing page |
| `#pricing` | Pricing page |
| `#dashboard` | Dashboard / My Projects |
| `#editor` | Floor-plan Editor |

---

## Prerequisites (Next.js development)

| Tool | Minimum version |
|------|----------------|
| [Node.js](https://nodejs.org/) | 18.x or later |
| npm | 9.x or later (bundled with Node.js) |

Verify your versions:

```bash
node -v
npm -v
```

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/andripamungkas311/PLAN.git
cd PLAN
npm install
```

---

## Launching the site

### Standalone (no build)

Open `index.html` directly in a browser.

### Development server (hot-reload)

```bash
npm run dev
```

The application will be available at **http://localhost:3000**.  
The server reloads automatically whenever you save a file.

### Production build

1. **Build** the optimised bundle:

   ```bash
   npm run build
   ```

2. **Start** the production server:

   ```bash
   npm start
   ```

   The site is served at **http://localhost:3000**.

---

## Other commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot-reload |
| `npm run build` | Create an optimised production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint across the project |

---

## Project structure

```
PLAN/
├── index.html         # ★ Standalone single-page app — open directly in a browser
├── app/               # Next.js App Router pages & layouts
│   ├── dashboard/     # Dashboard page
│   ├── editor/        # Floor-plan editor page
│   ├── pricing/       # Pricing page
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Landing / home page
├── components/        # Reusable React components
│   ├── editor/        # Editor-specific components
│   ├── landing/       # Landing-page components
│   ├── layout/        # Shared layout components
│   └── ui/            # Generic UI primitives
├── next.config.mjs    # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Dependencies & npm scripts
```

---

## Tech stack

- **[Next.js 14](https://nextjs.org/)** – React framework with App Router
- **[React 18](https://react.dev/)** – UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** – Static typing
- **[Tailwind CSS 3](https://tailwindcss.com/)** – Utility-first CSS
- **[Fabric.js 7](http://fabricjs.com/)** – HTML5 canvas library for the editor
- **[Lucide React](https://lucide.dev/)** – Icon set
