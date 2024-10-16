import prisma from "@/prisma/prisma-client";
import { Header } from "@/shared/components";
import { PROJECT_NAME } from "@/shared/constants";
import type { Metadata } from "next";
import React, { ReactNode, Suspense } from "react";

export async function generateMetadata({ params: { id } }: { params: { id: string } }): Promise<Metadata> {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
  });

  if (!product) {
    return { title: `${PROJECT_NAME}` };
  }

  return {
    title: `${PROJECT_NAME} | ${product.name}`,
  };
}

export default function ProductLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="min-h-screen px-4">
      <Suspense>
        <Header hasCart />
      </Suspense>
      {children}
    </main>
  );
}
