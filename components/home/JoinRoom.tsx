"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Keyboard } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

function JoinRoom() {
	const router = useRouter();
	const [code, setCode] = useState("");
	return (
		<>
			<section className="flex relative">
				<Keyboard className="absolute left-4 top-[50%] translate-y-[-50%] h5 w-5" />
				<Input type="text" placeholder="Enter code or link" className="ps-12 h-12 text-base" onChange={(e) => setCode(e.target.value)} value={code}/>
			</section>

			<section>
				<Button onClick={() => router.push(`/room/${code}`)} variant={"ghost"} className="h-12 text-base px-8 box-border">
					Join
				</Button>
			</section>
		</>
	);
}

export default JoinRoom;
