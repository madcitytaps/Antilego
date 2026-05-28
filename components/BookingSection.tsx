"use client";

import { useEffect, useRef, useState } from "react";

const CAL_EMBED_SCRIPT = "https://app.cal.com/embed/embed.js";

declare global {
  interface Window {
    Cal?: CalGlobal;
  }
}

type CalGlobal = {
  loaded?: boolean;
  ns: Record<string, CalNamespaceFn>;
  q?: unknown[];
  (command: string, ...args: unknown[]): void;
};

type CalNamespaceFn = {
  q?: unknown[];
  (command: string, ...args: unknown[]): void;
};

declare const Cal: CalGlobal;

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

/** Cal.com inline embed — official loader + your namespace config. */
function loadCalEmbed() {
  (function (C, A, L) {
    const p = function (a: { q?: unknown[] }, ar: unknown[]) {
      a.q = a.q || [];
      a.q.push(ar);
    };
    const d = C.document;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    C.Cal = C.Cal || function (this: any) {
      const cal = C.Cal;
      const ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () {
          p(api, arguments);
        };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else {
          p(cal, ar);
        }
        return;
      }
      p(cal, ar);
    };
  })(window, CAL_EMBED_SCRIPT, "init");

  Cal("init", "free-ai-demo-call", { origin: "https://app.cal.com" });

  Cal.ns["free-ai-demo-call"]("inline", {
    elementOrSelector: "#my-cal-inline-free-ai-demo-call",
    config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
    calLink: "eli-berner/free-ai-demo-call",
  });

  Cal.ns["free-ai-demo-call"]("ui", {
    hideEventTypeDetails: false,
    layout: "month_view",
  });
}

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

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 3v8M5 8l3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BookingSection() {
  const initialized = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      loadCalEmbed();
    }

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

  const scrollToCalendar = () => {
    document
      .getElementById("booking-calendar")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="book-demo"
      aria-labelledby="booking-heading"
      className="relative overflow-hidden bg-black py-24 text-white sm:py-32"
    >
      {/* Ambient glow */}
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
        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#3b82f6]">
            Free strategy call
          </p>
          <h2
            id="booking-heading"
            className="mt-3 text-balance font-display text-[clamp(2rem,5vw,3rem)] font-light leading-[1.12] tracking-[-0.02em] text-white"
          >
            Ready to see custom AI in action?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty font-sans text-base font-light leading-[1.65] text-[#888888] sm:text-[17px]">
            Book a demo and we&apos;ll show you how an AI receptionist answers
            every call, books appointments, and qualifies leads — 24/7, built for
            your business.
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

          <button
            type="button"
            onClick={scrollToCalendar}
            className="group mt-10 inline-flex items-center justify-center gap-2 rounded bg-[#2563eb] px-8 py-4 font-sans text-sm font-medium tracking-[0.06em] text-white shadow-[0_0_32px_rgba(37,99,235,0.15)] transition duration-200 hover:scale-[1.025] hover:bg-[#3b82f6] hover:shadow-[0_0_48px_rgba(37,99,235,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#3b82f6]"
          >
            Pick a time below
            <ArrowDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>
        </header>

        {/* Shimmer divider */}
        <div
          className="mx-auto mt-14 h-px w-full max-w-xs animate-divider-shimmer bg-gradient-to-r from-transparent via-[#1e1e1e] to-transparent sm:max-w-sm"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, #1e1e1e 20%, #2563eb 50%, #1e1e1e 80%, transparent)",
          }}
          aria-hidden
        />

        {/* Content grid */}
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

          {/* Calendar card */}
          <div
            id="booking-calendar"
            className="relative overflow-hidden rounded border border-[#1e1e1e] bg-[#0a0a0a] shadow-[0_0_0_1px_rgba(37,99,235,0.08),0_24px_48px_-12px_rgba(0,0,0,0.6)]"
          >
            <div
              className="pointer-events-none absolute inset-0 rounded bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(37,99,235,0.06),transparent)]"
              aria-hidden
            />
            <div className="relative flex items-center justify-between gap-4 border-b border-[#1e1e1e] px-5 py-4 sm:px-6">
              <div>
                <p className="font-sans text-sm font-medium text-white">
                  Select a time
                </p>
                <p className="mt-0.5 font-sans text-xs font-light text-[#888888]">
                  Local timezone · Free AI demo call
                </p>
              </div>
              <span className="hidden shrink-0 rounded border border-[#1e1e1e] bg-[#111111] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#3b82f6] sm:inline-block">
                Cal.com
              </span>
            </div>
            <div className="relative min-h-[520px] p-1 sm:min-h-[620px] sm:p-3">
              <div
                id="my-cal-inline-free-ai-demo-call"
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                className="min-h-[480px] w-full sm:min-h-[560px]"
              />
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
