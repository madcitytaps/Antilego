"use client";

import { useEffect, useState } from "react";

const CONTACT_EMAIL = "antilego.activism193@passmail.net";

const EXPECTATIONS = [
  {
    title: "Your workflow, mapped",
    body: "We learn how calls, bookings, and leads flow through your business today.",
  },
  {
    title: "Live AI receptionist demo",
    body: "See real call handling, scheduling, and qualification — not a slide deck.",
  },
  {
    title: "Clear next steps",
    body: "You'll leave knowing fit, timeline, and what a custom build would look like.",
  },
] as const;

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" />
      <path
        d="M5 8.2 7 10.2 11 6.2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Contact / schedule section stub — text or email only (no calendar embed). */
export default function BookingSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById("book-demo");
    if (!section || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    "Antilego demo — schedule a time"
  )}`;

  return (
    <section
      id="book-demo"
      aria-labelledby="booking-heading"
      className="relative overflow-hidden bg-black py-24 text-white sm:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 animate-booking-pulse bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.14),transparent_65%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1e1e1e] to-transparent"
        aria-hidden
      />

      <div
        className={[
          "relative mx-auto max-w-6xl px-6 transition-all duration-700 ease-out sm:px-8",
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        ].join(" ")}
      >
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#3b82f6]">
            Free strategy call
          </p>
          <h2
            id="booking-heading"
            className="mt-3 text-balance font-display text-[clamp(2rem,5vw,3rem)] font-light leading-[1.12] tracking-[-0.02em] text-white"
          >
            Text or email to schedule.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty font-sans text-base font-light leading-[1.65] text-[#888888] sm:text-[17px]">
            Skip the calendar widget — tell us when you&apos;re free and how to
            reach you. We&apos;ll confirm a 30-minute demo by text or email.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1e1e1e] bg-[#0a0a0a] px-4 py-1.5 font-sans text-xs text-[#888888]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" aria-hidden />
              30 minutes
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1e1e1e] bg-[#0a0a0a] px-4 py-1.5 font-sans text-xs text-[#888888]">
              No commitment
            </span>
          </div>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href={mailto}
              className="inline-flex items-center justify-center rounded bg-[#2563eb] px-8 py-4 font-sans text-sm font-medium tracking-[0.06em] text-white shadow-[0_0_32px_rgba(37,99,235,0.15)] transition duration-200 hover:scale-[1.025] hover:bg-[#3b82f6] hover:shadow-[0_0_48px_rgba(37,99,235,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#3b82f6]"
            >
              Email to schedule
            </a>
            <a
              href="#schedule-form"
              className="inline-flex items-center justify-center rounded border border-[#1e1e1e] bg-transparent px-8 py-4 font-sans text-sm font-medium tracking-[0.06em] text-white transition duration-200 hover:border-[#2563eb] hover:bg-[#111111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#3b82f6]"
            >
              Leave your number
            </a>
          </div>
        </header>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-10 lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <div className="rounded border border-[#1e1e1e] bg-[#0a0a0a] p-6 sm:p-8">
              <h3 className="font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-[#888888]">
                What to expect
              </h3>
              <ul className="mt-6 space-y-6">
                {EXPECTATIONS.map((item, index) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#1e1e1e] bg-[#111111] font-mono text-[11px] text-[#3b82f6]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-sans text-sm font-medium text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 font-sans text-sm font-light leading-relaxed text-[#888888]">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-3 border-t border-[#1e1e1e] pt-6">
                {[
                  "Built for service businesses",
                  "Custom voice & workflows",
                  "Stripe billing when you go live",
                ].map((line) => (
                  <p
                    key={line}
                    className="flex items-start gap-2.5 font-sans text-xs text-[#888888]"
                  >
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]" />
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </aside>

          <div
            id="schedule-form"
            className="rounded border border-[#1e1e1e] bg-[#0a0a0a] p-6 sm:p-8"
          >
            <h3 className="font-sans text-lg font-medium text-white">
              Request a demo time
            </h3>
            <p className="mt-2 font-sans text-sm font-light leading-relaxed text-[#888888]">
              Prefer the live site form in{" "}
              <code className="font-mono text-xs text-[#3b82f6]">index.html</code>
              . This React stub is for a future Next.js migration.
            </p>
            <a
              href={mailto}
              className="mt-6 inline-flex font-mono text-sm text-[#3b82f6] underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
