import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, FileDown } from "lucide-react";
import type { Batch } from "@/data/batches";
import { BATCHES, BATCH_REJECTS, BATCH_REPORT_NOTICE, BATCH_WARNING_LIMIT } from "@/data/batches";
import { PanelCard } from "@/components/ui-hmi/PanelCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

type SortKey = keyof Pick<Batch, "lot" | "date" | "scanned" | "flagged" | "flagRatePct">;

const HEADINGS: readonly { key: SortKey; label: string }[] = [
  { key: "lot", label: "Lot" }, { key: "date", label: "Date" }, { key: "scanned", label: "Scanned" },
  { key: "flagged", label: "Flagged" }, { key: "flagRatePct", label: "Flag rate (%)" },
];

export function BatchesPage() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [ascending, setAscending] = useState(false);
  const [selected, setSelected] = useState<Batch>();
  const [reportOpen, setReportOpen] = useState(false);

  const rows = useMemo(() => BATCHES.filter((batch) => batch.lot.toLowerCase().includes(query.toLowerCase())).toSorted((a, b) => {
    const comparison = a[sortKey] < b[sortKey] ? -1 : a[sortKey] > b[sortKey] ? 1 : 0;
    return ascending ? comparison : -comparison;
  }), [ascending, query, sortKey]);

  const sort = (key: SortKey) => {
    if (key === sortKey) setAscending((current) => !current);
    else { setSortKey(key); setAscending(true); }
  };

  return <>
    <PanelCard title="Batches" actions={<Button size="sm" className="h-7 rounded-sm" onClick={() => setReportOpen(true)}><FileDown />Export PDF report</Button>} bodyClassName="p-0">
      <div className="border-b border-border p-2"><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter by lot" className="h-8 w-64 rounded-sm text-xs" /></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[680px] border-collapse text-left text-xs">
        <thead className="bg-secondary text-[10px] uppercase text-muted-foreground"><tr>{HEADINGS.map(({ key, label }) => <th key={key} className="px-3 py-2 font-medium"><Button variant="ghost" size="sm" className="h-6 rounded-sm px-0 text-[10px] uppercase" onClick={() => sort(key)}>{label}{sortKey === key && (ascending ? <ArrowUp /> : <ArrowDown />)}</Button></th>)}</tr></thead>
        <tbody>{rows.map((batch) => <tr key={batch.lot} tabIndex={0} className="cursor-pointer border-t border-border hover:bg-accent focus:bg-accent focus:outline-none" onClick={() => setSelected(batch)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelected(batch); }}><td className="num px-3 py-2 font-medium text-primary">{batch.lot}</td><td className="num px-3 py-2">{batch.date}</td><td className="num px-3 py-2">{batch.scanned.toLocaleString()}</td><td className="num px-3 py-2">{batch.flagged}</td><td className="num px-3 py-2">{batch.flagRatePct.toFixed(2)}</td></tr>)}</tbody>
      </table></div>
    </PanelCard>

    <Sheet open={Boolean(selected)} onOpenChange={(open) => { if (!open) setSelected(undefined); }}><SheetContent className="w-full overflow-y-auto p-0 sm:max-w-[520px]">
      <SheetHeader className="border-b border-border p-4"><SheetTitle className="num text-base">{selected?.lot}</SheetTitle><SheetDescription>Batch detail</SheetDescription></SheetHeader>
      {selected && <div className="space-y-4 p-4">
        <div className="grid grid-cols-3 gap-2">{[["Scanned", selected.scanned.toLocaleString()], ["Flagged", String(selected.flagged)], ["Flag rate", `${selected.flagRatePct.toFixed(2)} %`]].map(([label, value]) => <div key={label} className="border border-border bg-secondary p-3"><div className="text-[10px] uppercase text-muted-foreground">{label}</div><div className="num mt-1 text-lg font-medium">{value}</div></div>)}</div>
        <section><div className="mb-2 flex justify-between text-xs"><span>Flag rate</span><span className="num">Warning limit {BATCH_WARNING_LIMIT} %</span></div><div className="relative h-5 border border-border bg-secondary"><div className="h-full w-[64%] bg-primary/35" /><div className="absolute inset-y-0 left-full border-l-2 border-alarm-medium" /></div></section>
        <section><h3 className="mb-2 text-xs font-semibold uppercase">Rejects</h3><div className="overflow-x-auto border border-border"><table className="w-full min-w-[620px] text-left text-xs"><thead className="bg-secondary text-[10px] uppercase text-muted-foreground"><tr>{["Time", "Item ID", "Lane", "Reason", "Verification"].map((heading) => <th key={heading} className="px-2 py-2 font-medium">{heading}</th>)}</tr></thead><tbody>{BATCH_REJECTS.map((reject) => <tr key={reject.itemId} className="border-t border-border"><td className="num px-2 py-2">{reject.time}</td><td className="num px-2 py-2">{reject.itemId}</td><td className="num px-2 py-2">{reject.lane}</td><td className="px-2 py-2">{reject.reason}</td><td className="px-2 py-2">{reject.verification}</td></tr>)}</tbody></table></div></section>
      </div>}
    </SheetContent></Sheet>

    <Dialog open={reportOpen} onOpenChange={setReportOpen}><DialogContent className="rounded-sm sm:max-w-sm"><DialogHeader><DialogTitle>Export PDF report</DialogTitle><DialogDescription>{BATCH_REPORT_NOTICE}</DialogDescription></DialogHeader><DialogFooter><Button onClick={() => setReportOpen(false)}>Close</Button></DialogFooter></DialogContent></Dialog>
  </>;
}