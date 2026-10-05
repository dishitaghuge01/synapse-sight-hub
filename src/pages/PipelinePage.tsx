import { ChevronRight } from "lucide-react";
import { PanelCard } from "@/components/ui-hmi/PanelCard";
import type { PipelineStage } from "@/data/pipeline";
import { PIPELINE_BRANCHES, PIPELINE_FOOTER, PIPELINE_STAGES, PIPELINE_TOTAL_MS } from "@/data/pipeline";
import { cn } from "@/lib/utils";

const FLOW: readonly { stage: PipelineStage; grid: string }[] = [
  "col-start-1 row-span-2", "col-start-2 row-span-2", "col-start-3 row-start-1", "col-start-3 row-start-2",
  "col-start-4 row-span-2", "col-start-5 row-span-2", "col-start-6 row-span-2", "col-start-7 row-span-2",
].flatMap((grid, index) => {
  const stage = PIPELINE_STAGES[index];
  return stage ? [{ stage, grid }] : [];
});

function StageBox({ stage, branch }: { stage: PipelineStage; branch?: string | undefined }) {
  return <div className="flex min-h-20 flex-col justify-center border border-border bg-secondary px-2 py-2 text-center">
    {branch && <span className="mb-1 text-[9px] uppercase text-muted-foreground">{branch}</span>}
    <span className="text-[11px] font-semibold leading-tight">{stage.stage}</span>
    <span className="num mt-1 text-[11px] text-muted-foreground">{stage.ms.toFixed(1)} ms</span>
  </div>;
}

export function PipelinePage() {
  return <div className="space-y-3">
    <PanelCard title="Processing flow" bodyClassName="overflow-x-auto p-3">
      <div className="relative grid min-w-[1040px] grid-cols-7 grid-rows-2 items-stretch gap-x-10 gap-y-3">
        {FLOW.map(({ stage, grid }) => <div key={stage.step} className={cn("relative flex flex-col justify-center", grid)}>
          <StageBox stage={stage} branch={stage.step === 3 ? PIPELINE_BRANCHES.fluorescence : stage.step === 4 ? PIPELINE_BRANCHES.reflectance : undefined} />
          {stage.step !== 8 && <ChevronRight className="absolute -right-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />}
        </div>)}
      </div>
    </PanelCard>

    <PanelCard title="Latency waterfall" actions={<span className="num text-xs font-semibold">Total {PIPELINE_TOTAL_MS.toFixed(1)} ms</span>}>
      <div className="flex h-16 min-w-[760px] overflow-hidden border border-border bg-secondary">
        {PIPELINE_STAGES.map((stage, index) => <div key={stage.step} className={cn("flex min-w-0 items-center justify-center border-r border-card px-1 text-center last:border-r-0", stage.widthClass, index % 2 === 0 ? "bg-primary/15" : "bg-primary/25")} title={stage.stage}>
          <span className="num text-[10px] font-medium">{stage.ms.toFixed(1)} ms</span>
        </div>)}
      </div>
    </PanelCard>

    <PanelCard title="Stage breakdown" bodyClassName="p-0">
      <div className="overflow-x-auto"><table className="w-full min-w-[680px] border-collapse text-left text-xs">
        <thead className="bg-secondary text-[10px] uppercase text-muted-foreground"><tr>{["Stage", "Detail", "ms", "Share of total (%)"].map((heading) => <th key={heading} className="px-3 py-2 font-medium">{heading}</th>)}</tr></thead>
        <tbody>{PIPELINE_STAGES.map((stage) => <tr key={stage.step} className="border-t border-border"><td className="px-3 py-2 font-medium">{stage.stage}</td><td className="px-3 py-2 text-muted-foreground">{stage.detail}</td><td className="num px-3 py-2">{stage.ms.toFixed(1)}</td><td className="num px-3 py-2">{stage.share}</td></tr>)}</tbody>
      </table></div>
    </PanelCard>
    <p className="text-[11px] text-muted-foreground">{PIPELINE_FOOTER}</p>
  </div>;
}