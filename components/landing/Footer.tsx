import Link from "next/link";
import { Code } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl mb-4"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground">Miss-Minutes</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              A developer-first activity tracker that logs every file, every
              project, every commit — with zero effort.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="/api/auth/signin"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Miss-Minutes. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <span className="text-red-500">❤️</span> by Developers
          </p>
        </div>
      </div>
    </footer>
  );
}
