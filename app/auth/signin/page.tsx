"use client";

import { signIn } from "next-auth/react";
import { Github, Code, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-md p-8 space-y-8 bg-card border border-border rounded-2xl shadow-xl relative z-10">
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/" className="flex items-center gap-2 mb-4 group">
            <div className="p-3 rounded-xl bg-primary/10 group-hover:scale-110 transition-transform">
              <Code className="w-8 h-8 text-primary" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue tracking your coding journey.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#24292F] text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-sm"
          >
            <Github className="w-5 h-5" />
            Sign in with GitHub
          </button>
        </div>

        <div className="pt-6 text-center text-sm text-muted-foreground">
          <p>
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
