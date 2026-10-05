import { Link, useNavigate } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { KPIS, FLAG_RATE_LIMITS } from "@/data/kpis";
import { ALARMS } from "@/data/alarms";
import { FLAG_RATE_TREND } from "@/data/trend";
import { SUBSYSTEMS } from "@/data/subsystems";
import { AnalogBar } from "@/components/ui-hmi/AnalogBar";
import { KpiTile } from "@/components/ui-hmi/KpiTile";
import { PanelCard } from "@/components/ui-hmi/PanelCard";
import { PriorityBadge } from "@/components/ui-hmi/PriorityBadge";
import { StatusChip } from "@/components/ui-hmi/StatusChip";
import { TrendChart } from "@/components/ui-hmi/TrendChart";
import { Button } from "@/components/ui/button";

const ACTIVE_ALARMS = ALARMS.filter((alarm) => alarm.state.startsWith("Active"));

function Conveyor() {
  const items = [
    { x: -80, flagged: false },
    { x: 65, flagged: false },
    { x: 210, flagged: true, countdown: true },
    { x: 355, flagged: false },
    { x: 500, flagged: false },
    { x: 645, flagged: true },
    { x: 790, flagged: false },
    { x: 935, flagged: false },
  ];

  return (
    <div>
      <svg viewBox="0 0 1000 230" className="h-52 w-full bg-viewport" role="img" aria-label="Animated conveyor inspection diagram">
        <defs>
          <clipPath id="belt-clip">
            <rect x="0" y="58" width="1000" height="115" />
          </clipPath>
          <pattern id="belt-lines" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="skewX(-18)">
            <line x1="0" y1="0" x2="0" y2="32" stroke="var(--muted-foreground)" strokeOpacity="0.25" />
          </pattern>
        </defs>
        <rect x="0" y="58" width="1000" height="115" fill="var(--secondary)" />
        <rect x="0" y="58" width="1000" height="115" fill="url(#belt-lines)" />
        <line x1="250" x2="250" y1="23" y2="193" stroke="var(--primary)" strokeDasharray="7 5" strokeWidth="2" />
        <text x="250" y="16" textAnchor="middle" fill="var(--primary-foreground)" fontSize="12">Scan line</text>
        <line x1="850" x2="850" y1="23" y2="193" stroke="var(--alarm-high)" strokeDasharray="7 5" strokeWidth="2" />
        <text x="850" y="16" textAnchor="middle" fill="var(--alarm-medium)" fontSize="12">Reject actuator</text>
        <line x1="268" x2="832" y1="205" y2="205" stroke="var(--status-normal)" />
        <line x1="268" x2="268" y1="200" y2="210" stroke="var(--status-normal)" />
        <line x1="832" x2="832" y1="200" y2="210" stroke="var(--status-normal)" />
        <text x="550" y="222" textAnchor="middle" fill="var(--status-normal)" fontFamily="var(--font-mono)" fontSize="12">2.4 m</text>
        <g clipPath="url(#belt-clip)">
          {items.map((item, index) => (
            <g
              key={item.x}
              className="conveyor-item"
              style={{ animationDelay: `${index * -2}s` }}
              transform={`translate(${item.x} 0)`}
            >
              <path
                d="M0 112 C8 82 52 78 80 96 C102 111 93 147 63 151 C27 156 -7 143 0 112 Z"
                fill="var(--card)"
                fillOpacity="0.16"
                stroke={item.flagged ? "var(--alarm-high)" : "var(--muted-foreground)"}
                strokeWidth={item.flagged ? 3 : 2}
              />
              {item.flagged && (
                <>
                  <path d="M42 87 L49 100 L35 100 Z" fill="var(--alarm-high)" />
                  <text x="42" y="166" textAnchor="middle" fill="var(--alarm-medium)" fontSize="10" fontWeight="600">FLAG</text>
                  {item.countdown && <text x="42" y="75" textAnchor="middle" fill="var(--primary-foreground)" fontFamily="var(--font-mono)" fontSize="10">2.00 s</text>}
                </>
              )}
            </g>
          ))}
        </g>
      </svg>
      <div className="mt-2 flex items-center gap-5 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-4 rounded-[1px] border border-muted-foreground" />Clean</span>
        <span className="flex items-center gap-1.5"><AlertTriangle className="h-3.5 w-3.5 text-alarm-high" />Flag</span>
      </div>
    </div>
  );
}

export function OverviewPage() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-12 grid grid-cols-6 gap-3">
        <KpiTile label="Items scanned" value={KPIS.itemsScanned.toLocaleString("en-US")} />
        <KpiTile label="Flag rate" value={KPIS.flagRatePct.toFixed(2)} unit="%">
          <AnalogBar value={KPIS.flagRatePct} warning={FLAG_RATE_LIMITS.warning} alarm={FLAG_RATE_LIMITS.alarm} max={1} />
        </KpiTile>
        <KpiTile label="Rejects" value={String(KPIS.rejects)} />
        <KpiTile label="Throughput" value={String(KPIS.throughputPerMin)} unit="items/min" />
        <KpiTile label="Mean latency" value={KPIS.meanLatencyMs.toFixed(1)} unit="ms" />
        <KpiTile label="Uptime" value={KPIS.uptimePct.toFixed(1)} unit="%" />
      </div>

      <PanelCard title="Conveyor" className="col-span-8">
        <Conveyor />
      </PanelCard>

      <PanelCard
        title="Alarm summary"
        className="col-span-4"
        actions={<Link to="/alarms" className="text-xs font-medium text-primary hover:underline">View all</Link>}
      >
        <ul className="divide-y divide-border">
          {ACTIVE_ALARMS.map((alarm) => (
            <li key={alarm.id} className="grid grid-cols-[auto_1fr_auto] items-start gap-2 py-3 first:pt-0">
              <PriorityBadge priority={alarm.priority} />
              <span className="text-xs leading-4 text-foreground">{alarm.message}</span>
              <span className="num text-[11px] text-muted-foreground">{alarm.raisedAt}</span>
            </li>
          ))}
        </ul>
      </PanelCard>

      <PanelCard title="Flag rate trend" className="col-span-7">
        <TrendChart
          data={FLAG_RATE_TREND}
          xKey="time"
          yKey="flagRatePct"
          warning={FLAG_RATE_LIMITS.warning}
          alarm={FLAG_RATE_LIMITS.alarm}
          yMax={0.9}
          unit="%"
        />
      </PanelCard>

      <PanelCard title="Subsystem health" className="col-span-5">
        <div className="grid grid-cols-2 gap-2">
          {SUBSYSTEMS.map((system) => (
            <Button
              key={system.name}
              type="button"
              onClick={() => navigate({ to: "/rig" })}
              variant="outline"
              className="block min-h-20 whitespace-normal rounded-sm border-border bg-card p-2 text-left shadow-none hover:bg-accent"
            >
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-foreground">{system.name}</span>
                <StatusChip status={system.status} label={system.status === "normal" ? "Normal" : "Warning"} />
              </div>
              <p className="text-[11px] leading-4 text-muted-foreground">{system.detail}</p>
            </Button>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}