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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 dark:bg-gray-900">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
          Welcome to{" "}
          <span className="text-blue-600" style={{ fontWeight: "bold" }}>
            CodeChrono
          </span>
        </h1>

        <p className="mt-3 text-2xl text-gray-600 dark:text-gray-300">
          Track your coding activity effortlessly.
        </p>

        <div className="mt-8">
          <Link
            href="/api/auth/signin"
            className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2 dark:text-white">
              Real-time Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Automatically track your coding time directly from VS Code.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2 dark:text-white">
              Detailed Insights
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Visualize your productivity with charts and detailed reports.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2 dark:text-white">
              Offline Support
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Keep tracking even when you&apos;re offline. Data syncs
              automatically.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
