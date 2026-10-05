interface AnalogBarProps {
  value: number;
  warning: number;
  alarm: number;
  max: number;
  lowAlarm?: boolean;
}

/** ISA-101 style analog indicator: neutral range, warning and alarm bands, pointer at value. */
export function AnalogBar({ value, warning, alarm, max, lowAlarm = false }: AnalogBarProps) {
  const pct = (v: number) => `${(v / max) * 100}%`;
  return (
    <div className="mt-1" aria-label={`Value ${value}, warning ${warning}, alarm ${alarm}`}>
      <div className="relative h-2 w-full rounded-[1px] bg-secondary">
        {lowAlarm ? (
          <div className="absolute inset-y-0 left-0 bg-alarm-high/45" style={{ width: pct(alarm) }} />
        ) : (
          <>
            <div
              className="absolute inset-y-0 bg-alarm-medium/40"
              style={{ left: pct(warning), width: `calc(${pct(alarm)} - ${pct(warning)})` }}
            />
            <div className="absolute inset-y-0 right-0 bg-alarm-critical/30" style={{ left: pct(alarm) }} />
          </>
        )}
        <div className={lowAlarm ? "absolute -top-0.5 h-3 w-0.5 bg-alarm-high" : "absolute -top-0.5 h-3 w-0.5 bg-foreground"} style={{ left: pct(value) }} />
      </div>
      <div className="num relative mt-0.5 h-3 text-[10px] text-muted-foreground">
        {!lowAlarm && <span className="absolute -translate-x-1/2" style={{ left: pct(warning) }}>
          {warning.toFixed(2)}
        </span>}
        <span className="absolute -translate-x-1/2" style={{ left: pct(alarm) }}>
          {alarm.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
