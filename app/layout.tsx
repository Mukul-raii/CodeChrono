import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/providers";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Miss-Minutes - Track Your Coding Time",
    template: "%s | Miss-Minutes",
  },
  description:
    "Professional coding time tracker with analytics and insights. Track your coding activity, monitor projects, and visualize your productivity with beautiful dashboards.",
  keywords: [
    "coding time tracker",
    "developer productivity",
    "time tracking",
    "code analytics",
    "programming metrics",
    "vscode extension",
    "developer tools",
  ],
  authors: [
    {
      name: "Miss-Minutes",
      url: "https://Miss-Minutes.mukulrai.me",
    },
  ],
  creator: "Miss-Minutes",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://Miss-Minutes.mukulrai.me",
    title: "Miss-Minutes - Track Your Coding Time",
    description:
      "Professional coding time tracker with analytics and insights. Track your coding activity, monitor projects, and visualize your productivity.",
    siteName: "Miss-Minutes",
    images: [
      {
        url: "/ogImage.png",
        width: 1200,
        height: 630,
        alt: "Miss-Minutes - Coding Time Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miss-Minutes - Track Your Coding Time",
    description:
      "Professional coding time tracker with analytics and insights. Track your coding activity and visualize your productivity.",
    images: ["/ogImage.png"],
    creator: "@Miss-Minutes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
