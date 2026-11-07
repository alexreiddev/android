"use client";

import { useId, useRef, useState } from "react";
import { submitAtelier } from "@/app/actions";
import { atelierSchema, UPLOAD_MAX_BYTES, UPLOAD_MAX_FILES, UPLOAD_TYPES } from "@/lib/validation";
import { ChoiceGroup, ConsentField, Honeypot, MetaFields, SelectField, SubmitButton, TextAreaField, TextField } from "./fields";
import { Turnstile } from "./Turnstile";
import { FormFrame, useBlobForm } from "./useBlobForm";

const clientTypes = [
  { value: "homeowner", label: "Homeowner" },
  { value: "architect", label: "Architect" },
  { value: "interior_designer", label: "Interior designer" },
  { value: "landscape_designer", label: "Landscape designer" },
  { value: "hospitality", label: "Hospitality" },
];
const finishes = [
  { value: "clear", label: "Clear" },
  { value: "frosted", label: "Frosted" },
  { value: "undecided", label: "Undecided" },
];
const placements = [
  { value: "indoor", label: "Indoor" },
  { value: "outdoor", label: "Outdoor" },
  { value: "both", label: "Both" },
];
const budgets = [
  { value: "under_1l", label: "Under ₹1 lakh" },
  { value: "1l_3l", label: "₹1–3 lakh" },
  { value: "3l_10l", label: "₹3–10 lakh" },
  { value: "over_10l", label: "Over ₹10 lakh" },
  { value: "not_sure", label: "Not sure yet" },
];

const fmtSize = (b: number) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(b / 1024)} KB`);

export function CommissionForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string | null>(null);
  const fileId = useId();

  const formRef = useRef<HTMLFormElement>(null);
  const f = useBlobForm({
    formRef,
    action: submitAtelier,
    schema: atelierSchema,
    arrayKeys: ["upload_paths"],
    event: "form_submit_atelier_commission",
    beforeSubmit: async (fd) => {
      if (files.length === 0) return { ok: true };
      try {
        setProgress("Preparing upload…");
        const res = await fetch("/api/atelier/upload-urls", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ files: files.map((x) => ({ name: x.name, type: x.type, size: x.size })) }),
        });
        const data = (await res.json()) as { uploads?: { path: string; signedUrl: string }[]; error?: string };
        if (!res.ok || !data.uploads) return { ok: false, message: data.error || "Upload failed.", field: "uploads" };
        for (const [i, u] of data.uploads.entries()) {
          setProgress(`Uploading image ${i + 1} of ${files.length}…`);
          const put = await fetch(u.signedUrl, {
            method: "PUT",
            headers: { "content-type": files[i].type, "x-upsert": "false", "cache-control": "max-age=3600" },
            body: files[i],
          });
          if (!put.ok) return { ok: false, message: `Image ${i + 1} didn't upload. Please try again or remove it.`, field: "uploads" };
          fd.append("upload_paths", u.path);
        }
        return { ok: true };
      } catch {
        return { ok: false, message: "Upload failed. Check your connection and try again.", field: "uploads" };
      } finally {
        setProgress(null);
      }
    },
  });
  const e = f.errors;
  const uploadError = fileError ?? e.uploads ?? e.upload_paths;

  const onFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files];
    let err: string | null = null;
    for (const file of Array.from(list)) {
      if (!(UPLOAD_TYPES as readonly string[]).includes(file.type)) err = `"${file.name}" isn't a supported image (JPG, PNG, WebP, AVIF, HEIC).`;
      else if (file.size > UPLOAD_MAX_BYTES) err = `"${file.name}" is larger than 10 MB.`;
      else if (next.length >= UPLOAD_MAX_FILES) err = `Up to ${UPLOAD_MAX_FILES} images.`;
      else next.push(file);
    }
    setFiles(next);
    setFileError(err);
  };

  return (
    <FormFrame state={f.state} message={f.message} successTitle="Thank you. Let's talk.">
      <form ref={formRef} action={f.formAction} onSubmit={f.onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
        <Honeypot />
        <MetaFields />
        <TextField name="name" label="Name" autoComplete="name" required error={e.name} />
        <SelectField name="client_type" label="You are a…" options={clientTypes} required error={e.client_type} />
        <TextField name="email" label="Email" type="email" inputMode="email" autoComplete="email" required error={e.email} />
        <TextField name="phone" label="Phone / WhatsApp" type="tel" inputMode="tel" autoComplete="tel" defaultValue="+91 " required error={e.phone} />
        <TextField name="project_location" label="Project location" required error={e.project_location} />
        <TextField name="pieces" label="Number of pieces" type="number" inputMode="numeric" min={1} required error={e.pieces} />
        <ChoiceGroup name="glass_finish" type="radio" label="Glass" options={finishes} required error={e.glass_finish} />
        <ChoiceGroup name="placement" type="radio" label="Indoor or outdoor" options={placements} required error={e.placement} />

        <div className="sm:col-span-2">
          <label htmlFor={fileId} className="mb-1.5 block text-sm font-semibold text-ink-strong">
            Inspiration images <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <div className="organic-card border border-dashed border-line-strong bg-bg-raised p-5">
            <input
              id={fileId}
              type="file"
              accept={UPLOAD_TYPES.join(",")}
              multiple
              disabled={files.length >= UPLOAD_MAX_FILES}
              onChange={(ev) => {
                onFiles(ev.currentTarget.files);
                ev.currentTarget.value = "";
              }}
              aria-describedby={`${fileId}-hint${uploadError ? ` ${fileId}-error` : ""}`}
              aria-invalid={uploadError ? true : undefined}
              className="block w-full text-sm text-ink-muted file:mr-4 file:rounded-full file:border-0 file:bg-glow file:px-4 file:py-2 file:font-semibold file:text-on-glow"
            />
            <p id={`${fileId}-hint`} className="mt-2 text-sm text-ink-muted">
              Up to {UPLOAD_MAX_FILES} images, 10 MB each. Sketches, places, moods, anything that helps. Stored privately.
            </p>
            {files.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm">
                {files.map((file, i) => (
                  <li key={`${file.name}-${i}`} className="flex items-center justify-between gap-3">
                    <span className="truncate text-ink">
                      {file.name} <span className="text-ink-muted">· {fmtSize(file.size)}</span>
                    </span>
                    <button
                      type="button"
                      className="shrink-0 text-accent-ink underline underline-offset-2"
                      onClick={() => setFiles(files.filter((_, j) => j !== i))}
                      aria-label={`Remove ${file.name}`}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {uploadError && (
              <p id={`${fileId}-error`} className="mt-2 text-sm font-semibold text-accent-ink">
                {uploadError}
              </p>
            )}
          </div>
        </div>

        <SelectField name="budget_range" label="Budget range" options={budgets} error={e.budget_range} />
        <TextField name="desired_date" label="Desired date" type="month" error={e.desired_date} hint="Roughly when you'd like the pieces." />
        <TextAreaField name="message" label="Tell us about the space" error={e.message} className="sm:col-span-2" />
        <div className="sm:col-span-2">
          <ConsentField error={e.consent}>
            I agree that BLOB may store these details and images to respond to my enquiry, as described in the <a className="underline underline-offset-2" href="/privacy">privacy notice</a>.
          </ConsentField>
        </div>
        <div className="sm:col-span-2">
          <Turnstile />
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
          <SubmitButton pending={f.pending}>{f.pending ? "Sending…" : "Start a commission"}</SubmitButton>
          {progress && (
            <p role="status" className="text-sm text-ink-muted">
              {progress}
            </p>
          )}
        </div>
      </form>
    </FormFrame>
  );
}
