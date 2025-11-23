import { Terminal, UserPlus, BarChart } from "lucide-react";

const steps = [
  {
    title: "Install Extension",
    description: "Get the CodeChrono extension from the VS Code Marketplace.",
    icon: Terminal,
  },
  {
    title: "Start Coding",
    description: "Just code. We handle the tracking automatically.",
    icon: Code2,
  },
  {
    title: "View Insights",
    description: "Visit your dashboard to see your coding journey visualized.",
    icon: BarChart,
  },
];

import { Code2 } from "lucide-react";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Get started in minutes. No complex setup required.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0"></div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-muted p-6 rounded-xl border border-border text-center group hover:border-primary/50 transition-colors"
              >
                <div className="w-16 h-16 mx-auto bg-card rounded-full border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
