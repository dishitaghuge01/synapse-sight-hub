import { AlertTriangle, ChevronDown, Info, OctagonAlert } from "lucide-react";
import type { AlarmPriority } from "@/data/alarms";
import { cn } from "@/lib/utils";

const STYLES: Record<AlarmPriority, string> = {
  critical: "bg-alarm-critical text-primary-foreground",
  high: "bg-alarm-high text-primary-foreground",
  medium: "bg-alarm-medium text-alarm-medium-foreground",
  low: "bg-alarm-low text-primary-foreground",
};

const ICONS = { critical: OctagonAlert, high: AlertTriangle, medium: ChevronDown, low: Info };

const LABELS: Record<AlarmPriority, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export function PriorityBadge({ priority, className, label }: { priority: AlarmPriority; className?: string; label?: string }) {
  const Icon = ICONS[priority];
  return (
    <span
      className={cn(
        "inline-flex h-5 shrink-0 items-center gap-1 rounded-sm px-1.5 text-[11px] font-semibold uppercase tracking-wide",
        STYLES[priority],
        className,
      )}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {label ?? LABELS[priority]}
    </span>
  );
}
