import '@/app/ui/styles/global.css';
import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";

const kumbh_sans = Kumbh_Sans({ subsets: ["latin"] });
export const metadata: Metadata = {
    title: "Personal Portfolio",
    description: "My personal porfifolio with Next.js on GitHub Pages",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${kumbh_sans.className} antialiased`}>{children}</body>
        </html>
    );
}
