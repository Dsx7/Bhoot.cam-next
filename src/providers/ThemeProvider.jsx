"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

// 1. Give createContext a default value so it never returns undefined
const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => {} 
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 2. Access localStorage only on the client side
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // 3. REMOVED the "if (!mounted) return..." line that was causing the crash.
  // We now render the Provider immediately.

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* 4. We hide the content briefly until theme is ready to prevent "flash of white mode" */}
      <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);