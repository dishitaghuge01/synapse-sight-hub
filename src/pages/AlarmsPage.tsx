import { useMemo, useState } from "react";
import type { Alarm, AlarmPriority, AlarmState } from "@/data/alarms";
import { ALARMS } from "@/data/alarms";
import { PanelCard } from "@/components/ui-hmi/PanelCard";
import { PriorityBadge } from "@/components/ui-hmi/PriorityBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Tab = "active" | "shelved" | "history";

const COUNTS: readonly { priority: AlarmPriority; label: string; count: number }[] = [
  { priority: "critical", label: "Critical", count: 1 },
  { priority: "high", label: "High", count: 1 },
  { priority: "medium", label: "Medium", count: 1 },
  { priority: "low", label: "Low", count: 0 },
];

export function AlarmsPage() {
  const [states, setStates] = useState<Record<string, AlarmState>>(() => Object.fromEntries(ALARMS.map((alarm) => [alarm.id, alarm.state])));
  const [tab, setTab] = useState<Tab>("active");
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState<AlarmPriority | "all">("all");

  const rows = useMemo(() => ALARMS.filter((alarm) => {
    const state = states[alarm.id] ?? alarm.state;
    const inTab = tab === "active" ? state.startsWith("Active") : tab === "shelved" ? state === "Shelved" : state === "Cleared";
    const matchesQuery = `${alarm.id} ${alarm.message}`.toLowerCase().includes(query.toLowerCase());
    return inTab && matchesQuery && (priority === "all" || alarm.priority === priority);
  }), [priority, query, states, tab]);

  const changeState = (id: string, state: AlarmState) => setStates((current) => ({ ...current, [id]: state }));

  return <div className="space-y-3">
    <div className="grid grid-cols-5 gap-3">
      {COUNTS.map((item) => <div key={item.priority} className="flex items-center justify-between rounded-sm border border-border bg-card p-3"><PriorityBadge priority={item.priority} /><span className="num text-2xl font-medium">{item.count}</span></div>)}
      <div className="flex items-center justify-between rounded-sm border border-border bg-card p-3"><span className="text-xs font-semibold uppercase text-muted-foreground">Shelved</span><span className="num text-2xl font-medium">1</span></div>
    </div>
    <div className="grid grid-cols-12 gap-3">
      <PanelCard title="Alarms and events" className="col-span-9" bodyClassName="p-0">
        <div className="flex items-center gap-2 border-b border-border p-2">
          <Tabs value={tab} onValueChange={(value) => setTab(value as Tab)}><TabsList className="h-8 rounded-sm p-0.5">{["active", "shelved", "history"].map((value) => <TabsTrigger key={value} value={value} className="h-7 rounded-sm px-3 text-xs capitalize">{value}</TabsTrigger>)}</TabsList></Tabs>
          <div className="flex-1" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter alarms" className="h-8 w-52 rounded-sm text-xs" />
          <Select value={priority} onValueChange={(value) => setPriority(value as AlarmPriority | "all")}><SelectTrigger className="h-8 w-36 rounded-sm text-xs"><SelectValue /></SelectTrigger><SelectContent>{["all", "critical", "high", "medium", "low"].map((value) => <SelectItem key={value} value={value} className="text-xs capitalize">{value === "all" ? "All priorities" : value}</SelectItem>)}</SelectContent></Select>
        </div>
        <div className="overflow-auto"><table className="w-full border-collapse text-left text-xs"><thead className="bg-secondary text-[10px] uppercase text-muted-foreground"><tr>{["Priority", "ID", "Message", "State", "Raised", "Setpoint", "Deadband", ""].map((heading, index) => <th key={`${heading}-${index}`} className="px-2 py-2 font-medium">{heading}</th>)}</tr></thead><tbody>{rows.map((alarm) => {
          const state = states[alarm.id] ?? alarm.state;
          return <tr key={alarm.id} className="border-t border-border"><td className="px-2 py-2"><PriorityBadge priority={alarm.priority} /></td><td className="num px-2 py-2">{alarm.id}</td><td className="px-2 py-2">{alarm.message}</td><td className="px-2 py-2">{state}</td><td className="num px-2 py-2">{alarm.raisedAt}</td><td className="num px-2 py-2">{alarm.setpoint}</td><td className="num px-2 py-2">{alarm.deadband}</td><td className="px-2 py-2"><div className="flex gap-1">{state === "Active unacknowledged" && <Button size="sm" className="h-7 px-2" onClick={() => changeState(alarm.id, "Active acknowledged")}>Acknowledge</Button>}{state.startsWith("Active") && <Button size="sm" variant="outline" className="h-7 px-2" onClick={() => changeState(alarm.id, "Shelved")}>Shelve</Button>}{state === "Shelved" && <Button size="sm" variant="outline" className="h-7 px-2" onClick={() => changeState(alarm.id, "Active acknowledged")}>Unshelve</Button>}</div></td></tr>;
        })}</tbody></table></div>
      </PanelCard>
      <PanelCard title="Alarm philosophy" className="col-span-3"><div className="space-y-3 text-xs"><p>4 priority levels only</p><p>Deadbands prevent chatter</p><p>Informational messages are not alarms</p></div></PanelCard>
    </div>
  </div>;
}