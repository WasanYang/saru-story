'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

// Define the shape of the dictionary
type Dictionary = { [key: string]: any };

interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  dictionary: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define available locales and a function to get the dictionary
const dictionaries: { [key: string]: () => Promise<Dictionary> } = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  th: () => import('@/dictionaries/th.json').then((module) => module.default),
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('th'); // Default to Thai
  const [dictionary, setDictionary] = useState({});

  useEffect(() => {
    async function loadDictionary() {
      const getDict = dictionaries[locale];
      if (getDict) {
        const dict = await getDict();
        setDictionary(dict);
      }
    }
    loadDictionary();
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale,
    dictionary,
  }), [locale, dictionary]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
