"use client";

import React, { useContext } from 'react';
import { ThemeProvider, ThemeContext } from "@/context/themecontext";
import Header from "./header";
import Footer from "./footer";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <ThemedContent>
                {children}
            </ThemedContent>
        </ThemeProvider>
    );
}

function ThemedContent({ children }: { children: React.ReactNode }) {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("ThemedContent must be used within a ThemeProvider");
    }

    const { theme } = themeContext;

    return (
        <body className={theme === 'dark' ? 'dark-mode' : ''}>
            <Header />
            {children}
            <Footer />
        </body>
    );
}