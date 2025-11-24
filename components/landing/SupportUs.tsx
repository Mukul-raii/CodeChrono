"use client";

import { useState } from "react";
import { Heart, X, Coffee } from "lucide-react";
import Image from "next/image";

export function SupportUs() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Card */}
      <div
        className={`absolute bottom-20 right-0 bg-card border border-border rounded-2xl shadow-2xl transition-all duration-300 origin-bottom-right ${
          isExpanded
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-75 pointer-events-none"
        }`}
        style={{ width: "320px" }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Support Us</h3>
                <p className="text-xs text-muted-foreground">
                  Buy us a coffee ☕
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-muted-foreground hover:text-foreground transition-colors rounded-full p-1 hover:bg-muted"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* QR Code */}
          <div className="bg-white p-4 rounded-xl border border-border mb-4">
            <div className="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg flex items-center justify-center">
              {/* Placeholder QR Code - Replace with actual QR code image */}
              <div className="text-center">
                <Coffee className="w-16 h-16 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">QR Code</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">
                  Scan to support
                </p>
              </div>
              {/* Uncomment when you have a QR code image */}
              <Image
                src="/qr-code-support.png"
                alt="Support QR Code"
                fill
                className="object-cover p-2"
              />
            </div>
          </div>

          {/* Message */}
          <p className="text-sm text-muted-foreground text-center mb-4">
            Your support helps us keep CodeChrono free and continuously
            improving! 💖
          </p>

          {/* Alternative Support Methods */}
          <div className="space-y-2">
            <a
              href="https://github.com/sponsors"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2.5 bg-muted hover:bg-muted/80 rounded-lg text-center text-sm font-medium transition-colors"
            >
              GitHub Sponsors
            </a>
            <a
              href="https://buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg text-center text-sm font-medium transition-all shadow-lg shadow-orange-500/20"
            >
              ☕ Buy Me a Coffee
            </a>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`group relative w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-red-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
          isExpanded ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-label="Support us"
      >
        <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />

        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-20"></span>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Support Us 💖
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-4 border-transparent border-l-gray-900"></div>
        </div>
      </button>
    </div>
  );
}
