"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { readUtm } from "@/lib/analytics";

const inputCls =
  "w-full rounded-[1.1rem] border border-line-strong bg-bg-raised px-4 py-3 text-ink-strong placeholder:text-ink-muted/70 transition-colors duration-500 hover:border-ink-muted aria-[invalid=true]:border-ember";

type Base = {
  name: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  required?: boolean;
  className?: string;
};

function Label({ htmlFor, label, required }: { htmlFor: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink-strong">
      {label}
      {required ? (
        <span className="text-accent-ink" aria-hidden>
          {" "}
          *
        </span>
      ) : (
        <span className="font-normal text-ink-muted"> (optional)</span>
      )}
    </label>
  );
}

function Help({ id, hint, error }: { id: string; hint?: ReactNode; error?: string }) {
  return (
    <>
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-semibold text-accent-ink">
          <span aria-hidden>● </span>
          {error}
        </p>
      )}
    </>
  );
}

const describedBy = (id: string, hint?: ReactNode, error?: string) =>
  [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;

export function TextField({
  name,
  label,
  error,
  hint,
  required,
  className = "",
  type = "text",
  autoComplete,
  defaultValue,
  inputMode,
  min,
  max,
  placeholder,
}: Base & {
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  min?: number | string;
  max?: number | string;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div className={className}>
      <Label htmlFor={id} label={label} required={required} />
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        inputMode={inputMode}
        min={min}
        max={max}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={inputCls}
      />
      <Help id={id} hint={hint} error={error} />
    </div>
  );
}

export function TextAreaField({ name, label, error, hint, required, className = "", rows = 5 }: Base & { rows?: number }) {
  const id = useId();
  return (
    <div className={className}>
      <Label htmlFor={id} label={label} required={required} />
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        maxLength={3000}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${inputCls} resize-y`}
      />
      <Help id={id} hint={hint} error={error} />
    </div>
  );
}

export type Option = { value: string; label: string };

export function SelectField({
  name,
  label,
  error,
  hint,
  required,
  className = "",
  options,
  defaultValue = "",
}: Base & { options: Option[]; defaultValue?: string }) {
  const id = useId();
  return (
    <div className={className}>
      <Label htmlFor={id} label={label} required={required} />
      <select
        id={id}
        name={name}
        required={required}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${inputCls} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22><path d=%22M5 8l5 5 5-5%22 fill=%22none%22 stroke=%22%23b9b6aa%22 stroke-width=%221.6%22 stroke-linecap=%22round%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
      >
        <option value="">{required ? "Choose…" : "Prefer not to say"}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Help id={id} hint={hint} error={error} />
    </div>
  );
}

export function ChoiceGroup({
  name,
  label,
  error,
  hint,
  required,
  className = "",
  options,
  type = "checkbox",
}: Base & { options: Option[]; type?: "checkbox" | "radio" }) {
  const id = useId();
  return (
    <fieldset className={className} aria-describedby={describedBy(id, hint, error)} aria-invalid={error ? true : undefined}>
      <legend className="mb-2 text-sm font-semibold text-ink-strong">
        {label}
        {required ? (
          <span className="text-accent-ink" aria-hidden>
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-ink-muted"> (optional)</span>
        )}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className="organic-pill relative flex cursor-pointer items-center gap-2 border border-line-strong px-4 py-2 text-sm transition-colors duration-500 has-[:checked]:border-glow has-[:checked]:bg-[var(--placeholder-bg)] has-[:checked]:text-ink-strong has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-glow"
          >
            <input type={type} name={name} value={o.value} required={type === "radio" && required} className="sr-only" />
            <span aria-hidden className="h-2.5 w-2.5 rounded-full border border-current" />
            {o.label}
          </label>
        ))}
      </div>
      <Help id={id} hint={hint} error={error} />
    </fieldset>
  );
}

export function ConsentField({ error, children }: { error?: string; children: ReactNode }) {
  const id = useId();
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name="consent"
          type="checkbox"
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-5 w-5 shrink-0 accent-[var(--glow)]"
        />
        <label htmlFor={id} className="text-sm text-ink-muted">
          {children}
        </label>
      </div>
      <Help id={id} error={error} />
    </div>
  );
}

/** Hidden trap field. Real people never see or fill it. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

/** source_page + first-touch UTM params, filled in on the client. */
export function MetaFields() {
  const pathname = usePathname();
  const [utm, setUtm] = useState<Record<string, string>>({});
  useEffect(() => {
    queueMicrotask(() => setUtm(readUtm() as Record<string, string>));
  }, []);
  return (
    <>
      <input type="hidden" name="source_page" value={pathname} />
      {Object.entries(utm).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
    </>
  );
}

export function SubmitButton({ pending, children }: { pending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="organic-pill inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap bg-glow px-7 py-3 font-semibold text-on-glow shadow-[0_0_32px_-6px_rgb(255_181_71/0.7)] transition-[background-color,box-shadow,opacity] duration-700 hover:bg-glow-soft disabled:cursor-progress disabled:opacity-70"
    >
      {pending && <span aria-hidden className="anim-breathe h-3 w-3 rounded-full bg-on-glow/70" />}
      {children}
    </button>
  );
}
