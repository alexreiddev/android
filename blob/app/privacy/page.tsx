import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacy as doc } from "@/content/legal";
import { breadcrumbLd, JsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: doc.title, description: doc.description, path: "/privacy" });

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: doc.title, path: "/privacy" }])} />
      <LegalPage doc={doc} />
    </>
  );
}
