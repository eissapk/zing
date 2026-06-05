"use client";

import { randomKey } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewRoom() {
	const router = useRouter();

	return (
		<button
			onClick={() => router.push(`/room/${randomKey()}`)}
			className="group relative w-full p-6 rounded-2xl glass hover:glass-strong transition-all duration-300 text-left hover:glow-violet">
			<div className="flex items-start gap-4">
				<div className="size-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
					<Plus className="size-6 text-white" />
				</div>
				<div>
					<h3 className="text-lg font-semibold mb-1">Create a room</h3>
					<p className="text-sm text-muted-foreground leading-relaxed">
						Start a new private chat and invite others with a link
					</p>
				</div>
			</div>
		</button>
	);
}
