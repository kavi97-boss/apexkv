import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });
const GOOGLE_ANALYTIC_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTIC_ID;

export const metadata: Metadata = {
	title: 'Kavindu Harshitha - Full Stack Developer(ApexKV)',
	description: 'Portfolio of Kavindu Harshitha, a Full Stack Developer specializing in Python, JavaScript, React, and Django.',
	icons: '/logo.ico',
	keywords: 'Kavindu Harshitha, Full Stack Developer, Python, JavaScript, Django, React, Freelancing, Portfolio',
	robots: 'index, follow',
	openGraph: {
		title: 'Kavindu Harshitha - Full Stack Developer(ApexKV)',
		description: 'Portfolio of Kavindu Harshitha, a Full Stack Developer specializing in Python, JavaScript, React, and Django.',
		url: 'https://apexkv.com',
		type: 'website',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</body>
			<GoogleAnalytics gaId={GOOGLE_ANALYTIC_ID!} />
		</html>
	);
}
