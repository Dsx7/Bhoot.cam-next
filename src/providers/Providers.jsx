"use client";

import { AuthProvider } from '@/context/AuthProvider'; // Adjust path if needed
import { ThemeProvider } from '@/providers/ThemeProvider'; // Adjust path if needed

export function Providers({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}