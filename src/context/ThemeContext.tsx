import React, { createContext, useContext, useState, useEffect, } from 'react';
import type { ReactNode } from 'react';

// Temanın 'light' veya 'dark' olabileceğini belirtiyoruz
type Theme = 'light' | 'dark';

// Context'in sağlayacağı değerlerin arayüzü
interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

// Context'i oluşturma
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Provider Bileşeni (Uygulamayı sarmalayacak)
interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light');

    // Tema değiştiğinde <html> etiketine data-theme özelliğini ekler/günceller
    useEffect(() => {
        const root = window.document.documentElement;
        root.setAttribute('data-theme', theme);
    }, [theme]);

    // Temayı değiştiren fonksiyon
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Kendi Hook'umuzu oluşturma (kullanımı kolaylaştırmak için)
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme, ThemeProvider içinde kullanılmalıdır');
    }
    return context;
};