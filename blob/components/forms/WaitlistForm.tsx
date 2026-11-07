"use client";

import { useRef } from "react";
import { submitWaitlist } from "@/app/actions";
import { waitlistSchema } from "@/lib/validation";
import { Honeypot, MetaFields, SelectField, SubmitButton, TextField } from "./fields";
import { Turnstile } from "./Turnstile";
import { FormFrame, useBlobForm } from "./useBlobForm";

const interests = [
  { value: "soft", label: "BLOB Soft: home & garden" },
  { value: "field", label: "BLOB Field: resorts & paths" },
  { value: "atelier", label: "BLOB Atelier: hand-blown glass" },
  { value: "firefly_path", label: "Firefly Path installation" },
  { value: "undecided", label: "Not sure yet" },
];

export function WaitlistForm({ defaultInterest = "" }: { defaultInterest?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const f = useBlobForm({
    formRef, action: submitWaitlist, schema: waitlistSchema, event: "form_submit_waitlist" });
  return (
    <FormFrame state={f.state} message={f.message} successTitle="You're on the list.">
      <form ref={formRef} action={f.formAction} onSubmit={f.onSubmit} noValidate className="relative grid gap-4 sm:grid-cols-2">
        <Honeypot />
        <MetaFields />
        <TextField name="email" label="Email" type="email" autoComplete="email" inputMode="email" required error={f.errors.email} className="sm:col-span-2" />
        <TextField name="name" label="Name" autoComplete="name" error={f.errors.name} />
        <TextField name="city" label="City" autoComplete="address-level2" error={f.errors.city} />
        <SelectField name="interest" label="Most interested in" options={interests} defaultValue={defaultInterest} error={f.errors.interest} className="sm:col-span-2" />
        <div className="sm:col-span-2">
          <Turnstile />
        </div>
        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
          <SubmitButton pending={f.pending}>{f.pending ? "Joining…" : "Join the waitlist"}</SubmitButton>
          <p className="text-xs text-ink-muted">
            One email when the first lights are ready. No spam. See our <a className="underline underline-offset-2" href="/privacy">privacy notice</a>.
          </p>
        </div>
      </form>
    </FormFrame>
  );
}
