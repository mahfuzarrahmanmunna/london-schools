// src/app/components/LayoutProvider/LayoutProvider.tsx

"use client";

import BrochureModal from "../components/BrochureModal/BrochureModal";
import ContactSection from "../components/CTASection/CTASection";
import Footer from "../components/Footer/Footer";
import LenisProvider from "../components/LenisProvider/LenisProvider";
// import Navbar from "../components/Navbar/Navbar";
import Navbar from "../components/Navbar/Navbar";
import { ModalProvider } from "../context/ModalContext";
import { NavbarThemeProvider } from "../context/NavbarThemeContext";


interface LayoutProviderProps {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProviderProps) {
  return (
    <LenisProvider>
      <NavbarThemeProvider>
        <ModalProvider>
          <Navbar />
          <BrochureModal />
          <main className="flex-1">{children}</main>
          <ContactSection />
          <Footer />
        </ModalProvider>
      </NavbarThemeProvider>
    </LenisProvider>
  );
}
