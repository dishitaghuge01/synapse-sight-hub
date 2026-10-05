<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project Rules

- Keep the prototype frontend-only with static display data sourced from `src/data/`, because the hackathon build must never depend on a backend or runtime data generation.
- Use the existing TanStack Start file-based router instead of adding React Router DOM, because routing is fixed by the project runtime.
- Limit dependencies to the existing stack plus Recharts, Lucide React, and IBM Plex font packages when required by an approved implementation prompt.
- Keep reusable industrial HMI controls in `src/components/ui-hmi/`, screen compositions in `src/pages/`, static fixtures in `src/data/`, and shared helpers in `src/lib/`.
- Limit interactions to navigation, tabs, drawers, modals, toggles, static-array table filtering and sorting, and the future scenario selector.
- Never use fetch calls, APIs, browser storage, timers that generate data, random values, or runtime computation for displayed values.
- Draw all imagery with inline SVG or CSS and never load external imagery.
- Build only explicitly requested screens, controls, copy, and data, and ask rather than inventing unspecified product behavior.
