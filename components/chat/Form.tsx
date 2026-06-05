"use client";

import EmojiPicker from "@/components/chat/EmojiPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
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

		const obj: Message = { type: "my", msg: input };
		setMessages((prev) => [...prev, obj]);
		socket.emit("send-chat-message", roomName, input);
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

			<div className="flex items-center gap-2 p-2 rounded-2xl glass-strong">
				<Button
					ref={emojiButtonRef}
					type="button"
					size="icon"
					variant="ghost"
					onClick={() => setEmojiOpen((prev) => !prev)}
					className={cn(
						"size-10 rounded-xl shrink-0 hover:bg-foreground/5",
						emojiOpen && "bg-muted text-violet-500 dark:text-violet-400"
					)}
					aria-label="Toggle emoji picker">
					<Smile className="size-4 pointer-events-none" />
				</Button>

				<Input
					ref={inputRef}
					type="text"
					placeholder="Type a message..."
					className="h-11 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 text-sm"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>

				<Button
					type="submit"
					size="icon"
					disabled={!input.trim()}
					className="size-10 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 border-0 shrink-0 disabled:opacity-30">
					<SendHorizontal className="size-4 pointer-events-none" />
				</Button>
			</div>
		</form>
	);
}
