import { Header } from "@/shared/components";
import { PROJECT_NAME } from "@/shared/constants";
import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";

export const metadata: Metadata = {
  title: `${PROJECT_NAME} | Главная`,
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <main className="min-h-screen px-4">
      <Suspense>
        <Header />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
