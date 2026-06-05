import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Hash, Home } from "lucide-react";
import Link from "next/link";

export default function RoomNotFound() {
	return (
		<main className="relative min-h-screen flex flex-col items-center justify-center px-6 mesh-bg">
			<div className="absolute top-4 right-4">
				<ThemeToggle />
			</div>
			<div className="text-center animate-slide-up">
				<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 mb-6">
					<Hash className="size-8 text-muted-foreground" />
				</div>
				<p className="text-sm font-mono text-violet-400 mb-2">404</p>
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">Room doesn&apos;t exist</h1>
				<p className="text-muted-foreground max-w-sm mx-auto">This room may have expired or the link is incorrect.</p>
				<Button asChild className="mt-8 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 border-0">
					<Link href="/">
						<Home className="size-4 mr-2" />
						Create a new room
					</Link>
				</Button>
			</div>
		</main>
	);
}
