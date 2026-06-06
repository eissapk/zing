"use client";

import ServerWakeDialog from "@/components/ServerWakeDialog";
import { useRoomNavigation } from "@/hooks/use-room-navigation";
import { randomKey } from "@/lib/utils";
import { Plus } from "lucide-react";

export default function NewRoom() {
	const { goToRoom, waking, failed, retry } = useRoomNavigation();

	return (
		<>
			<ServerWakeDialog open={waking || failed} failed={failed} onRetry={retry} />
			<button
				onClick={() => goToRoom(randomKey())}
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
		</>
	);
}
