"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent, type ReactNode, type RefObject } from "react";
import type { z } from "zod";
import { trackEvent } from "@/lib/analytics";
import { flattenErrors, formToObject, type FieldErrors, type FormState } from "@/lib/validation";
import { Blob } from "@/components/Blob";

type Action = (prev: FormState, fd: FormData) => Promise<FormState>;

/**
 * Shared form behaviour: client-side zod validation (server re-validates),
 * optional pre-submit step (uploads), analytics event, error focus.
 */
export function useBlobForm({
  action,
  schema,
  arrayKeys = [],
  event,
  beforeSubmit,
  formRef,
}: {
  action: Action;
  schema: z.ZodType;
  arrayKeys?: string[];
  event: string;
  beforeSubmit?: (fd: FormData) => Promise<{ ok: true } | { ok: false; message: string; field?: string }>;
  formRef: RefObject<HTMLFormElement | null>;
}) {
  const [state, formAction, pending] = useActionState(action, { status: "idle" } as FormState);
  const [clientErrors, setClientErrors] = useState<FieldErrors | null>(null);
  const [clientMessage, setClientMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const tracked = useRef<FormState | null>(null);

  const errors = clientErrors ?? state.fieldErrors ?? {};
  const message = clientMessage ?? (state.status === "error" ? state.message : undefined);

  useEffect(() => {
    if (state.status === "success" && tracked.current !== state) {
      tracked.current = state;
      trackEvent(event, { result: "success" });
    }
    if (state.status === "error" && state.fieldErrors) focusFirstError(formRef.current);
  }, [state, event, formRef]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = schema.safeParse(formToObject(fd, arrayKeys));
    if (!parsed.success) {
      setClientErrors(flattenErrors(parsed.error));
      setClientMessage("Please check the highlighted fields.");
      requestAnimationFrame(() => focusFirstError(form));
      return;
    }
    setClientErrors(null);
    setClientMessage(null);
    if (beforeSubmit) {
      setBusy(true);
      const res = await beforeSubmit(fd);
      setBusy(false);
      if (!res.ok) {
        setClientMessage(res.message);
        if (res.field) setClientErrors({ [res.field]: res.message });
        return;
      }
    }
    startTransition(() => formAction(fd));
  };

  return { state, formAction, pending: pending || busy, errors, message, onSubmit };
}

function focusFirstError(form: HTMLFormElement | null) {
  const el = form?.querySelector<HTMLElement>('[aria-invalid="true"]');
  if (!el) return;
  const target = el.tagName === "FIELDSET" ? el.querySelector<HTMLElement>("input") : el;
  target?.focus();
}

/** Status region (announced) + success panel that replaces the form. */
export function FormFrame({
  state,
  message,
  successTitle,
  children,
}: {
  state: FormState;
  message?: string;
  successTitle: string;
  children: ReactNode;
}) {
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="night-scope organic-card flex flex-col items-center px-6 py-12 text-center outline-none">
        <Blob seed={9} state="breathe" className="w-28 text-[#d9d6cc]" />
        <h3 className="mt-4 text-2xl">{successTitle}</h3>
        <p className="mt-2 max-w-md text-ink">{state.message}</p>
      </div>
    );
  }
  return (
    <>
      {children}
      <div aria-live="polite" role="status" className="mt-4 min-h-6 text-sm font-semibold text-accent-ink">
        {message}
      </div>
    </>
  );
}
