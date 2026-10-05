import { createContext, useContext, useState, type ReactNode } from "react";
import { ItemInspectorDrawer } from "@/components/item-inspector/ItemInspectorDrawer";

interface ItemInspectorValue { openItem: (id: string) => void }
const ItemInspectorContext = createContext<ItemInspectorValue | undefined>(undefined);

export function ItemInspectorProvider({ children }: { children: ReactNode }) {
  const [itemId, setItemId] = useState<string | null>(null);
  return <ItemInspectorContext.Provider value={{ openItem: setItemId }}>{children}<ItemInspectorDrawer itemId={itemId} onClose={() => setItemId(null)} /></ItemInspectorContext.Provider>;
}

export function useItemInspector() {
  const context = useContext(ItemInspectorContext);
  if (!context) throw new Error("useItemInspector must be used inside ItemInspectorProvider");
  return context;
}