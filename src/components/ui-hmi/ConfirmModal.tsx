import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ConfirmModal({ open, title, note, onOpenChange, onConfirm }: { open: boolean; title: string; note?: boolean; onOpenChange: (open: boolean) => void; onConfirm: () => void }) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="rounded-sm sm:max-w-sm">
    <DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>Confirm this local simulated action.</DialogDescription></DialogHeader>
    {note && <Textarea aria-label="Note" placeholder="Add note" />}
    <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={onConfirm}>Confirm</Button></DialogFooter>
  </DialogContent></Dialog>;
}