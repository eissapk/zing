"use client";

import EmojiPicker from "@/components/chat/EmojiPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { playSendSound } from "@/lib/sounds";
import type { Message } from "@/lib/types";
import { cn, msgId } from "@/lib/utils";
import { SendHorizontal, Smile } from "lucide-react";
import { useRef, useState } from "react";
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

	const insertEmoji = (emoji: string) => {
		const el = inputRef.current;
		if (!el) {
			setInput((prev) => prev + emoji);
			return;
		}

		const start = el.selectionStart ?? input.length;
		const end = el.selectionEnd ?? input.length;
		const next = input.slice(0, start) + emoji + input.slice(end);
		setInput(next);

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
		setInput("");
		setEmojiOpen(false);
	};

	return (
		<form onSubmit={submitHandler} className={cn("relative", className)}>
			<EmojiPicker
				open={emojiOpen}
				onClose={() => setEmojiOpen(false)}
				onSelect={insertEmoji}
				anchorRef={emojiButtonRef}
			/>

			<div className="flex items-center gap-1.5 p-1.5 rounded-full bg-muted/80 dark:bg-secondary/80 border border-border/50">
				<Button
					ref={emojiButtonRef}
					type="button"
					size="icon"
					variant="ghost"
					onClick={() => setEmojiOpen((prev) => !prev)}
					className={cn(
						"size-10 rounded-full shrink-0 hover:bg-foreground/5",
						emojiOpen && "bg-background text-sky-600 dark:text-sky-400"
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
					onChange={(e) => setInput(e.target.value)}
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
