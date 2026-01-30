// app/(commonLayout)/layout.tsx
import NavbarServer from "@/components/shared/home/NavbarServer";
import Footer from "@/components/shared/home/Footer";
import React from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarServer />
      <main className="grow">
        {children}
      </main>
      <Footer />
    </>
  );
}