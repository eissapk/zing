import Header from "@/components/home/Header";
import JoinRoom from "@/components/home/JoinRoom";
import NewRoom from "@/components/home/NewRoom";
import ThemeToggle from "@/components/ThemeToggle";
import type { Metadata } from "next";

export default function Home() {
	return (
		<main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 mesh-bg">
			<div className="absolute top-4 right-4 z-20">
				<ThemeToggle />
			</div>
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/4 size-96 rounded-full bg-violet-500/10 blur-3xl animate-pulse-glow" />
				<div className="absolute bottom-1/4 right-1/4 size-80 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
			</div>

			<div className="relative z-10 w-full max-w-md">
				<Header />
				<div className="flex flex-col gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
					<NewRoom />
					<JoinRoom />
				</div>
				<p className="text-center text-xs text-muted-foreground/60 mt-8">
					Messages are not stored. Rooms disappear when everyone leaves.
				</p>
			</div>
		</main>
	);
}

export const metadata: Metadata = {
	title: "Zing | Secure, Anonymous Chat",
	description: "Private, encrypted conversations without revealing your identity.",
};
