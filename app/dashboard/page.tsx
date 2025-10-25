import { Button } from "@/components/ui/button";
import * as Twitter from "@/lib/twitter";
import FollowersSnapshot from "./followers-snapshot";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background relative text-foreground flex flex-col justify-center px-4">
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
      <div className="space-y-6 text-center max-w-2xl mx-auto z-10">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor follower cohorts, surface the voices that keep your threads
          performing, and see who truly drives your 𝕏 presence.
        </p>
        <p className="text-sm text-foreground/80">
          We are prepping advanced comparisons, influencer scoring, and reach
          forecasting. Stay tuned as the insights roll out.
        </p>
        <FollowersSnapshot />
        <form action={Twitter.logout}>
          <Button size="lg" type="submit">
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
}
