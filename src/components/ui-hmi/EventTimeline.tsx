import { PIPELINE_STAGES, PIPELINE_TOTAL_MS } from "@/data/pipeline";

export function EventTimeline() {
  return <div className="space-y-0">
    {PIPELINE_STAGES.map((stage) => <div key={stage.step} className="grid grid-cols-[18px_1fr_auto] gap-2 text-[11px]">
      <div className="flex flex-col items-center"><span className="num flex h-4 w-4 items-center justify-center rounded-full border border-primary text-[9px] text-primary">{stage.step}</span>{stage.step < PIPELINE_STAGES.length && <span className="h-6 w-px bg-border" />}</div>
      <div><div className="font-medium text-foreground">{stage.stage}</div><div className="text-muted-foreground">{stage.detail}</div></div>
      <span className="num text-muted-foreground">{stage.ms.toFixed(1)} ms</span>
    </div>)}
    <div className="num mt-2 flex justify-between border-t border-border pt-2 text-xs font-semibold"><span>Total</span><span>{PIPELINE_TOTAL_MS.toFixed(1)} ms</span></div>
  </div>;
}