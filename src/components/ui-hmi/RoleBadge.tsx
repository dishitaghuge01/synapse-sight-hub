import { ShieldCheck } from "lucide-react";
import type { Role } from "@/data/meta";

export function RoleBadge({ role }: { role: Role }) {
  return (
    <span className="inline-flex h-5 items-center gap-1 rounded-sm border border-border bg-secondary px-1.5 text-[11px] font-medium text-secondary-foreground">
      <ShieldCheck className="h-3 w-3" aria-hidden />
      {role}
    </span>
  );
}
