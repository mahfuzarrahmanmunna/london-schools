// src/app/components/LayoutProvider/LayoutProvider.tsx

"use client";

import Footer from "../components/Footer/Footer";
import LenisProvider from "../components/LenisProvider/LenisProvider";
import Navbar from "../components/Navbar/Navbar";


interface LayoutProviderProps {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProviderProps) {
  return (
    <LenisProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </LenisProvider>
  );
}
