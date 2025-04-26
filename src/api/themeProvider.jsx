// src/api/ThemeProvider.jsx
import { useState, useEffect } from 'react';
import { ThemeContext } from './themeContext';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  // Un singur useEffect care face toate operațiunile necesare
  useEffect(() => {
    // Setăm atributul data-theme
    document.documentElement.setAttribute('data-theme', theme);
    
    // Salvăm în localStorage
    localStorage.setItem('theme', theme);
    
    // Configurăm tranzițiile
    document.body.style.transition = 'background-color 0.3s, color 0.3s';
    
    // Cleanup function (opțional)
    return () => {
      document.body.style.transition = '';
    };
  }, [theme]); // Acum avem theme ca dependință

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
