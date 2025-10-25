import type React from "react";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./providers";

const geist = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flow𝕏 - See Who Truly Drives Your 𝕏 Presence",
  description:
    "Flow𝕏 reveals which of your 𝕏 followers drive reach, engagement, and influence so you can grow smarter.",
  keywords: [
    "X analytics",
    "Twitter analytics",
    "follower insights",
    "audience intelligence",
    "social media influence",
    "engagement analysis",
  ],
  authors: [{ name: "Satyam Vyas" }],
  openGraph: {
    title: "Flow𝕏 - See Who Truly Drives Your 𝕏 Presence",
    description:
      "Flow𝕏 identifies the 𝕏 (Twitter) followers who amplify your reach, sustain engagement, and shape your influence.",
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
