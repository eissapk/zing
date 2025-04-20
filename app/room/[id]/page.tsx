"use client";
import ChatForm from "@/components/chat/Form";
// import LeftRoom from "@/components/chat/LeftRoom";
import MyMsg from "@/components/chat/MyMsg";
import Nav from "@/components/chat/Nav";
import StrangerMsg from "@/components/chat/StrangerMsg";
// import { redirect } from "next/navigation";
import { fetcher } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);
type MSG = { type: string; name?: string; msg: string };

export default function Room({ params }: { params: { id: string } }) {
	const { id } = params;
	const [messages, setMessages] = useState<MSG[]>([]);
	const div = useRef(null);
	const init = async () => {
		const res = await createRoom(id);
		console.log({ id, res });
		const name: string = prompt("Enter your name") || "Anonymous";
		console.log({ name });
		setMessages([...messages, { type: "my", msg: "You joined" }]);
		socket.emit("new-user", id, name);
	};

	useEffect(() => {
		// scroll to bottom on each message
		if (div.current) {
			// @ts-expect-error -- todo
			div.current.scrollTop = div.current.scrollHeight;
		}
	},[messages]);

	useEffect(() => {
		init();

		socket.on("room-created", room => {
			console.log("room created", { room });
		});

		socket.on("chat-message", data => {
			// console.log("chat-message", { data });
			const obj = { type: "stranger", name: data.name, msg: data.message };
			console.log(obj);
			setMessages((prevState: any) => [...prevState, obj]);	
		});

		socket.on("user-connected", name => {
			// console.log("user-connected", { name });
			const obj = { type: "stranger", name, msg: "Connected" };
			console.log(obj);
			setMessages((prevState: any) => [...prevState, obj]);
		});

		socket.on("user-disconnected", name => {
			// console.log("user-disconnected", { name });
			const obj = { type: "stranger", name, msg: "Disconnected" };
			console.log(obj);
			setMessages((prevState: any) => [...prevState]);
		});
	}, [id]);

	// if room doesn't exist
	// if (id === "123") redirect("/room");

	// if (leftRoom) return <LeftRoom id={id} />;

	return (
		<div className="flex gap-4 flex-col h-screen justify-between py-4">
			<Nav roomId={id} />
			<div ref={div} className="overflow-y-auto py-4 w-screen">
				<div className="max-w-max mx-auto">
					<article className="px-4 flex flex-col gap-10">
						{messages.map((msg, index) => {
							if (msg.type === "my") {
								return <MyMsg key={index} msg={msg.msg} />;
							} else if (msg.type === "stranger") {
								return <StrangerMsg key={index} msg={msg.msg} name={msg.name} />;
							}
						})}
					</article>
				</div>
			</div>
			<ChatForm className="w-full md:max-w-max px-4 mx-auto" roomName={id} setMessages={setMessages} socket={socket} />
		</div>
	);
}

const createRoom = async (id: string) => {
	const response = await fetcher({
		url: "/api/room",
		options: { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify({ room: id }) },
	});
	return response;
};
