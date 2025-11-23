import SidebarWrapper from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <SidebarWrapper
      userName={session?.user?.name || undefined}
      userEmail={session?.user?.email || undefined}
    >
      {children}
    </SidebarWrapper>
  );
}
