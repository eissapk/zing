"use client";

import ChatForm from "@/components/chat/Form";
import MessageList from "@/components/chat/MessageList";
import Nav from "@/components/chat/Nav";
import UsernameDialog from "@/components/chat/UsernameDialog";
import { WallpaperProvider, useWallpaper } from "@/components/WallpaperProvider";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { playJoinSound, playLeaveSound, playReceiveSound } from "@/lib/sounds";
import type { Message } from "@/lib/types";
import { fetcher, msgId } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

const socket: Socket = io(process.env.NEXT_PUBLIC_BACKEND_URL!);

export default function Room({ params }: { params: { id: string } }) {
	return (
		<WallpaperProvider>
			<RoomChat id={params.id} />
		</WallpaperProvider>
	);
}

function RoomChat({ id }: { id: string }) {
	const [messages, setMessages] = useState<Message[]>([]);
	const [typingUsers, setTypingUsers] = useState<{ name: string; id: number }[]>([]);
	const [usersTypyingHint, setUsersTypyingHint] = useState<string>("");
	const [showNameDialog, setShowNameDialog] = useState(true);
	const [joined, setJoined] = useState(false);
	const { toast } = useToast();
	const { wallpaper } = useWallpaper();
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
		}
	}, [messages]);

	const joinRoom = useCallback(
		async (name: string) => {
			await createRoom(id);
			setShowNameDialog(false);
			setJoined(true);
			setMessages([{ type: "system", msg: "You joined the room", variant: "info", time: Date.now(), id: msgId() }]);
			socket.emit("new-user", id, name);
		},
		[id]
	);

	useEffect(() => {
		if (!joined) return;

		const onChatMessage = (data: { name: string; message: string }) => {
			setMessages(prev => [...prev, { type: "stranger", name: data.name, msg: data.message, time: Date.now(), id: msgId() }]);
			playReceiveSound();
		};
		const onChatTyping = (data: { name: string; id: number }) => {
			setTypingUsers(prev => {
				const user = prev.find(user => user.id === data.id);
				if (!user) return [...prev, { ...data }];
				return prev;
			});
		};
		const onChatStoppedTyping = (data: { name: string; id: number }) => {
			setTypingUsers(prev => prev.filter(user => user.id !== data.id));
		};

		const onUserConnected = (name: string) => {
			setMessages(prev => [...prev, { type: "system", msg: `${name} joined`, variant: "join", time: Date.now(), id: msgId() }]);
			playJoinSound();
			toast({ title: "Someone joined", description: name });
		};

		const onUserDisconnected = (name: string) => {
			setMessages(prev => [...prev, { type: "system", msg: `${name} left`, variant: "leave", time: Date.now(), id: msgId() }]);
			playLeaveSound();
			toast({ title: "Someone left", description: name });
		};

		socket.on("chat-message", onChatMessage);
		socket.on("chat-typing", onChatTyping);
		socket.on("chat-stopped-typing", onChatStoppedTyping);
		socket.on("user-connected", onUserConnected);
		socket.on("user-disconnected", onUserDisconnected);

		return () => {
			socket.off("chat-message", onChatMessage);
			socket.off("chat-typing", onChatTyping);
			socket.off("chat-stopped-typing", onChatStoppedTyping);
			socket.off("user-connected", onUserConnected);
			socket.off("user-disconnected", onUserDisconnected);
		};
	}, [joined, toast]);

	useEffect(() => {
		if (typingUsers.length) {
			setUsersTypyingHint(typingUsers.map(user => user.name).join(", ") + (typingUsers.length > 1 ? " are" : " is") + " typing...");
		} else {
			setUsersTypyingHint("");
		}
	}, [typingUsers]);

	return (
		<div className="flex flex-col h-screen bg-background">
			<UsernameDialog open={showNameDialog} onSubmit={joinRoom} />
			<Nav roomId={id} />

			<div ref={scrollRef} className={cn("flex-1 overflow-y-auto chat-area", `chat-wp-${wallpaper}`)}>
				<div className="max-w-chat mx-auto px-3 py-4">
					{messages.length === 0 && joined && (
						<div className="flex flex-col items-center justify-center h-full min-h-[40vh] text-center">
							<p className="text-muted-foreground text-sm">No messages yet. Say hello!</p>
						</div>
					)}
					<MessageList messages={messages} />
				</div>
			</div>

			<div className="shrink-0 border-t border-border/60 bg-background px-3 py-2">
				{usersTypyingHint ? (
					<div className="flex flex-col gap-1 pb-2">
						<p className="text-sm text-muted-foreground animate-pulse italic">{usersTypyingHint}</p>
					</div>
				) : (
					""
				)}
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
