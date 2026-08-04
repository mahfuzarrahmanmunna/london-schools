// src/app/context/NavbarThemeContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

interface NavbarThemeContextType {
  isAboutDark: boolean;
  setIsAboutDark: (isDark: boolean) => void;
}

const NavbarThemeContext = createContext<NavbarThemeContextType | undefined>(
  undefined,
);

export function NavbarThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAboutDark, setIsAboutDark] = useState(false);

  return (
    <NavbarThemeContext.Provider value={{ isAboutDark, setIsAboutDark }}>
      {children}
    </NavbarThemeContext.Provider>
  );
}

export function useNavbarTheme() {
  const context = useContext(NavbarThemeContext);
  if (!context) {
    throw new Error("useNavbarTheme must be used within a NavbarThemeProvider");
  }
  return context;
}
