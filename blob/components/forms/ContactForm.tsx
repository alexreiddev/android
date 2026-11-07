"use client";

import { useRef } from "react";
import { submitContact } from "@/app/actions";
import { contactSchema } from "@/lib/validation";
import { ConsentField, Honeypot, MetaFields, SelectField, SubmitButton, TextAreaField, TextField } from "./fields";
import { Turnstile } from "./Turnstile";
import { FormFrame, useBlobForm } from "./useBlobForm";

const topics = [
  { value: "General question", label: "General question" },
  { value: "Press", label: "Press" },
  { value: "Partnership", label: "Partnership" },
  { value: "Something else", label: "Something else" },
];

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const f = useBlobForm({
    formRef, action: submitContact, schema: contactSchema, event: "form_submit_contact" });
  const e = f.errors;
  return (
    <FormFrame state={f.state} message={f.message} successTitle="Message received.">
      <form ref={formRef} action={f.formAction} onSubmit={f.onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
        <Honeypot />
        <MetaFields />
        <TextField name="name" label="Name" autoComplete="name" required error={e.name} />
        <TextField name="email" label="Email" type="email" inputMode="email" autoComplete="email" required error={e.email} />
        <SelectField name="topic" label="Topic" options={topics} error={e.topic} className="sm:col-span-2" />
        <TextAreaField name="message" label="Message" required error={e.message} className="sm:col-span-2" />
        <div className="sm:col-span-2">
          <ConsentField error={e.consent}>
            I agree that BLOB may store these details to reply to me, as described in the <a className="underline underline-offset-2" href="/privacy">privacy notice</a>.
          </ConsentField>
        </div>
        <div className="sm:col-span-2">
          <Turnstile />
        </div>
        <div className="sm:col-span-2">
          <SubmitButton pending={f.pending}>{f.pending ? "Sending…" : "Send message"}</SubmitButton>
        </div>
      </form>
    </FormFrame>
  );
}
