import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Bell,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Cpu,
  FileClock,
  FlaskConical,
  Gauge,
  Layers,
  LayoutDashboard,
  Lock,
  Package,
  ScanLine,
} from "lucide-react";
import { META } from "@/data/meta";
import { ALARMS } from "@/data/alarms";
import { PriorityBadge } from "@/components/ui-hmi/PriorityBadge";
import { RoleBadge } from "@/components/ui-hmi/RoleBadge";
import { StatusChip } from "@/components/ui-hmi/StatusChip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/live", label: "Live Inspection", icon: ScanLine },
  { to: "/alarms", label: "Alarms and Events", icon: Bell, count: "3" },
  { to: "/rig", label: "Rig and Edge Node", icon: Cpu },
  { to: "/pipeline", label: "Pipeline and Latency", icon: Activity },
  { to: "/batches", label: "Batches", icon: Package },
  { to: "/calibration", label: "Calibration", icon: Gauge },
  { to: "/recipes", label: "Recipes", icon: FlaskConical },
  { to: "/audit", label: "Audit Trail", icon: FileClock },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
] as const;

const ACTIVE_ALARMS = ALARMS.filter((a) => a.state.startsWith("Active"));
const BANNER_ALARM = ALARMS.find((a) => a.id === "AL-0107");

function TopBar() {
  const r = META.activeRecipe;
  return (
    <header className="flex h-12 shrink-0 items-center gap-4 border-b border-border bg-card px-3 text-xs">
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm font-semibold text-foreground">{META.product}</span>
        <span className="num text-[11px] text-muted-foreground">{META.version}</span>
      </div>
      <select
        aria-label="Site and line"
        className="h-7 rounded-sm border border-input bg-card px-2 text-xs text-foreground"
        defaultValue="line03"
      >
        <option value="line03">
          {META.site} / {META.line}
        </option>
      </select>
      <div className="flex h-7 items-center gap-1.5 rounded-sm border border-border bg-secondary px-2">
        <Lock className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
        <span className="num text-foreground">{r.id}</span>
        <span className="text-foreground">
          {r.name} v{r.version}
        </span>
        <span className="rounded-sm border border-border bg-card px-1 text-[10px] font-medium uppercase text-muted-foreground">
          {r.status}
        </span>
      </div>
      <span className="text-muted-foreground">{META.shift}</span>
      <div className="flex-1" />
      <span className="rounded-sm border border-muted-foreground px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        Simulated data
      </span>
      <div className="flex items-center gap-1.5">
        <span className="num text-foreground">{META.user.id}</span>
        <RoleBadge role={META.user.role} />
      </div>
      <span className="num flex items-center gap-1 text-muted-foreground">
        <Clock className="h-3.5 w-3.5" aria-hidden />
        {META.clockStatic}
      </span>
      <StatusChip status="normal" label={META.systemState} />
    </header>
  );
}

function AlarmBanner() {
  const [acknowledged, setAcknowledged] = useState(false);
  if (!BANNER_ALARM) return null;
  return (
    <div className="flex h-9 shrink-0 items-center gap-3 border-b border-border bg-card px-3 text-xs">
      {!acknowledged && (
        <>
          <div className="h-full w-1 bg-alarm-critical" aria-hidden />
          <PriorityBadge priority={BANNER_ALARM.priority} />
          <span className="num text-muted-foreground">{BANNER_ALARM.id}</span>
          <span className="truncate font-medium text-foreground">{BANNER_ALARM.message}</span>
          <span className="num text-muted-foreground">{BANNER_ALARM.raisedAt}</span>
          <Button
            type="button"
            onClick={() => setAcknowledged(true)}
            variant="outline"
            size="sm"
            className="h-6 rounded-sm border-foreground bg-card px-2 text-xs shadow-none"
          >
            Acknowledge
          </Button>
        </>
      )}
      <div className="flex-1" />
      <Link to="/alarms" className="flex items-center gap-1.5 text-foreground hover:underline">
        <Bell className="h-3.5 w-3.5" aria-hidden />
        Active <span className="num font-semibold">{ACTIVE_ALARMS.length}</span>
      </Link>
    </div>
  );
}

function LeftNav() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <nav
      className={cn(
        "flex shrink-0 flex-col border-r border-border bg-sidebar transition-[width] duration-150",
        collapsed ? "w-14" : "w-[220px]",
      )}
    >
      <ul className="flex-1 py-2">
        {NAV.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                title={item.label}
                activeOptions={{ exact: item.to === "/" }}
                className="flex h-9 items-center gap-3 border-l-[3px] border-transparent px-[17px] text-xs text-sidebar-foreground hover:bg-sidebar-accent"
                activeProps={{ className: "!border-primary bg-sidebar-accent font-semibold" }}
              >
                <span className="relative">
                  <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  {"count" in item && collapsed && (
                    <span className="absolute -right-1.5 -top-1.5 h-2 w-2 rounded-full bg-alarm-critical" />
                  )}
                </span>
                {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                {!collapsed && "count" in item && (
                  <span className="num flex h-4 min-w-4 items-center justify-center rounded-full bg-alarm-critical px-1 text-[10px] font-semibold text-primary-foreground">
                    {item.count}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      <Button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
        variant="ghost"
        className="flex h-9 w-full justify-start gap-3 rounded-none border-t border-border px-5 text-xs text-muted-foreground shadow-none hover:bg-sidebar-accent"
      >
        {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        {!collapsed && "Collapse"}
      </Button>
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen min-w-[1024px] flex-col bg-background text-foreground">
      <TopBar />
      <AlarmBanner />
      <div className="flex min-h-0 flex-1">
        <LeftNav />
        <main className="min-w-0 flex-1 overflow-auto p-3">{children}</main>
      </div>
    </div>
  );
}
