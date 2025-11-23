import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ShowcaseClient from "@/components/showcase/ShowcaseClient";
import { prisma } from "@/lib/prisma";

export default async function ShowcasePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  // @ts-expect-error - session user id
  const userId = session.user.id;

  // Fetch user's projects
  const projects = await prisma.project.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      name: true,
    },
  });

  // Fetch user's API token
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { apiToken: true },
  });

  return <ShowcaseClient projects={projects} apiToken={user?.apiToken || ""} />;
}
