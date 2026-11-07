"use client";

import { useRef } from "react";
import { submitB2B } from "@/app/actions";
import { b2bSchema } from "@/lib/validation";
import { ChoiceGroup, ConsentField, Honeypot, MetaFields, SelectField, SubmitButton, TextAreaField, TextField } from "./fields";
import { Turnstile } from "./Turnstile";
import { FormFrame, useBlobForm } from "./useBlobForm";

const propertyTypes = [
  { value: "resort", label: "Resort" },
  { value: "homestay", label: "Homestay" },
  { value: "plantation_stay", label: "Plantation stay" },
  { value: "campsite", label: "Campsite" },
  { value: "other", label: "Other" },
];
const areas = [
  { value: "paths", label: "Paths" },
  { value: "gardens", label: "Gardens" },
  { value: "steps", label: "Steps" },
  { value: "pool", label: "Pool" },
  { value: "other", label: "Other" },
];
const timelines = [
  { value: "within_3_months", label: "Within 3 months" },
  { value: "3_6_months", label: "3–6 months" },
  { value: "6_12_months", label: "6–12 months" },
  { value: "exploring", label: "Just exploring" },
];
const budgets = [
  { value: "under_1l", label: "Under ₹1 lakh" },
  { value: "1l_3l", label: "₹1–3 lakh" },
  { value: "3l_10l", label: "₹3–10 lakh" },
  { value: "over_10l", label: "Over ₹10 lakh" },
  { value: "not_sure", label: "Not sure yet" },
];

export function QuoteForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const f = useBlobForm({
    formRef, action: submitB2B, schema: b2bSchema, arrayKeys: ["areas"], event: "form_submit_b2b_quote" });
  const e = f.errors;
  return (
    <FormFrame state={f.state} message={f.message} successTitle="Request received.">
      <form ref={formRef} action={f.formAction} onSubmit={f.onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
        <Honeypot />
        <MetaFields />
        <TextField name="property_name" label="Property name" autoComplete="organization" required error={e.property_name} />
        <SelectField name="property_type" label="Property type" options={propertyTypes} required error={e.property_type} />
        <TextField name="contact_name" label="Your name" autoComplete="name" required error={e.contact_name} />
        <TextField name="role" label="Your role" autoComplete="organization-title" error={e.role} hint="e.g. Owner, GM, Operations" />
        <TextField name="email" label="Email" type="email" inputMode="email" autoComplete="email" required error={e.email} />
        <TextField name="phone" label="Phone / WhatsApp" type="tel" inputMode="tel" autoComplete="tel" defaultValue="+91 " required error={e.phone} />
        <TextField name="location" label="Location" autoComplete="address-level2" required error={e.location} hint="Town / district, state" />
        <TextField name="units_estimated" label="Number of units (estimate)" type="number" inputMode="numeric" min={1} required error={e.units_estimated} />
        <ChoiceGroup name="areas" label="Areas to light" options={areas} error={e.areas} className="sm:col-span-2" />
        <SelectField name="timeline" label="Timeline" options={timelines} required error={e.timeline} />
        <SelectField name="budget_range" label="Budget range" options={budgets} error={e.budget_range} />
        <TextAreaField name="message" label="Anything else?" error={e.message} className="sm:col-span-2" hint="Paths, distances, number of cottages, what the nights are like…" />
        <div className="sm:col-span-2">
          <ConsentField error={e.consent}>
            I agree that BLOB may store these details and contact me about this enquiry, as described in the <a className="underline underline-offset-2" href="/privacy">privacy notice</a>.
          </ConsentField>
        </div>
        <div className="sm:col-span-2">
          <Turnstile />
        </div>
        <div className="sm:col-span-2">
          <SubmitButton pending={f.pending}>{f.pending ? "Sending…" : "Request a quote"}</SubmitButton>
        </div>
      </form>
    </FormFrame>
  );
}
