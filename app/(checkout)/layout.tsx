import { Container, Header } from "@/shared/components";
import { PROJECT_NAME } from "@/shared/constants";
import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";

export const metadata: Metadata = {
  title: `${PROJECT_NAME} | Корзина`,
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[#F4F1EE] px-4">
      <Container>
        <Suspense>
          <Header
            hasSearch={false}
            className="border-b-gray-200"
          />
        </Suspense>
        {children}
      </Container>
    </main>
  );
}
