import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const dmSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-dm-sans",
	weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains",
	weight: ["400", "500"],
});

export const metadata: Metadata = {
	title: "Zing | Secure, Anonymous Chat",
	description: "Private, encrypted conversations without revealing your identity.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${dmSans.variable} ${jetbrains.variable} antialiased`}>
				<Script id="zing-theme-init" strategy="beforeInteractive">
					{`(function(){try{var s=localStorage.getItem('zing-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s==='light'||s==='dark'?s:(d?'dark':'light');document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}})();`}
				</Script>
				<ThemeProvider>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
