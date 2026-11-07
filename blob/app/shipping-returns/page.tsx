import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { shippingReturns as doc } from "@/content/legal";
import { breadcrumbLd, JsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: doc.title, description: doc.description, path: "/shipping-returns" });

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: doc.title, path: "/shipping-returns" }])} />
      <LegalPage doc={doc} />
    </>
  );
}
