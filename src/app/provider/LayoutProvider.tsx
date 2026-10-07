// src/app/components/LayoutProvider/LayoutProvider.tsx

"use client";

import { usePathname } from "next/navigation";
import BrochureModal from "../components/BrochureModal/BrochureModal";
import ContactSection from "../components/CTASection/CTASection";
import Footer from "../components/Footer/Footer";
import LenisProvider from "../components/LenisProvider/LenisProvider";
import Navbar from "../components/Navbar/Navbar";
import { ModalProvider } from "../context/ModalContext";
import { NavbarThemeProvider } from "../context/NavbarThemeContext";

interface LayoutProviderProps {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProviderProps) {
  const pathname = usePathname();
  
  // Check if the current route starts with "/dashboard"
  // Using startsWith ensures that nested routes like /dashboard/leads are also covered
  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <LenisProvider>
      <NavbarThemeProvider>
        <ModalProvider>
          {/* Conditionally render Navbar and BrochureModal */}
          {!isDashboardRoute && (
            <>
              <Navbar />
              <BrochureModal />
            </>
          )}

          <main className="flex-1">{children}</main>

          {/* Conditionally render ContactSection and Footer */}
          {!isDashboardRoute && (
            <>
              <ContactSection />
              <Footer />
            </>
          )}
        </ModalProvider>
      </NavbarThemeProvider>
    </LenisProvider>
  );
}