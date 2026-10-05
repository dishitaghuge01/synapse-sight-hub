import { CartesianGrid, Line, LineChart, ReferenceArea, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SPECTRA } from "@/data/spectra";

const DATA = SPECTRA.wavelengths.map((wavelength, index) => ({ wavelength, clean: SPECTRA.clean[index], contaminated: SPECTRA.contaminated[index], component: SPECTRA.contaminantComponent[index] }));

export function SpectrumChart() {
  return <div className="h-56 w-full"><ResponsiveContainer width="100%" height="100%"><LineChart data={DATA} margin={{ top: 14, right: 12, bottom: 8, left: 2 }}>
    <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" />
    <ReferenceArea x1={400} x2={450} fill="var(--status-normal)" fillOpacity={0.2} label={{ value: "Blocked by filter", position: "insideTop", fontSize: 9, fill: "var(--muted-foreground)" }} />
    <ReferenceLine x={405} stroke="var(--alarm-high)" strokeDasharray="4 3" label={{ value: "405 nm excitation", position: "insideTopRight", fontSize: 9, fill: "var(--alarm-high)" }} />
    <ReferenceLine x={450} stroke="var(--primary)" strokeDasharray="4 3" label={{ value: "450 nm long-pass", position: "insideTopLeft", fontSize: 9, fill: "var(--primary)" }} />
    <XAxis dataKey="wavelength" type="number" domain={[400,800]} ticks={[400,450,500,600,700,800]} unit=" nm" tick={{ fontSize: 9, fontFamily: "var(--font-mono)" }} />
    <YAxis domain={[0,1]} tick={{ fontSize: 9, fontFamily: "var(--font-mono)" }} label={{ value: "Relative intensity", angle: -90, position: "insideLeft", fontSize: 9 }} />
    <Tooltip contentStyle={{ fontSize: 10, borderRadius: 2, fontFamily: "var(--font-mono)" }} />
    <Line dataKey="clean" name="Clean" stroke="var(--status-normal)" dot={false} strokeWidth={1.5} isAnimationActive={false} />
    <Line dataKey="contaminated" name="Contaminated" stroke="var(--alarm-high)" dot={false} strokeWidth={1.5} isAnimationActive={false} />
    <Line dataKey="component" name="Contaminant component" stroke="var(--primary)" dot={false} strokeWidth={1.5} isAnimationActive={false} />
  </LineChart></ResponsiveContainer></div>;
}