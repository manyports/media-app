import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeWrapper from "@/components/themewrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Renter",
    description: "Your only REAL media source.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ThemeWrapper>
            {children}
        </ThemeWrapper>
        </body>
        </html>
    );
}
