"use client";
import { useState } from "react";

// Sign up free at web3forms.com to get your access key, then replace this value.
const WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

const inputBase =
  "w-full rounded-sm border border-chrome bg-porcelain px-4 py-3 text-sm text-navy placeholder:text-steel/50 transition-colors duration-150 focus:border-navy/50 focus:outline-none focus:ring-2 focus:ring-navy/20";

const subjects = [
  "General enquiry",
  "Dealer / distributor partnership",
  "Project specification (architect / designer)",
  "Product information",
  "Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const data = new FormData(e.currentTarget);
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", "New enquiry — Aquai website");
    data.append("from_name", "Aquai Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-chrome/40 bg-mist px-8 py-12 text-center">
        <p className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
          Submitted
        </p>
        <h3 className="mb-3 font-display text-2xl text-navy">
          Thank you for reaching out.
        </h3>
        <p className="text-sm text-steel">
          Our team will respond within one business day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs text-steel underline underline-offset-4 hover:text-navy transition-colors duration-150"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from humans, catches bots */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-xs font-medium text-steel">
            Full name <span aria-hidden="true" className="text-accent-red">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputBase}
          />
        </div>

        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-xs font-medium text-steel">
            Email <span aria-hidden="true" className="text-accent-red">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={inputBase}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-phone" className="mb-1.5 block text-xs font-medium text-steel">
            Phone
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 _____ _____"
            className={inputBase}
          />
        </div>

        <div>
          <label htmlFor="cf-company" className="mb-1.5 block text-xs font-medium text-steel">
            Company / Organisation
          </label>
          <input
            id="cf-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Optional"
            className={inputBase}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-subject" className="mb-1.5 block text-xs font-medium text-steel">
          Subject
        </label>
        <select id="cf-subject" name="enquiry_type" className={inputBase}>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-xs font-medium text-steel">
          Message <span aria-hidden="true" className="text-accent-red">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your project or enquiry."
          className={`${inputBase} resize-none`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-accent-red">
          Something went wrong. Please try again or reach us by phone.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-sm bg-navy py-3.5 text-sm font-semibold text-porcelain transition-colors duration-200 hover:bg-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
