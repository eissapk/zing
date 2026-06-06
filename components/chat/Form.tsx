"use client";

import EmojiPicker from "@/components/chat/EmojiPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { playSendSound } from "@/lib/sounds";
import type { Message } from "@/lib/types";
import { cn, msgId } from "@/lib/utils";
import { SendHorizontal, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";

export default function ChatForm({
	className = "",
	roomName,
	setMessages,
	socket,
}: {
	socket: Socket;
	className?: string;
	roomName: string;
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) {
	const [input, setInput] = useState("");
	const [emojiOpen, setEmojiOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const emojiButtonRef = useRef<HTMLButtonElement>(null);
	const lastTypingEmitRef = useRef(0);
	const stopTypingTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
	const isTypingRef = useRef(false);

	const TYPING_THROTTLE_MS = 2000;
	const STOP_TYPING_DELAY_MS = 2000;

	const notifyStoppedTyping = () => {
		if (!isTypingRef.current) return;
		isTypingRef.current = false;
		socket.emit("user-stopped-typing", roomName);
	};

	const scheduleStopTyping = () => {
		clearTimeout(stopTypingTimeoutRef.current);
		stopTypingTimeoutRef.current = setTimeout(notifyStoppedTyping, STOP_TYPING_DELAY_MS);
	};

	const handleTypingActivity = (value: string) => {
		if (!value) {
			clearTimeout(stopTypingTimeoutRef.current);
			notifyStoppedTyping();
			return;
		}

		const now = Date.now();
		if (!isTypingRef.current || now - lastTypingEmitRef.current >= TYPING_THROTTLE_MS) {
			lastTypingEmitRef.current = now;
			isTypingRef.current = true;
			socket.emit("user-typing", roomName);
		}

		scheduleStopTyping();
	};

	useEffect(() => {
		return () => {
			clearTimeout(stopTypingTimeoutRef.current);
			if (isTypingRef.current) {
				isTypingRef.current = false;
				socket.emit("user-stopped-typing", roomName);
			}
		};
	}, [roomName, socket]);

	const insertEmoji = (emoji: string) => {
		const el = inputRef.current;
		if (!el) {
			setInput((prev) => {
				const next = prev + emoji;
				handleTypingActivity(next);
				return next;
			});
			return;
		}

		const start = el.selectionStart ?? input.length;
		const end = el.selectionEnd ?? input.length;
		const next = input.slice(0, start) + emoji + input.slice(end);
		setInput(next);
		handleTypingActivity(next);

		requestAnimationFrame(() => {
			el.focus();
			const pos = start + emoji.length;
			el.setSelectionRange(pos, pos);
		});
	};

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim()) return;

		const obj: Message = { type: "my", msg: input, time: Date.now(), id: msgId() };
		setMessages((prev) => [...prev, obj]);
		socket.emit("send-chat-message", roomName, input);
		playSendSound();
		clearTimeout(stopTypingTimeoutRef.current);
		notifyStoppedTyping();
		setInput("");
		setEmojiOpen(false);
	};

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInput(value);
		handleTypingActivity(value);
	};

	return (
		<form onSubmit={submitHandler} className={cn("relative", className)}>
			<EmojiPicker
				open={emojiOpen}
				onClose={() => setEmojiOpen(false)}
				onSelect={insertEmoji}
				anchorRef={emojiButtonRef}
			/>

			<div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white dark:bg-[#212121] border border-black/10 dark:border-white/10 shadow-sm">
				<Button
					ref={emojiButtonRef}
					type="button"
					size="icon"
					variant="ghost"
					onClick={() => setEmojiOpen((prev) => !prev)}
					className={cn(
						"size-10 rounded-full shrink-0 text-zinc-500 hover:text-zinc-700 hover:bg-black/5 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-white/10",
						emojiOpen && "bg-zinc-100 text-sky-600 dark:bg-white/10 dark:text-sky-400"
					)}
					aria-label="Toggle emoji picker">
					<Smile className="size-5 pointer-events-none" />
				</Button>

				<Input
					ref={inputRef}
					type="text"
					placeholder="Message"
					className="h-10 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 text-sm rounded-full"
					value={input}
					onChange={inputChangeHandler}
				/>

				<Button
					type="submit"
					size="icon"
					disabled={!input.trim()}
					className={cn(
						"size-10 rounded-full shrink-0 transition-all duration-200",
						input.trim()
							? "bg-sky-500 hover:bg-sky-600 text-white border-0 scale-100"
							: "bg-transparent text-muted-foreground border-0 scale-95 opacity-50"
					)}>
					<SendHorizontal className="size-5 pointer-events-none" />
				</Button>
			</div>
		</form>
	);
}
