# Pipeline, Batches, and Calibration

## Build
- Replace the three placeholder screens with focused page compositions that match the existing industrial HMI shell and components.
- Build `/pipeline` from the eight static pipeline stages: branched process diagram, proportional latency waterfall with 13.7 ms marker, stage table with the supplied static percentages, and the exact footer note.
- Build `/batches` from the static batch list: lot filter, sortable columns, row-triggered detail drawer, fixed four-row rejects table, and the requested report notice modal.
- Build `/calibration` from the static calibration record: status and model panels plus a five-step local-only recalibration wizard.
- Keep all values static and all interactions local to the page. Add no backend, persistence, generated values, or extra content.

## Technical details
- Reuse the existing `PanelCard`, `PriorityBadge`, shadcn buttons, inputs, dialog, and sheet controls.
- Add one page file per screen under the existing page structure, then update the three existing TanStack route files to render them while preserving their route-specific metadata.
- Use semantic design tokens and responsive overflow for dense diagrams and tables.

## Verification
- Confirm the current build log is clean after the edits.
- Open all three routes in the preview, exercise filtering, sorting, drawer/modal, and step progression, and inspect desktop and narrow viewport screenshots for overlap or clipping.
