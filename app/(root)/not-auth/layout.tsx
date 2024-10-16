import { PROJECT_NAME } from "@/shared/constants";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: `${PROJECT_NAME} | Доступ ограничен`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
