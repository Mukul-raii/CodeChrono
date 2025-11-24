import { FloatingNavbar } from "@/components/landing/FloatingNavbar";
import { Hero } from "@/components/landing/Hero";
import { DashboardShowcase } from "@/components/landing/DashboardShowcase";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ThemeShowcase } from "@/components/landing/ThemeShowcase";
import { FAQ } from "@/components/landing/FAQ";
import { SupportUs } from "@/components/landing/SupportUs";
import { Footer } from "@/components/landing/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/20">
      <FloatingNavbar />
      <main>
        <Hero />
        <DashboardShowcase />
        <Features />
        <ThemeShowcase />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
      <SupportUs />
    </div>
  );
}
