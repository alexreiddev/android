import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { terms as doc } from "@/content/legal";
import { breadcrumbLd, JsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: doc.title, description: doc.description, path: "/terms" });

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: doc.title, path: "/terms" }])} />
      <LegalPage doc={doc} />
    </>
  );
}
