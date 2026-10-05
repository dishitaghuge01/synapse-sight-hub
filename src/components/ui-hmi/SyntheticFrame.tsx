import { cn } from "@/lib/utils";

export type FrameMode = "rgb" | "reflectance" | "fluorescence" | "contaminant" | "autofluorescence" | "background";

export function SyntheticFrame({ mode, overlay = false, opacity = 60, className }: { mode: FrameMode; overlay?: boolean; opacity?: number; className?: string }) {
  const surface = mode === "rgb" ? "fill-frame-rgb" : mode === "reflectance" ? "fill-frame-reflectance" : "fill-frame-fluorescence";
  return (
    <svg viewBox="0 0 640 180" className={cn("block h-full w-full", className)} role="img" aria-label={`${mode} synthetic frame`}>
      <rect width="640" height="180" className={surface} />
      <g fill="none" stroke="var(--frame-detail)" strokeWidth="2" opacity=".7">
        <path d="M-15 62 C40 16 91 31 112 78 C125 110 92 150 42 141 C-2 133 -33 99 -15 62Z" />
        <path d="M116 43 C165 12 229 25 244 76 C256 116 209 153 162 137 C123 124 92 74 116 43Z" />
        <path d="M267 59 C305 19 367 23 390 68 C416 119 365 153 316 141 C268 130 240 88 267 59Z" />
        <path d="M413 44 C463 14 519 34 533 83 C545 126 502 150 458 137 C414 124 387 72 413 44Z" />
        <path d="M552 61 C594 23 651 34 665 78 C677 116 641 150 597 140 C555 132 526 88 552 61Z" />
      </g>
      {(overlay || mode === "contaminant") && (
        <g fill="var(--alarm-high)" style={{ opacity: opacity / 100 }}>
          <ellipse cx="187" cy="79" rx="35" ry="21" />
          <ellipse cx="478" cy="96" rx="28" ry="18" />
        </g>
      )}
      {mode === "autofluorescence" && <g fill="var(--frame-auto)" opacity=".65"><ellipse cx="330" cy="90" rx="68" ry="35" /><ellipse cx="90" cy="86" rx="45" ry="28" /></g>}
      {mode === "background" && <g fill="var(--status-normal)" opacity=".25"><circle cx="70" cy="38" r="8" /><circle cx="390" cy="142" r="12" /><circle cx="570" cy="50" r="7" /></g>}
      <path d="M0 18H640M0 90H640M0 162H640" stroke="var(--frame-scan)" strokeWidth="1" opacity=".25" />
    </svg>
  );
}