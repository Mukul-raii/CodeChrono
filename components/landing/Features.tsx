import {
  LayoutDashboard,
  Code2,
  GitCommit,
  BarChart3,
  Shield,
  Zap,
  Clock,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    title: "Project Breakdown",
    description:
      "See where your time actually goes. Track which repos and features consume your coding hours.",
    icon: LayoutDashboard,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Language Insights",
    description:
      "Monitor time spent in JavaScript, TypeScript, Python, and more with detailed breakdowns.",
    icon: Code2,
    gradient: "from-gray-500 to-pink-500",
  },
  {
    title: "Commit Timeline",
    description:
      "Visualize how your effort translates into commits and track your development progress.",
    icon: GitCommit,
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Smart Analytics",
    description:
      "Discover your productivity patterns with daily and weekly trends, automatically logged.",
    icon: BarChart3,
    gradient: "from-green-500 to-emerald-500",
  },
];

const highlights = [
  {
    icon: Zap,
    title: "Lightweight",
    description: "Minimal resource usage",
    color: "text-yellow-600 bg-yellow-50",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Data stays in your control",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: Clock,
    title: "Real-Time",
    description: "Live tracking as you code",
    color: "text-purple-600 bg-purple-50",
  },
  {
    icon: TrendingUp,
    title: "Growth Focused",
    description: "Improve with insights",
    color: "text-green-600 bg-green-50",
  },
];

export function Features() {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm font-medium">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Stop Guessing Where Your Time Goes
          </h2>
          <p className="text-xl text-muted-foreground">
            Whether you&apos;re building side-projects, freelancing, or shipping
            production code — understanding your workflow helps you grow.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl border border-border p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Icon with gradient background */}
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Highlights Section */}
        <div className="bg-gradient-to-br from-card to-card/50 rounded-3xl border border-border p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-3 text-foreground">
              Built for Developers
            </h3>
            <p className="text-lg text-muted-foreground">
              A VS Code extension designed with your workflow in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl ${highlight.color} flex items-center justify-center mb-4`}
                >
                  <highlight.icon className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-foreground mb-2">
                  {highlight.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
