import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { PrintButton } from "@/components/PrintButton";
import { Placeholder } from "@/components/ui";
import { getTier, packages, specsNote } from "@/content/products";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "BLOB for resorts: one-page brief",
  description: "A printable one-page brief on BLOB Field pathway lighting for resorts, homestays and campsites.",
  alternates: { canonical: "/resorts/brief" },
  robots: { index: false, follow: true },
};

const points = [
  ["No wiring, no trenching", "Twist a stake into the ground. Move lights when the garden changes."],
  ["No solar", "Works under canopy and through the monsoon."],
  ["Wakes for each guest", "Warm 2200K light as they approach, a slow fade behind them."],
  ["Easy for staff", "Swap a cell from the charging rack in seconds. No app, no pairing."],
];

/** Print-friendly one-pager for owners and managers. Always light, A4-shaped. */
export default function BriefPage() {
  const field = getTier("field")!;
  const specs = field.specs.filter((s) => ["Light", "Motion sensing", "Runtime", "Power", "Low battery", "Mounting"].includes(s.label));
  return (
    <div className="brief-sheet [--accent-ink:#7a4310] [--placeholder-bg:rgb(201_115_30/0.12)] mx-auto my-8 max-w-[800px] bg-[#fbf7ef] px-6 py-8 text-[#2a3529] sm:px-10 print:my-0 print:max-w-none print:p-0">
      <div className="mb-6 flex items-center justify-between gap-4 print:hidden">
        <Link href="/resorts" className="text-sm text-[#7a4310] underline underline-offset-4">
          ← Back to resorts
        </Link>
        <PrintButton />
      </div>

      <header className="flex items-end justify-between border-b border-[#2a3529]/20 pb-4">
        <Logo className="h-9 w-auto text-[#172017]" />
        <p className="text-sm">Pathway lighting for resorts &amp; homestays</p>
      </header>

      <h1 className="mt-6 text-3xl !text-[#172017] sm:text-4xl">Light your paths without lighting up the night.</h1>
      <p className="mt-3 text-lg">
        BLOB Field is a small, milky, pebble-shaped light on a ground stake. It sleeps in the dark, wakes gently when a guest
        walks by, and fades after they pass.
      </p>

      <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {points.map(([t, d]) => (
          <div key={t}>
            <dt className="font-semibold text-[#172017]">{t}</dt>
            <dd className="text-sm">{d}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        <section>
          <h2 className="text-xl !text-[#172017]">Design targets</h2>
          <table className="mt-2 w-full text-sm">
            <tbody>
              {specs.map((s) => (
                <tr key={s.label} className="border-t border-[#2a3529]/15">
                  <th scope="row" className="py-1.5 pr-3 text-left font-semibold">
                    {s.label}
                  </th>
                  <td className="py-1.5">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs">{specsNote}</p>
        </section>
        <section>
          <h2 className="text-xl !text-[#172017]">Ways to start</h2>
          <ul className="mt-2 space-y-3 text-sm">
            <li>
              <strong>Pilot programme.</strong> Discounted units for a few Kerala properties, in exchange for honest feedback and
              night photography.
            </li>
            <li>
              <strong>{packages[1].name}.</strong> {packages[1].line}
            </li>
            <li>
              <strong>{packages[0].name}.</strong> {packages[0].line}
            </li>
          </ul>
          <p className="mt-3 text-sm">
            <strong>Indicative price:</strong> {field.price.display}. Packs and installations by quote.
          </p>
        </section>
      </div>

      <footer className="mt-8 border-t border-[#2a3529]/20 pt-4 text-sm">
        <p>
          <strong>Request a quote or a night demo:</strong> {site.url.replace(/^https?:\/\//, "")}/resorts
        </p>
        <p className="mt-1">
          Email: {site.contact.email ?? <Placeholder k="CONTACT_EMAIL">contact email</Placeholder>} · WhatsApp:{" "}
          {site.contact.whatsapp ?? <Placeholder k="WHATSAPP_NUMBER">WhatsApp number</Placeholder>}
        </p>
        <p className="mt-3 text-xs">BLOB · Light That Feels Alive. · Designed in Kerala · Pre-launch: details may change.</p>
      </footer>
    </div>
  );
}
