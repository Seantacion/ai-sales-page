import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PreviewClient from "./PreviewClient";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const page = await prisma.generatedPage.findUnique({
    where: { id },
  });

  if (!page) notFound();

  return <PreviewClient page={page} />;
}
