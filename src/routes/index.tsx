import { createFileRoute } from "@tanstack/react-router";
import { OverviewPage } from "@/pages/OverviewPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Line Overview | Synapse Inspect" },
      { name: "description", content: "Live operating overview for Demo Plant Line 03." },
      { property: "og:title", content: "Line Overview | Synapse Inspect" },
      { property: "og:description", content: "Live operating overview for Demo Plant Line 03." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OverviewPage,
});