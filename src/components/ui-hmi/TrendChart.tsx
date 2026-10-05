import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TrendChartProps<T> {
  data: readonly T[];
  xKey: keyof T & string;
  yKey: keyof T & string;
  warning: number;
  alarm: number;
  yMax: number;
  unit: string;
}

export function TrendChart<T>({ data, xKey, yKey, warning, alarm, yMax, unit }: TrendChartProps<T>) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data as T[]} margin={{ top: 8, right: 48, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
          <ReferenceArea y1={0} y2={warning} fill="var(--secondary)" fillOpacity={0.8} />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 10, fontFamily: "var(--font-mono)", fill: "var(--muted-foreground)" }}
            stroke="var(--border)"
            interval={1}
          />
          <YAxis
            domain={[0, yMax]}
            tickFormatter={(v: number) => `${v.toFixed(2)}${unit}`}
            tick={{ fontSize: 10, fontFamily: "var(--font-mono)", fill: "var(--muted-foreground)" }}
            stroke="var(--border)"
            width={52}
          />
          <ReferenceLine
            y={warning}
            stroke="var(--alarm-medium)"
            strokeDasharray="5 3"
            label={{ value: "Warning", position: "right", fontSize: 10, fill: "var(--muted-foreground)" }}
          />
          <ReferenceLine
            y={alarm}
            stroke="var(--alarm-critical)"
            label={{ value: "Alarm", position: "right", fontSize: 10, fill: "var(--muted-foreground)" }}
          />
          <Tooltip
            contentStyle={{ fontSize: 11, fontFamily: "var(--font-mono)", borderRadius: 2, borderColor: "var(--border)" }}
            formatter={(v: number) => [`${v.toFixed(2)}${unit}`, "Flag rate"]}
          />
          <Line
            type="linear"
            dataKey={yKey}
            stroke="var(--foreground)"
            strokeWidth={1.5}
            dot={{ r: 2, fill: "var(--foreground)" }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
