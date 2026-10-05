import { PanelCard } from "@/components/ui-hmi/PanelCard";

export function PlaceholderPage({ title }: { title: string }) {
  return <PanelCard title={title} className="min-h-64" />;
}