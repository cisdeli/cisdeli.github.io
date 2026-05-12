import '@/app/ui/styles/global.css';
import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-display",
    weight: ["300", "400", "500", "600", "700", "800"],
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-body",
    weight: ["300", "400", "500"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Pedro Cisdeli",
    description: "Software Developer & ML Engineer — Pedro Cisdeli",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${outfit.variable} ${inter.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
