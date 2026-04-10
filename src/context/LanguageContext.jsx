import { createContext, useContext, useState } from 'react';
import { en } from '../locales/en';
import { bn } from '../locales/bn';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en');

    const t = language === 'en' ? en : bn;

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));
    };

    // Update html lang attribute
    if (typeof document !== 'undefined') {
        document.documentElement.lang = language;
    }

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
