import { useState } from "react";
import { Check } from "lucide-react";
import { CALIBRATION, CALIBRATION_COMPLETE, RECALIBRATION_STEPS } from "@/data/calibration";
import { PanelCard } from "@/components/ui-hmi/PanelCard";
import { PriorityBadge } from "@/components/ui-hmi/PriorityBadge";
import { StatusChip } from "@/components/ui-hmi/StatusChip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ValueRow({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex min-h-11 items-center justify-between gap-4 border-b border-border py-2 last:border-b-0"><span className="text-xs text-muted-foreground">{label}</span><div className="flex items-center gap-2 text-right text-xs">{children}</div></div>;
}

export function CalibrationPage() {
  const [step, setStep] = useState(0);
  const complete = step === RECALIBRATION_STEPS.length;

  return <div className="grid grid-cols-12 gap-3">
    <div className="col-span-5 space-y-3">
      <PanelCard title="Calibration status">
        <ValueRow label="Dark reference"><span className="num">age {CALIBRATION.darkReference.age}</span><PriorityBadge priority="medium" className="normal-case" /></ValueRow>
        <ValueRow label="White reference"><span className="num">age {CALIBRATION.whiteReference.age}</span><PriorityBadge priority="medium" className="normal-case" /></ValueRow>
        <ValueRow label="Flat-field"><StatusChip status="normal" label={CALIBRATION.flatField.state} /><span className="num">{CALIBRATION.flatField.takenAt}</span></ValueRow>
        <ValueRow label="Check tile"><StatusChip status="normal" label={CALIBRATION.checkTile} /></ValueRow>
        <ValueRow label="Reference age limit"><span className="num">{CALIBRATION.referenceAgeLimit}</span></ValueRow>
      </PanelCard>
      <PanelCard title="Model and library">
        <ValueRow label="Endmember library"><span className="num">{CALIBRATION.endmemberLibrary.name} ({CALIBRATION.endmemberLibrary.classes} classes)</span></ValueRow>
        <ValueRow label="Model"><span className="num">{CALIBRATION.model}</span></ValueRow>
      </PanelCard>
    </div>
    <PanelCard title="Recalibration wizard" className="col-span-7">
      <ol className="space-y-0">{RECALIBRATION_STEPS.map((label, index) => {
        const isComplete = index < step;
        const isCurrent = index === step;
        return <li key={label} className="relative flex min-h-20 gap-3 pl-1">
          {index < RECALIBRATION_STEPS.length - 1 && <div className="absolute left-[15px] top-8 h-[calc(100%-1rem)] border-l border-border" />}
          <div className={cn("num z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs", isComplete ? "border-primary bg-primary text-primary-foreground" : isCurrent ? "border-primary bg-card text-primary" : "border-border bg-secondary text-muted-foreground")}>{isComplete ? <Check className="h-4 w-4" /> : index + 1}</div>
          <div className="flex flex-1 items-start justify-between gap-4 border-b border-border pb-4 pt-1">
            <span className={cn("text-sm", !isCurrent && !isComplete && "text-muted-foreground")}>{label}</span>
            {isCurrent && <Button size="sm" className="h-7 rounded-sm" onClick={() => setStep((current) => current + 1)}>Next</Button>}
          </div>
        </li>;
      })}</ol>
      {complete && <div className="ml-11 mt-2 flex items-center gap-2 border border-border bg-secondary p-3 text-sm font-medium"><Check className="h-4 w-4 text-primary" />{CALIBRATION_COMPLETE}</div>}
    </PanelCard>
  </div>;
}