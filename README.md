## under development  ⚒️


## There is now one problem in this project that my system can't handle the load of this project the project it tooo big so i have no idea i can continue  or not  or tell wait  for any ram update in my pc ?? if your pc or system can handle it them just download a zip of this repo  or clone it and just use ai and tell it to make it in website for example i have this my last this website [`Movement-Watch`](https://github.com/Prem759-0/Movement-Watch) prompt you can give any ai like Chatgpt or gemini to convert according to you preference and make a working website  this is prompt from that watch website  


```bash

Build a single-page marketing site for Astronomia Luxe, a haute horlogerie skeleton wristwatch in rose gold with a brown alligator strap. The site must feel like a Swiss maison's digital flagship: dark, quiet, unhurried, typography-led. Think Vacheron Constantin meets a film title sequence — not a tech product page. Stack: Next.js (App Router), Tailwind, Framer Motion. The hero animation is a pre-rendered image sequence scrubbed via scroll on a <canvas>. The hero mechanic. A full-viewport canvas pinned for ~350vh of scroll. It plays a frame sequence in which the watch, starting front-facing and fully assembled, rotates to a three-quarter profile while disassembling along its central axis — crystal, bezel, skeletonized dial, gear trains, twin balance wheels, rotor, caseback, and strap gliding apart into a horizontal floating stack. Scroll position maps directly to frame index (interpolated, no snapping), so the watch disassembles as you scroll down and reassembles as you scroll up. Frames sit on pure black #060606; the page background must be the exact same value so the sequence has no visible edges. Preload frames progressively and decode off the main thread — scrubbing must never stutter. Narrative overlays during the pin, each fading in and out at its scroll range, alternating sides of the frame: Assembled (0–20%) — centered serif headline: "Astronomia Luxe" / "Time, laid bare." Dial lifts away (20–45%) — "A perpetual calendar with nothing to hide." Short line on the skeletonized dial and moonphase. Movement exposed (45–75%) — " 407 components. Zero shortcuts." Lines on the twin balance wheels, ruby jewels, hand-finished bridges. Fully exploded (75–100%) — "Assembled by one watchmaker, start to finish." followed by a quiet CTA: "Reserve yours". After the pin, the page continues with conventional scroll sections: a specifications table styled like a printed spec sheet (movement, complications, case, water resistance), a full-bleed macro photography band with parallax, a craftsmanship section with two-column editorial text, and a final CTA with a private-appointment form. Footer is minimal. Art direction. Palette: near-black backgrounds, warm off-white text (#EDE8E0-ish at 90/55% opacities), one accent only — rose gold #C9A05C used sparingly for rules, numerals, and the CTA. Typography pairs a high-contrast display serif for headlines (e.g. Fraunces or Canela-like) with a restrained grotesk for body. Generous letter-spacing on small uppercase labels. No cards, no glassmorphism, no glow effects, no gradients on text — luxury here means restraint. Motion should be slow and eased (0.8–1.2s, custom cubic-bezier), never bouncy. Navigation: a whisper-thin fixed bar — wordmark left, three links ("The Watch", "Movement", "Reserve") right — transparent at top, gaining a hairline bottom border and slight background after scroll. Ship it responsive: on mobile, the canvas sequence still scrubs but the exploded axis runs vertically, and overlay text stacks below center. Respect prefers-reduced-motion by replacing the scrub with a static exploded hero image and simple fades.

```



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
