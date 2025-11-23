import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-base-100 text-base-content">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <span className="text-primary">
            CodeChrono
          </span>
        </h1>

        <p className="mt-3 text-2xl opacity-80">
          Track your coding activity effortlessly.
        </p>

        <div className="mt-8">
          <Link
            href="/api/auth/signin"
            className="btn btn-primary btn-lg text-white"
          >
            Get Started
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h3 className="card-title justify-center text-xl font-bold mb-2">
                Real-time Tracking
              </h3>
              <p className="opacity-70">
                Automatically track your coding time directly from VS Code.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h3 className="card-title justify-center text-xl font-bold mb-2">
                Detailed Insights
              </h3>
              <p className="opacity-70">
                Visualize your productivity with charts and detailed reports.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h3 className="card-title justify-center text-xl font-bold mb-2">
                Offline Support
              </h3>
              <p className="opacity-70">
                Keep tracking even when you&apos;re offline. Data syncs
                automatically.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
