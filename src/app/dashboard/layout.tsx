import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg-primary)",
      }}
    >
      <Sidebar userEmail={user.email ?? ""} />
      <main
        style={{
          flex: 1,
          marginLeft: "240px",
          padding: "clamp(24px, 4vw, 48px)",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>

      <style>{`
        @media (max-width: 768px) {
          main { margin-left: 0 !important; padding-bottom: 80px !important; }
        }
      `}</style>
    </div>
  );
}
