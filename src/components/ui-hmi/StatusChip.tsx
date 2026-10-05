import { AlertTriangle, CheckCircle2, OctagonAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export type ChipStatus = "normal" | "warning" | "alarm";

const STYLES: Record<ChipStatus, string> = {
  normal: "border-status-normal text-foreground bg-card",
  warning: "border-alarm-medium bg-alarm-medium text-alarm-medium-foreground",
  alarm: "border-alarm-critical bg-alarm-critical text-primary-foreground",
};

const ICONS = { normal: CheckCircle2, warning: AlertTriangle, alarm: OctagonAlert };

export function StatusChip({ status, label, className }: { status: ChipStatus; label: string; className?: string }) {
  const Icon = ICONS[status];
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-sm border px-2 text-xs font-medium",
        STYLES[status],
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {label}
    </span>
  );
}
