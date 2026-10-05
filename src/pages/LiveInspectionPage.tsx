import { useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { RECENT_ITEMS } from "@/data/items";
import { PanelCard } from "@/components/ui-hmi/PanelCard";
import { SyntheticFrame, type FrameMode } from "@/components/ui-hmi/SyntheticFrame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useItemInspector } from "@/contexts/ItemInspectorContext";

const MODES: readonly { value: FrameMode | "abundance"; label: string }[] = [{ value: "rgb", label: "RGB" }, { value: "reflectance", label: "Reflectance" }, { value: "fluorescence", label: "Fluorescence" }, { value: "abundance", label: "Abundance maps" }];

function Waterfall({ mode, overlay, opacity }: { mode: FrameMode; overlay: boolean; opacity: number }) {
  return <div className="waterfall-stack absolute inset-x-0 top-0 h-[300%]">{[0, 1, 2].map((key) => <SyntheticFrame key={key} mode={mode} overlay={overlay} opacity={opacity} className="h-1/3" />)}</div>;
}

function LineScanView() {
  const [overlay, setOverlay] = useState(true);
  const [opacity, setOpacity] = useState([60]);
  return <PanelCard title="Line-scan view" className="col-span-8" bodyClassName="p-0">
    <Tabs defaultValue="rgb">
      <TabsList className="h-9 w-full justify-start rounded-none border-b border-border bg-card p-0">
        {MODES.map((mode) => <TabsTrigger key={mode.value} value={mode.value} className="h-9 rounded-none border-b-2 border-transparent px-4 text-xs shadow-none data-[state=active]:border-primary data-[state=active]:bg-card data-[state=active]:shadow-none">{mode.label}</TabsTrigger>)}
      </TabsList>
      {MODES.slice(0, 3).map((mode) => <TabsContent key={mode.value} value={mode.value} className="relative m-0 h-[430px] overflow-hidden bg-viewport"><Waterfall mode={mode.value as FrameMode} overlay={overlay} opacity={opacity[0] ?? 60} /><CornerLabels /></TabsContent>)}
      <TabsContent value="abundance" className="relative m-0 h-[430px] bg-viewport p-3"><div className="grid h-full grid-cols-3 gap-2">{[["Food autofluorescence", "autofluorescence"], ["Contaminant", "contaminant"], ["Background", "background"]].map(([label, mode]) => <div key={label} className="flex min-w-0 flex-col border border-muted-foreground/40"><span className="num bg-viewport p-2 text-center text-[11px] text-primary-foreground">{label}</span><SyntheticFrame mode={mode as FrameMode} overlay={overlay} opacity={opacity[0] ?? 60} className="min-h-0 flex-1" /></div>)}</div><CornerLabels /></TabsContent>
    </Tabs>
    <div className="flex h-14 items-center gap-3 border-t border-border px-3">
      <Switch id="overlay" checked={overlay} onCheckedChange={setOverlay} /><label htmlFor="overlay" className="text-xs font-medium">Contamination overlay</label><span className="ml-5 text-xs font-medium">Overlay opacity</span><Slider className="max-w-56" min={0} max={100} value={opacity} onValueChange={setOpacity} aria-label="Overlay opacity" /><span className="num w-8 text-xs">{opacity[0]}%</span>
    </div>
  </PanelCard>;
}

function CornerLabels() { return <div className="pointer-events-none absolute inset-0"><span className="num absolute left-2 top-2 bg-viewport/80 px-1.5 py-1 text-[10px] text-primary-foreground">Lane 2</span><div className="num absolute bottom-2 right-2 flex gap-2 text-[10px] text-primary-foreground"><span className="bg-viewport/80 px-1.5 py-1">405 nm excitation</span><span className="bg-viewport/80 px-1.5 py-1">450 nm long-pass</span></div></div>; }

function VerdictStream() {
  const { openItem } = useItemInspector();
  return <PanelCard title="Verdict stream" bodyClassName="overflow-auto p-0"><table className="w-full border-collapse text-[11px]"><thead className="sticky top-0 bg-secondary text-left uppercase text-muted-foreground"><tr>{["Time", "Item ID", "Lane", "Score", "Verdict"].map((h) => <th key={h} className="px-2 py-2 font-medium">{h}</th>)}</tr></thead><tbody>{RECENT_ITEMS.map((item) => <tr key={item.id} className={item.verdict === "Flag" ? "border-l-[3px] border-alarm-high" : "border-l-[3px] border-transparent"}><td className="num border-t border-border px-2 py-2">{item.time}</td><td className="border-t border-border px-2 py-2"><button type="button" onClick={() => openItem(item.id)} className="num font-medium text-primary hover:underline">{item.id}</button></td><td className="num border-t border-border px-2 py-2">{item.lane}</td><td className="num border-t border-border px-2 py-2">{item.scoreFromZeroToOne.toFixed(2)}</td><td className="border-t border-border px-2 py-2">{item.verdict === "Flag" ? <span className="flex items-center gap-1 font-medium text-alarm-high"><AlertTriangle className="h-3 w-3" />Flag</span> : <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-status-normal" />Clean</span>}</td></tr>)}</tbody></table></PanelCard>;
}

function RejectTracking() { return <PanelCard title="Reject tracking"><p className="num mb-3 text-xs">ITM-0412871, ejection in 2.00 s</p><div className="relative mt-7 h-2 bg-secondary"><div className="absolute inset-y-0 left-0 w-[40%] bg-primary" /><div className="absolute left-[40%] top-1/2 h-4 w-1 -translate-y-1/2 bg-alarm-high" /><span className="absolute -top-5 left-0 text-[10px] text-muted-foreground">Scan line</span><span className="absolute -top-5 right-0 text-[10px] text-muted-foreground">Reject actuator</span><span className="num absolute top-3 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground">2.4 m</span></div><div className="num mt-9 text-2xl font-medium">2.00 s</div></PanelCard>; }

export function LiveInspectionPage() { return <div className="grid grid-cols-12 gap-3"><LineScanView /><div className="col-span-4 grid grid-rows-[minmax(0,1fr)_auto] gap-3"><VerdictStream /><RejectTracking /></div></div>; }