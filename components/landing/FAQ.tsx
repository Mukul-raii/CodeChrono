"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does CodeChrono track my coding time?",
    answer:
      "CodeChrono uses a lightweight VS Code extension that runs silently in the background. It tracks when you're actively coding by monitoring file changes, cursor activity, and editor focus. All data is securely synced to your dashboard in real-time.",
  },
  {
    question: "Is my code and data private?",
    answer:
      "Absolutely. CodeChrono only tracks metadata like project names, file types, and time spent. We never access, store, or transmit your actual source code. Your coding data stays private and is encrypted both in transit and at rest.",
  },
  {
    question: "Does it slow down my VS Code?",
    answer:
      "Not at all. The extension is designed to be extremely lightweight with minimal resource usage. It runs asynchronously and won't impact your editor's performance or responsiveness, even during intensive coding sessions.",
  },
  {
    question: "Can I track multiple projects?",
    answer:
      "Yes! CodeChrono automatically detects which project you're working on based on your workspace. You can track unlimited projects, switch between them seamlessly, and view detailed breakdowns for each one in your dashboard.",
  },
  {
    question: "What programming languages are supported?",
    answer:
      "CodeChrono works with all programming languages supported by VS Code. It automatically detects the language you're coding in and provides detailed breakdowns showing time spent in TypeScript, JavaScript, Python, Go, Rust, and many more.",
  },
  {
    question: "How do the embeddable showcase cards work?",
    answer:
      "You get a simple HTML/JavaScript snippet that you can embed anywhere—GitHub README, personal website, or blog. The card displays live stats from your projects and updates automatically. Choose from 20+ beautiful themes to match your style.",
  },
  {
    question: "Is there a free tier?",
    answer:
      "Yes! CodeChrono offers a generous free tier with core tracking features, basic analytics, and access to showcase themes. Premium features like advanced analytics, team dashboards, and priority support are available on paid plans.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Absolutely. You own your data. Export your coding stats anytime in JSON or CSV format. Use it for your own analysis, create custom reports, or back it up for your records.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-muted/30">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-medium">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about CodeChrono
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/50"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-muted/50"
              >
                <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 pt-2">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a
            href="mailto:support@codechrono.dev"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Contact our support team
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
