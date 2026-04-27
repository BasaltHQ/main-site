"use client";

import * as React from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // next-themes removed to fix React 19 script injection error
  // Site is forced to dark mode natively via layout.tsx
  return <>{children}</>;
}
