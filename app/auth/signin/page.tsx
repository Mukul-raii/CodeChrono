"use client";

import { signIn } from "next-auth/react";
import { Github, Code, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      {/* Left Side - Image */}
      <div className="relative hidden lg:flex flex-col items-center justify-center bg-muted p-12 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 w-full max-w-[500px] aspect-square">
          <Image
            src="/marvel-miss-minutes-pack.png"
            alt="Miss-Minutes Tracking"
            fill
            className="object-cover scale-x-[-1] drop-shadow-2xl duration-500 object-right "
            priority
          />
        </div>

        <div className="relative z-10 mt-8 text-center max-w-md">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Track time, not distractions.
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of developers who trust Miss-Minutes for their
            productivity insights.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-background to-secondary/20 relative">
        <div className="absolute top-8 left-8 lg:hidden">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        <div className="absolute top-8 right-8 hidden lg:block">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:scale-110 transition-transform">
                <Code className="w-8 h-8 text-primary" />
              </div>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
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
      </div>
    </div>
  );
}
