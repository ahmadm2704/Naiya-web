"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const HELP_OPTIONS = [
  "Content creation",
  "Campaign planning",
  "Social media management",
  "Branding & design (flyers, business cards etc)",
  "I'm not sure",
] as const;

const schema = z.object({
  name: z.string().min(1, "Required"),
  companyName: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  socialHandle: z.string().min(1, "Required"),
  helpWith: z.array(z.string()).min(1, "Select at least one option"),
  brandSummary: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const STEPS: { title: string; fields: (keyof FormValues)[] }[] = [
  { title: "Who are we planning for?", fields: ["name", "companyName", "email", "phone"] },
  { title: "Where can we find you?", fields: ["socialHandle"] },
  { title: "What do you need help with?", fields: ["helpWith"] },
  { title: "Tell us about your brand", fields: ["brandSummary"] },
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const packageParam = searchParams.get("package") ?? undefined;

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { helpWith: [] },
  });

  const helpWith = watch("helpWith");

  const toggleHelp = (option: string) => {
    const next = helpWith.includes(option)
      ? helpWith.filter((item) => item !== option)
      : [...helpWith, option];
    setValue("helpWith", next, { shouldValidate: true });
  };

  const next = async () => {
    const valid = await trigger(STEPS[step].fields);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting");

    if (!isSupabaseConfigured || !supabase) {
      console.warn("Supabase is not configured yet — enquiry not saved:", values);
      setStatus("success");
      return;
    }

    const { error } = await supabase.from("enquiries").insert({
      name: values.name,
      company_name: values.companyName,
      email: values.email,
      phone: values.phone || null,
      social_handle: values.socialHandle,
      help_with: values.helpWith,
      brand_summary: values.brandSummary || null,
      package: packageParam || null,
    });

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-cream p-10 text-center">
        <h2 className="font-display text-2xl font-bold">Thank you!</h2>
        <p className="mt-3 text-charcoal/70">
          We are looking forward to speaking with you, we will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <div className="flex justify-between text-xs font-semibold uppercase tracking-wide text-charcoal/50">
          <span>Step {step + 1} / {STEPS.length}</span>
          {packageParam && <span className="text-maroon">{packageParam}</span>}
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-charcoal/10">
          <div
            className="h-1.5 rounded-full bg-maroon transition-all"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="font-display text-2xl font-bold">{STEPS[step].title}</h2>

      {step === 0 && (
        <div className="space-y-4">
          <Field label="Full name" error={errors.name?.message}>
            <input {...register("name")} className="input" placeholder="First and last name" />
          </Field>
          <Field label="Company name" error={errors.companyName?.message}>
            <input {...register("companyName")} className="input" placeholder="Your company" />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input {...register("email")} type="email" className="input" placeholder="you@company.com" />
          </Field>
          <Field label="Phone number">
            <input {...register("phone")} className="input" placeholder="Optional" />
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <Field label="Social media handle" error={errors.socialHandle?.message}>
            <input {...register("socialHandle")} className="input" placeholder="@yourbrand" />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          {HELP_OPTIONS.map((option) => {
            const checked = helpWith?.includes(option);
            return (
              <button
                type="button"
                key={option}
                onClick={() => toggleHelp(option)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                  checked ? "border-maroon bg-maroon/5" : "border-charcoal/15"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                    checked ? "border-maroon bg-maroon text-white" : "border-charcoal/30"
                  }`}
                >
                  {checked && <Check size={14} />}
                </span>
                {option}
              </button>
            );
          })}
          {errors.helpWith && (
            <p className="text-sm text-maroon">{errors.helpWith.message}</p>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <Field label="Please write a brief summary of your brand">
            <textarea
              {...register("brandSummary")}
              rows={5}
              className="input"
              placeholder="Tell us about your brand..."
            />
          </Field>
        </div>
      )}

      {status === "error" && (
        <p className="text-sm text-maroon">
          Something went wrong sending your enquiry. Please try again.
        </p>
      )}

      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="rounded-full px-6 py-3 text-sm font-semibold text-charcoal/60 disabled:opacity-0"
        >
          Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-maroon"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-maroon disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Send enquiry"}
          </button>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-charcoal/80">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-sm text-maroon">{error}</p>}
    </label>
  );
}
