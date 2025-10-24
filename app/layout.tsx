import type React from "react";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./providers";

const geist = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Flow𝕏 - My 𝕏 Follower Insights",
	description:
		"Analyze my 𝕏 followers, compare influence, and understand engagement patterns — all in one place.",
	keywords: [
		"X",
		"Twitter",
		"analytics",
		"followers",
		"influence",
		"personal insights",
	],
	authors: [{ name: "Satyam Vyas" }],
	openGraph: {
		title: "Flow𝕏 - My 𝕏 Follower Insights",
		description:
			"Flow𝕏 helps me understand my followers on 𝕏 — who engages, who influences, and who matters most.",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<QueryClientProvider client={queryClient}>
			<html lang="en">
				<body className={`font-sans antialiased ${geist.className}`}>
					{children}
				</body>
			</html>
		</QueryClientProvider>
	);
}
