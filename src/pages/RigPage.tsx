import { AlertTriangle } from "lucide-react";
import { RIG } from "@/data/rig";
import { AnalogBar } from "@/components/ui-hmi/AnalogBar";
import { PanelCard } from "@/components/ui-hmi/PanelCard";
import { StatusChip, type ChipStatus } from "@/components/ui-hmi/StatusChip";

type Row = readonly [string, string];

function EquipmentCard({ title, status, statusLabel, rows, children }: { title: string; status: ChipStatus; statusLabel: string; rows: readonly Row[]; children?: React.ReactNode }) {
  return <PanelCard title={title} actions={<StatusChip status={status} label={statusLabel} />}>
    <table className="w-full text-xs"><tbody>{rows.map(([label, value]) => <tr key={label} className="border-b border-border last:border-0"><th className="py-2 text-left font-normal text-muted-foreground">{label}</th><td className="num py-2 text-right text-foreground">{value}</td></tr>)}</tbody></table>
    {children}
  </PanelCard>;
}

function RigDiagram() {
  return <PanelCard title="Rig signal path"><svg viewBox="0 0 1100 170" className="h-40 w-full" role="img" aria-label="Rig block diagram">
    <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="var(--muted-foreground)" /></marker></defs>
    <g fill="var(--secondary)" stroke="var(--border)" strokeWidth="2">
      <rect x="20" y="50" width="165" height="65" rx="2" />
      <rect x="260" y="20" width="355" height="130" rx="2" />
      <rect x="285" y="57" width="190" height="58" rx="2" />
      <rect x="500" y="57" width="90" height="58" rx="2" />
      <rect x="690" y="50" width="130" height="65" rx="2" />
      <rect x="895" y="50" width="165" height="65" rx="2" />
    </g>
    <g fill="var(--foreground)" fontSize="13" textAnchor="middle">
      <text x="102" y="78">Camera and Lights</text><text x="102" y="98" fill="var(--muted-foreground)" fontSize="11">VNIR / 405 nm / Broadband</text>
      <text x="437" y="42" fontWeight="600">Enclosure</text><text x="380" y="82">Edge compute module</text><text x="545" y="82">Encoder</text>
      <text x="755" y="88">PLC</text><text x="977" y="88">Actuator</text>
    </g>
    <g stroke="var(--muted-foreground)" strokeWidth="2" markerEnd="url(#arrow)"><line x1="185" y1="82" x2="278" y2="82" /><line x1="615" y1="82" x2="682" y2="82" /><line x1="820" y1="82" x2="887" y2="82" /></g>
    <g fill="var(--muted-foreground)" fontFamily="var(--font-mono)" fontSize="11" textAnchor="middle"><text x="224" y="70">Frames</text><text x="650" y="70">Verdict</text><text x="853" y="70">OPC UA</text></g>
  </svg></PanelCard>;
}

export function RigPage() {
  return <div className="space-y-3">
    <RigDiagram />
    <div className="grid grid-cols-3 gap-3">
      <EquipmentCard title={RIG.camera.name} status="normal" statusLabel={RIG.camera.status} rows={[["Sensor temperature", `${RIG.camera.sensorTempC} C`], ["Line rate", `${RIG.camera.lineRatePerS} lines/s`]]} />
      <EquipmentCard title={RIG.fluorescenceLight.name} status="warning" statusLabel="Warning" rows={[["Temperature", `${RIG.fluorescenceLight.tempC} C`], ["Hours", `${RIG.fluorescenceLight.hours} h`]]}>
        <div className="mt-2 border-t border-border pt-2"><div className="flex items-center justify-between text-xs"><span>Intensity</span><span className="num flex items-center gap-1 font-medium text-alarm-high"><AlertTriangle className="h-3.5 w-3.5" />{RIG.fluorescenceLight.intensityPctOfRef} % of reference</span></div><AnalogBar value={RIG.fluorescenceLight.intensityPctOfRef} warning={95} alarm={95} max={100} lowAlarm /><p className="mt-1 text-[10px] text-alarm-high">Alarm below 95 %</p></div>
      </EquipmentCard>
      <EquipmentCard title={RIG.reflectanceLight.name} status="normal" statusLabel="Normal" rows={[["Intensity", `${RIG.reflectanceLight.intensityPctOfRef} % of reference`], ["Temperature", `${RIG.reflectanceLight.tempC} C`], ["Hours", `${RIG.reflectanceLight.hours} h`]]} />
      <EquipmentCard title="Strobe sync" status="normal" statusLabel={RIG.strobeSync.state} rows={[["Mode", RIG.strobeSync.mode], ["State", RIG.strobeSync.state]]} />
      <EquipmentCard title="Encoder" status="normal" statusLabel={RIG.encoder.state} rows={[["Belt speed", `${RIG.encoder.beltSpeedMps.toFixed(2)} m/s`], ["State", RIG.encoder.state]]} />
      <EquipmentCard title={RIG.edgeCompute.name} status="normal" statusLabel="Normal" rows={[["Temperature", `${RIG.edgeCompute.tempC} C`], ["Inference time", `${RIG.edgeCompute.inferenceMs.toFixed(1)} ms`], ["Queue depth", String(RIG.edgeCompute.queueDepth)]]}>
        <div className="mt-2 border-t border-border pt-2"><div className="flex justify-between text-xs"><span>GPU load</span><span className="num">{RIG.edgeCompute.gpuLoadPct} %</span></div><AnalogBar value={RIG.edgeCompute.gpuLoadPct} warning={80} alarm={90} max={100} /></div>
      </EquipmentCard>
      <EquipmentCard title="PLC link" status="normal" statusLabel={RIG.plcLink.state} rows={[["Protocol", RIG.plcLink.protocol], ["State", RIG.plcLink.state], ["Heartbeat", `${RIG.plcLink.heartbeatMs} ms`]]} />
      <EquipmentCard title="Reject actuator" status="warning" statusLabel="Warning" rows={[["Fired", String(RIG.actuator.fired)], ["Confirmed removed", String(RIG.actuator.confirmedRemoved)], ["Not confirmed", String(RIG.actuator.notConfirmed)], ["Pending", String(RIG.actuator.pending)]]} />
      <EquipmentCard title="Enclosure" status="normal" statusLabel={RIG.enclosure.shroudDoorInterlock} rows={[["Rating", RIG.enclosure.rating], ["Internal temperature", `${RIG.enclosure.internalTempC} C`], ["Shroud door interlock", RIG.enclosure.shroudDoorInterlock]]} />
    </div>
  </div>;
}