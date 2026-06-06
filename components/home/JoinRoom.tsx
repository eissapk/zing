"use client";

import ServerWakeDialog from "@/components/ServerWakeDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRoomNavigation } from "@/hooks/use-room-navigation";
import { cn } from "@/lib/utils";
import { ArrowRight, Hash } from "lucide-react";
import { useState } from "react";

function JoinRoom() {
	const { goToRoom, waking, failed, retry } = useRoomNavigation();
	const [code, setCode] = useState("");

	const extractRoomId = (input: string) => {
		const trimmed = input.trim();
		const match = trimmed.match(/\/room\/([a-zA-Z0-9]+)/);
		return match ? match[1] : trimmed;
	};

	const handleJoin = () => {
		const roomId = extractRoomId(code);
		if (!roomId) return;
		goToRoom(roomId);
	};

	return (
		<>
			<ServerWakeDialog open={waking || failed} failed={failed} onRetry={retry} />
			<div className="w-full p-6 rounded-2xl glass">
			<div className="flex items-start gap-4 mb-4">
				<div className="size-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shrink-0">
					<Hash className="size-6 text-white" />
				</div>
				<div>
					<h3 className="text-lg font-semibold mb-1">Join a room</h3>
					<p className="text-sm text-muted-foreground leading-relaxed">Enter a room code or paste an invite link</p>
				</div>
			</div>

			<div className="flex gap-2">
				<Input
					type="text"
					placeholder="Room code or link"
					className="h-11 bg-foreground/5 border-border font-mono text-sm"
					onChange={(e) => setCode(e.target.value)}
					value={code}
					onKeyDown={(e) => e.key === "Enter" && handleJoin()}
				/>
				<Button
					onClick={handleJoin}
					disabled={!code.trim()}
					className={cn(
						"h-11 px-4 shrink-0 transition-all",
						code.trim()
							? "bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white border-0"
							: "bg-muted text-muted-foreground border border-border hover:bg-muted"
					)}>
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</div>
		</>
	);
}

export default JoinRoom;
