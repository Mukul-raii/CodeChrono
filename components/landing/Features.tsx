import { 
  LayoutDashboard, 
  Code2, 
  GitCommit, 
  BarChart3, 
  Shield, 
  Zap 
} from "lucide-react";

const features = [
  {
    title: "Project Breakdown",
    description: "See where your time actually goes. Which repo ate your week? Which feature took longer than expected?",
    icon: LayoutDashboard,
  },
  {
    title: "Language Usage",
    description: "Track how much time you spend in JS, TS, Python, Rust, Go, etc.",
    icon: Code2,
  },
  {
    title: "Commit Timeline",
    description: "Understand how your effort translates into commits, changes, and progress.",
    icon: GitCommit,
  },
  {
    title: "Daily & Weekly Trends",
    description: "Visualize your peaks, dips, and focused blocks. All automatically logged.",
    icon: BarChart3,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-card/50">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Stop Guessing Where Your Time Goes
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you’re building side-projects, freelancing, or shipping production code — understanding your workflow matters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative bg-card border border-border rounded-2xl p-8 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">Lightweight Extension</h4>
                      <p className="text-sm text-muted-foreground">Runs silently in background</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">Private By Design</h4>
                      <p className="text-sm text-muted-foreground">Your data stays in your workspace</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Powered by a Lightweight VS Code Extension</h3>
            <p className="text-lg text-muted-foreground mb-6">
              CodeChrono runs silently in the background:
            </p>
            <ul className="space-y-3">
              {["Tracks coding duration", "Detects active project", "Captures file events", "Sends logs securely"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
