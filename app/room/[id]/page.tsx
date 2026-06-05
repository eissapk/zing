"use client";

import ChatForm from "@/components/chat/Form";
import MyMsg from "@/components/chat/MyMsg";
import Nav from "@/components/chat/Nav";
import StrangerMsg from "@/components/chat/StrangerMsg";
import SystemMsg from "@/components/chat/SystemMsg";
import UsernameDialog from "@/components/chat/UsernameDialog";
import { useToast } from "@/hooks/use-toast";
import type { Message } from "@/lib/types";
import { fetcher } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

const socket: Socket = io(process.env.NEXT_PUBLIC_BACKEND_URL!);

export default function Room({ params }: { params: { id: string } }) {
	const { id } = params;
	const [messages, setMessages] = useState<Message[]>([]);
	const [showNameDialog, setShowNameDialog] = useState(true);
	const [joined, setJoined] = useState(false);
	const { toast } = useToast();
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages]);

	const joinRoom = useCallback(
		async (name: string) => {
			await createRoom(id);
			setShowNameDialog(false);
			setJoined(true);
			setMessages([{ type: "system", msg: "You joined the room", variant: "info" }]);
			socket.emit("new-user", id, name);
		},
		[id]
	);

	useEffect(() => {
		if (!joined) return;

		const onChatMessage = (data: { name: string; message: string }) => {
			setMessages((prev) => [...prev, { type: "stranger", name: data.name, msg: data.message }]);
		};

		const onUserConnected = (name: string) => {
			setMessages((prev) => [...prev, { type: "system", msg: `${name} joined`, variant: "join" }]);
			toast({ title: "Someone joined", description: name });
		};

		const onUserDisconnected = (name: string) => {
			setMessages((prev) => [...prev, { type: "system", msg: `${name} left`, variant: "leave" }]);
			toast({ title: "Someone left", description: name });
		};

		socket.on("chat-message", onChatMessage);
		socket.on("user-connected", onUserConnected);
		socket.on("user-disconnected", onUserDisconnected);

		return () => {
			socket.off("chat-message", onChatMessage);
			socket.off("user-connected", onUserConnected);
			socket.off("user-disconnected", onUserDisconnected);
		};
	}, [joined, toast]);

	return (
		<div className="flex flex-col h-screen mesh-bg">
			<UsernameDialog open={showNameDialog} onSubmit={joinRoom} />
			<Nav roomId={id} />

			<div ref={scrollRef} className="flex-1 overflow-y-auto">
				<div className="max-w-chat mx-auto px-4 py-6">
					{messages.length === 0 && joined && (
						<div className="flex flex-col items-center justify-center h-full min-h-[40vh] text-center">
							<p className="text-muted-foreground text-sm">No messages yet. Say hello!</p>
						</div>
					)}
					<div className="flex flex-col gap-4">
						{messages.map((msg, index) => {
							if (msg.type === "my") return <MyMsg key={index} msg={msg.msg} />;
							if (msg.type === "stranger") return <StrangerMsg key={index} msg={msg.msg} name={msg.name} />;
							if (msg.type === "system") return <SystemMsg key={index} msg={msg.msg} variant={msg.variant} />;
						})}
					</div>
				</div>
			</div>

			<div className="shrink-0 border-t border-border/60 bg-background/80 backdrop-blur-xl px-4 py-3">
				<ChatForm className="max-w-chat mx-auto" roomName={id} setMessages={setMessages} socket={socket} />
			</div>
		</div>
	);
}

const createRoom = async (id: string) => {
	return fetcher({
		url: "/api/room",
		options: {
			headers: { "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify({ room: id }),
		},
	});
};
