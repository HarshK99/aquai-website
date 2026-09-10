"use client";
import { useEffect, useRef, useState } from "react";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const canSendOnline = Boolean(WEB3FORMS_KEY && WEB3FORMS_KEY !== "YOUR_WEB3FORMS_ACCESS_KEY");

const inputBase =
  "w-full rounded-sm border border-chrome bg-porcelain px-4 py-3 text-base text-navy placeholder:text-steel transition-colors duration-150 focus:border-navy/50 focus:outline-none focus:ring-2 focus:ring-navy/20";

const subjects = [
  "General enquiry",
  "Dealer / distributor partnership",
  "Project specification (architect / designer)",
  "Product information",
  "Other",
];

export default function ContactForm() {
  const submitting = useRef(false);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("General enquiry");
  const [emailOpened, setEmailOpened] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const product = params.get("product");
    const finish = params.get("finish");
    if (product) {
      setMessage(`I'd like to enquire about the Aquai ${product}${finish ? ` (${finish})` : ""}.`);
      setSubject("Product information");
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (!canSendOnline) {
      const body = [
        `Name: ${data.get("name")}`,
        `Email: ${data.get("email")}`,
        `Phone: ${data.get("phone") || "Not provided"}`,
        `Company: ${data.get("organization") || "Not provided"}`,
        "", String(data.get("message") || ""),
      ].join("\n");
      window.location.href = `mailto:coregujarat@coreindia.co.in?subject=${encodeURIComponent(`Aquai enquiry: ${subject}`)}&body=${encodeURIComponent(body)}`;
      setEmailOpened(true);
      return;
    }
    submitting.current = true;
    setStatus("submitting");

    data.append("access_key", WEB3FORMS_KEY!);
    data.append("subject", "New enquiry - Aquai website");
    data.append("from_name", "Aquai Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus("success");
        form.reset();
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-sm border border-chrome/40 bg-mist px-6 py-10 text-center">
        <p className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
          Submitted
        </p>
        <h3 className="mb-3 font-display text-2xl text-navy">
          Thank you for reaching out.
        </h3>
        <p className="text-sm text-steel">
          Your enquiry has been sent to our team.
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
    <form onSubmit={handleSubmit} className="space-y-5" aria-busy={status === "submitting"}>
      {!canSendOnline && (
        <p className="text-sm text-steel">
          Fill in your enquiry, then send it from your email app. You can also call or WhatsApp us above.
        </p>
      )}
      {/* Honeypot - hidden from humans, catches bots */}
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
            name="organization"
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
        <select id="cf-subject" name="enquiry_type" className={inputBase} value={subject} onChange={(event) => setSubject(event.target.value)}>
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
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell us about your project or enquiry."
          className={`${inputBase} resize-none`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-accent-red">
          Something went wrong. Please try again or reach us by phone.
        </p>
      )}
      {emailOpened && (
        <p role="status" className="text-sm text-steel">
          Finish sending in your email app. If it did not open, email coregujarat@coreindia.co.in or use WhatsApp above. Your details are still here.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-sm bg-navy py-3.5 text-sm font-semibold text-porcelain transition-colors duration-200 hover:bg-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : canSendOnline ? "Send enquiry" : "Continue in email"}
      </button>
    </form>
  );
}
