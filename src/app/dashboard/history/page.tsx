import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import HistoryClient from "./HistoryClient";

export default async function HistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const pages = await prisma.generatedPage.findMany({
    where: { user_id: user.id },
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      title: true,
      created_at: true,
      input_data: true,
    },
  });

  return <HistoryClient pages={pages} />;
}
