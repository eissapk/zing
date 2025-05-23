"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
export default function ChatForm({ className = "", roomName, setMessages, socket }: { socket: any; className?: string; roomName: string; setMessages: any }) {
	const [input, setInput] = useState("");
	const submitHandler = (e: any) => {
		e.preventDefault();
		console.log(input);
		const obj = { type: "my", msg: input };
		// console.log(obj);
		setMessages((prevState: any) => [...prevState, obj]);

		socket.emit("send-chat-message", roomName, input);
		setInput("");
	};

	return (
		<form onSubmit={submitHandler} className={`relative bg-white ${className}`}>
			<Input type="text" placeholder="Enter a message" className="h-14 w-full" value={input} onChange={e => setInput(e.target.value)} />
			<Button type="submit" size={"icon"} className="absolute right-7 top-1/2 -translate-y-1/2 rounded-full flex justify-center items-center">
				<SendHorizontal className="w-4 h-4" />
			</Button>
		</form>
	);
}
