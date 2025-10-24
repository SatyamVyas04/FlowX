import type React from "react";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Flow𝕏 - Understand Your 𝕏 Audience",
	description:
		"Discover deep insights about your followers and the people you follow on 𝕏. Analyze engagement patterns and optimize your reach.",
	keywords: [
		"X",
		"Twitter",
		"analytics",
		"followers",
		"insights",
		"social media",
	],
	authors: [{ name: "Flow𝕏" }],
	openGraph: {
		title: "Flow𝕏 - Understand Your 𝕏 Audience",
		description:
			"Discover deep insights about your followers and the people you follow on 𝕏.",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`font-sans antialiased ${geist.className}`}>
				{children}
			</body>
		</html>
	);
}
