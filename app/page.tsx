import Link from "next/link";
import { Button } from "@/components/ui/button";

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
			{/* Content Container */}
			<div className="max-w-2xl w-full text-center space-y-8 z-10">
				{/* Logo/Brand */}
				<div className="space-y-2">
					<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
						Flow𝕏
					</h1>
					<p className="text-lg text-muted-foreground">
						Understand your 𝕏 audience like never before
					</p>
				</div>

				{/* Value Proposition */}
				<div className="space-y-3 pt-2 pb-1">
					<p className="text-md text-foreground/90 leading-relaxed text-balance">
						Flow𝕏 helps you discover deep insights about your
						followers and the people you follow. Analyze engagement
						patterns, identify key influencers, and understand your
						audience better.
					</p>

					<div className="grid grid-cols-3 gap-4 py-6 text-sm">
						<div className="space-y-1">
							<p className="font-semibold text-lg">Followers</p>
							<p className="text-muted-foreground">
								Retrieve & analyze
							</p>
						</div>
						<div className="space-y-1">
							<p className="font-semibold text-lg">Insights</p>
							<p className="text-muted-foreground">
								Deep analytics
							</p>
						</div>
						<div className="space-y-1">
							<p className="font-semibold text-lg">Growth</p>
							<p className="text-muted-foreground">
								Optimize reach
							</p>
						</div>
					</div>
				</div>

				{/* CTA Button */}
				<div>
					<Link href="/auth">
						<Button size="lg">Sign in with 𝕏</Button>
					</Link>
					{/* Footer Text */}
					<p className="text-sm text-muted-foreground pt-3">
						Secure authentication via 𝕏.
						<br />
						No spam. No data selling.
					</p>
				</div>
			</div>
		</main>
	);
}
