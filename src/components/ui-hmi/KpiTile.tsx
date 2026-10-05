import type { ReactNode } from "react";

interface KpiTileProps {
  label: string;
  value: string;
  unit?: string;
  children?: ReactNode;
}

export function KpiTile({ label, value, unit, children }: KpiTileProps) {
  return (
    <div className="flex flex-col gap-1 rounded-sm border border-border bg-card px-3 py-2">
      <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className="num text-2xl font-medium text-foreground">{value}</span>
        {unit && <span className="num text-xs text-muted-foreground">{unit}</span>}
      </div>
      {children}
    </div>
  );
}
