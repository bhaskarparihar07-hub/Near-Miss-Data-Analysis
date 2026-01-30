import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Near Miss Dashboard | Construction Safety Analytics',
    description: 'Interactive dashboard for analyzing near-miss incident data from construction sites. Track trends, identify risks, and improve safety measures.',
    keywords: ['near miss', 'construction safety', 'incident analysis', 'dashboard', 'safety analytics'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
