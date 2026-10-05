# Synapse View

We are building a FRONTEND-ONLY prototype of an industrial inspection HMI called "Synapse Inspect". It is operator software for an inline hyperspectral imaging rig that screens food items on a conveyor for microbial contamination. This is a hackathon prototype, but it must look like shipped industrial software, not a student project.

HARD RULES (apply to every future prompt):

1. Stack: Vite, React, TypeScript, Tailwind CSS, shadcn/ui, react-router-dom, Recharts, lucide-react. Do not add any other library.

2. No backend, no Supabase, no auth, no fetch or API calls, no localStorage, no setInterval or setTimeout that generates data, no Math.random, no real computation. Every number and string on screen comes from static files in src/data/.

3. Allowed interactivity only: route navigation, tabs, drawers, modals, toggles, table filtering and sorting over static arrays, and a scenario selector (added later). A CSS keyframe animation is allowed for the conveyor movement and the line-scan waterfall. Nothing else.

4. No external image URLs and no stock photos. All imagery is drawn with inline SVG or CSS.

5. Do NOT invent screens, KPIs, features, copy, or data that I did not specify. If something is not specified, leave it out. If you are unsure, ask me instead of guessing.

6. Do NOT use em dashes anywhere in UI text. Use commas, colons or hyphens.

7. Every screen shows a small persistent tag "Simulated data" in the shell.

8. Build only what the current prompt asks for. Do not refactor or restyle earlier work unless told to.

Routes that will exist (do not create them yet, just remember them):

/ (Line Overview), /live, /alarms, /rig, /pipeline, /batches, /calibration, /recipes, /audit, /analytics. Item Inspector opens as a right-side drawer from anywhere an item ID is clicked.

Reply with a short confirmation of these rules and the file structure you plan (src/data, src/components, src/pages, src/lib). Do not build any UI yet.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://synapse-sight-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b0892f13-11dd-48cb-873a-e1672a17f9fc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
