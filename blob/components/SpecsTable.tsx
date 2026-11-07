import { specsNote } from "@/content/products";
import { PrelaunchNote } from "./ui";

export function SpecsTable({ specs, caption }: { specs: { label: string; value: string }[]; caption: string }) {
  return (
    <div>
      <PrelaunchNote>{specsNote}</PrelaunchNote>
      <div className="organic-card mt-5 overflow-hidden border border-line">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{caption} (design targets)</caption>
          <tbody>
            {specs.map((s) => (
              <tr key={s.label} className="border-t border-line first:border-t-0">
                <th scope="row" className="w-2/5 bg-bg-raised px-5 py-3.5 text-sm font-semibold text-ink-muted">{s.label}</th>
                <td className="px-5 py-3.5 text-ink">
                  {s.value} <span className="text-xs text-ink-muted">(target)</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
