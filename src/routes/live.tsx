import { createFileRoute } from "@tanstack/react-router";
import { LiveInspectionPage } from "@/pages/LiveInspectionPage";

export const Route = createFileRoute("/live")({
  head: () => ({ meta: [{ title: "Live Inspection | Synapse Inspect" }, { name: "description", content: "Live line-scan inspection and verdict stream." }, { property: "og:title", content: "Live Inspection | Synapse Inspect" }, { property: "og:description", content: "Live line-scan inspection and verdict stream." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: LiveInspectionPage,
});