"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	IconUsersGroup,
	IconChartArea,
	IconTrendingUp3,
} from "@tabler/icons-react";

export default function Home() {
	return (
		<main className="min-h-screen bg-background relative text-foreground flex flex-col items-center justify-center px-4">
			<div
				className="absolute inset-0 z-0"
				style={{
					backgroundImage: `
						linear-gradient(to right, #d1d5db 1px, transparent 1px),
						linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
					`,
					backgroundSize: "64px 64px",
					WebkitMaskImage:
						"radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 60%)",
					maskImage:
						"radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 60%)",
				}}
			/>
			<div
				className="absolute inset-0 z-0"
				style={{
					backgroundImage: `
						linear-gradient(to right, #d1d5db 1px, transparent 1px),
						linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
					`,
					backgroundSize: "64px 64px",
					WebkitMaskImage:
						"radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 60%)",
					maskImage:
						"radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 60%)",
				}}
			/>

			<div className="max-w-2xl w-full text-center space-y-8 z-10">
				{/* Brand */}
				<div className="space-y-2">
					<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
						Flow𝕏
					</h1>
					<p className="text-lg text-muted-foreground">
						Understand your 𝕏 followers.
					</p>
				</div>

				<div className="space-y-3 pt-2 pb-1">
					<p className="text-md text-foreground/90 leading-relaxed text-balance">
						Flow𝕏 connects to your 𝕏 account, fetches your
						followers, and helps you compare who holds more
						influence — engagement, reach, and impact.
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 text-sm">
						<div className="flex flex-col items-center space-y-2">
							<IconUsersGroup className="h-6 w-6 text-primary" />
							<p className="font-semibold text-lg">Followers</p>
							<p className="text-muted-foreground text-center">
								Fetch and analyze your network
							</p>
						</div>
						<div className="flex flex-col items-center space-y-2">
							<IconChartArea className="h-6 w-6 text-primary" />
							<p className="font-semibold text-lg">Stats</p>
							<p className="text-muted-foreground text-center">
								Compare engagement metrics
							</p>
						</div>
						<div className="flex flex-col items-center space-y-2">
							<IconTrendingUp3 className="h-6 w-6 text-primary" />
							<p className="font-semibold text-lg">Influence</p>
							<p className="text-muted-foreground text-center">
								Identify top followers
							</p>
						</div>
					</div>
				</div>

				<div>
					<Link href="/auth">
						<Button size="lg">Sign in with 𝕏</Button>
					</Link>
					<p className="text-sm text-muted-foreground pt-3">
						Private. Personal. Only your data.
					</p>
				</div>
			</div>
		</main>
	);
}
