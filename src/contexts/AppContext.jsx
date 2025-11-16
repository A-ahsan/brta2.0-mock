import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const ThemeContext = createContext();
const LanguageContext = createContext();
const DownloadContext = createContext();

export const useTheme = () => useContext(ThemeContext);
export const useLanguage = () => useContext(LanguageContext);
export const useDownload = () => useContext(DownloadContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => setIsDark(prev => !prev), []);

  const themeValue = useMemo(() => ({ isDark, toggleTheme }), [isDark, toggleTheme]);

  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });
  const toggleLanguage = useCallback(() => {
    setLanguage(prev => {
      const newLang = prev === 'en' ? 'bn' : 'en';
      localStorage.setItem('language', newLang);
      return newLang;
    });
  }, []);

  const languageValue = useMemo(() => ({ language, toggleLanguage }), [language, toggleLanguage]);

  return (
    <LanguageContext.Provider value={languageValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const DownloadProvider = ({ children }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  useEffect(() => {
    if (isDownloading) {
      document.body.classList.add('downloading');
    } else {
      document.body.classList.remove('downloading');
    }
  }, [isDownloading]);
  
  const startDownload = useCallback(() => setIsDownloading(true), []);
  const endDownload = useCallback(() => setIsDownloading(false), []);

  const downloadValue = useMemo(() => ({ isDownloading, startDownload, endDownload }), [isDownloading]);

  return (
    <DownloadContext.Provider value={downloadValue}>
      {children}
    </DownloadContext.Provider>
  );
};
