# Eshaan Singh Deo — Portfolio (Editorial Notebook)

A flat, editorial personal portfolio built with **React**, **TypeScript**, and **Tailwind CSS v4** around a warm paper palette (`#F6F2EA`, ink `#1A1A1A`, vermilion `#E8452C`) and an optional warm-charcoal dark mode.

## Project Structure
```
index.html                              # Fraunces & Geist fonts, SEO, OpenGraph, JSON-LD
src/
  data/portfolio.ts                     # Single typed content file with [ADD ...] comments
  utils/audioVisualizer.ts              # Pure Web Audio frequency/waveform math
  utils/audioVisualizer.test.ts         # node:test unit tests
  components/
    Header.tsx                          # Wordmark left, Work / About / Contact right
    BrowserFrame.tsx                    # Minimal 1px-ruled browser frame
    BuzzAudioVisualizer.tsx             # User-triggered Web Audio API synthesizer & canvas
    WorkSection.tsx                     # Alternating 01 / 02 / 03 editorial project layouts
    Reveal.tsx                          # Subtle scroll transition respecting reduced motion
  App.tsx                               # Hero, Work, About, Elsewhere, Footer
```

## Updating Content
All portfolio copy, links, and `[ADD ...]` comments live in `src/data/portfolio.ts`. Missing items are intentionally omitted from the visible UI until populated there.

## Local Development & Verification
```bash
npm install
npm run dev
```

Run unit tests, typecheck, and production build:
```bash
npx tsx --test src/utils/audioVisualizer.test.ts
npm run lint
npm run build
```

## Deploying to Vercel
1. Push the repository to GitHub.
2. Import the project in Vercel (`Framework Preset: Vite`, `Build Command: npm run build`, `Output Directory: dist`).
3. Deploy — `vercel.json` is included for clean routing.
