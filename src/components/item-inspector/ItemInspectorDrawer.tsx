import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { ITEM_DETAIL } from "@/data/itemDetail";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AnalogBar } from "@/components/ui-hmi/AnalogBar";
import { ConfirmModal } from "@/components/ui-hmi/ConfirmModal";
import { EventTimeline } from "@/components/ui-hmi/EventTimeline";
import { SpectrumChart } from "@/components/ui-hmi/SpectrumChart";
import { SyntheticFrame, type FrameMode } from "@/components/ui-hmi/SyntheticFrame";

const IMAGES: readonly { label: string; mode: FrameMode; overlay?: boolean }[] = [
  { label: "RGB", mode: "rgb" },
  { label: "Fluorescence", mode: "fluorescence", overlay: true },
  { label: "Contaminant abundance", mode: "contaminant" },
  { label: "Autofluorescence abundance", mode: "autofluorescence" },
];

const ABUNDANCE = [
  ["Food autofluorescence", ITEM_DETAIL.abundance.autofluorescence],
  ["Contaminant", ITEM_DETAIL.abundance.contaminant],
  ["Background", ITEM_DETAIL.abundance.background],
] as const;

export function ItemInspectorDrawer({ itemId, onClose }: { itemId: string | null; onClose: () => void }) {
  const [modal, setModal] = useState<"lab" | "false" | "note" | null>(null);
  const [labStatus, setLabStatus] = useState<string>(ITEM_DETAIL.labStatus);
  const confirm = () => { if (modal === "lab") setLabStatus("Sent to lab"); setModal(null); };

  return <>
    <Sheet open={Boolean(itemId)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent side="right" className="w-[480px] max-w-[480px] gap-0 overflow-y-auto bg-card p-0 sm:max-w-[480px]">
        <SheetHeader className="sticky top-0 z-10 flex-row items-center gap-2 border-b border-border bg-card px-4 py-3">
          <SheetTitle className="num text-base">{itemId}</SheetTitle>
          <span className="inline-flex h-5 items-center gap-1 rounded-sm bg-alarm-high px-1.5 text-[11px] font-semibold text-primary-foreground"><AlertTriangle className="h-3 w-3" />FLAG</span>
        </SheetHeader>

        <div className="space-y-5 p-4 text-xs">
          <section>
            <h3 className="mb-2 font-semibold uppercase tracking-wide">Item details</h3>
            <dl className="grid grid-cols-2 gap-x-5 gap-y-2">
              {[["Item ID", itemId ?? ""], ["Timestamp", ITEM_DETAIL.timestamp], ["Lot", ITEM_DETAIL.lot], ["Lane", String(ITEM_DETAIL.lane)], ["Cross-belt position", `${ITEM_DETAIL.crossBeltPositionMm} mm`], ["Actuator state", ITEM_DETAIL.actuator]].map(([label, value]) => <div key={label}><dt className="text-[10px] uppercase text-muted-foreground">{label}</dt><dd className="num mt-0.5 text-foreground">{value}</dd></div>)}
              <div><dt className="text-[10px] uppercase text-muted-foreground">Lab status</dt><dd className="mt-0.5 text-foreground">{labStatus}</dd></div>
            </dl>
          </section>

          <section className="grid grid-cols-2 gap-2">
            {IMAGES.map((image) => <div key={image.label} className="overflow-hidden rounded-sm border border-border bg-viewport"><div className="num px-2 py-1 text-[10px] text-primary-foreground">{image.label}</div><SyntheticFrame mode={image.mode} overlay={image.overlay} className="h-24" /></div>)}
          </section>

          <section><h3 className="font-semibold uppercase tracking-wide">Score</h3><p className="num mt-1">Score {ITEM_DETAIL.score.toFixed(2)}, threshold {ITEM_DETAIL.threshold.toFixed(2)}</p><AnalogBar value={ITEM_DETAIL.score} warning={ITEM_DETAIL.threshold} alarm={ITEM_DETAIL.threshold} max={1} /></section>

          <section><h3 className="mb-2 font-semibold uppercase tracking-wide">Abundance</h3><div className="space-y-2">{ABUNDANCE.map(([label, value]) => <div key={label} className="grid grid-cols-[130px_1fr_32px] items-center gap-2"><span className="text-[11px]">{label}</span><div className="h-2 bg-secondary"><div className="h-full bg-primary" style={{ width: `${value * 100}%` }} /></div><span className="num text-right">{value.toFixed(2)}</span></div>)}</div></section>

          <section><h3 className="mb-1 font-semibold uppercase tracking-wide">Spectrum plot</h3><SpectrumChart /><p className="text-[11px] text-muted-foreground">Illustrative simulated spectra</p></section>
          <section><h3 className="mb-2 font-semibold uppercase tracking-wide">Decision trace</h3><EventTimeline /></section>
          <section className="flex gap-2 border-t border-border pt-4"><Button size="sm" onClick={() => setModal("lab")}>Send to lab</Button><Button size="sm" variant="outline" onClick={() => setModal("false")}>Mark false alarm</Button><Button size="sm" variant="outline" onClick={() => setModal("note")}>Add note</Button></section>
        </div>
      </SheetContent>
    </Sheet>
    <ConfirmModal open={modal !== null} title={modal === "lab" ? "Send to lab" : modal === "false" ? "Mark false alarm" : "Add note"} note={modal === "note"} onOpenChange={(open) => { if (!open) setModal(null); }} onConfirm={confirm} />
  </>;
}