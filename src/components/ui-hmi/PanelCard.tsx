import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PanelCardProps {
  title: string;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function PanelCard({ title, actions, children, className, bodyClassName }: PanelCardProps) {
  return (
    <section className={cn("flex flex-col rounded-sm border border-border bg-card", className)}>
      <header className="flex h-9 items-center justify-between border-b border-border px-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">{title}</h2>
        {actions}
      </header>
      <div className={cn("flex-1 p-3", bodyClassName)}>{children}</div>
    </section>
  );
}
