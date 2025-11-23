"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function DashboardShowcase() {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const currentRef = imageRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className="-mt-40 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div
          ref={imageRef}
          className={`relative transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

          {/* Dashboard image container */}
          <div className="relative z-10">
            <div
              className={`rounded-2xl overflow-hidden shadow-2xl border border-border/50 transform transition-all duration-1000 ${
                isVisible ? "scale-100 rotate-0" : "scale-95 rotate-1"
              }`}
            >
              <div className="relative aspect-[16/10] bg-gradient-to-br from-background to-muted">
                <Image
                  src="/Hero.png"
                  alt="CodeChrono Dashboard - Track your coding time with beautiful analytics"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                />
              </div>
            </div>

            {/* Floating badge */}
            <div
              className={`absolute -top-6 -right-6 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg font-semibold transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              ✨ Real-time Analytics
            </div>

            {/* Bottom left badge */}
            <div
              className={`absolute -bottom-4 -left-6 bg-card border border-border px-6 py-3 rounded-full shadow-lg font-medium transition-all duration-700 delay-500 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              📊 Beautiful Insights
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
