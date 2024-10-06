import Header from "@/components/home/Header";
import JoinRoom from "@/components/home/JoinRoom";
import NewRoom from "@/components/home/NewRoom";
import type { Metadata } from "next";

export default function Home() {
	return (
		<>
			<Header />
			<div className="flex gap-4 flex-col items-center sm:flex-row">
				<NewRoom />
				<JoinRoom />
			</div>
		</>
	);
}

export const metadata: Metadata = {
	title: "Zing | Secure, Anonymous Chat",
	description: "Private, encrypted conversations without revealing your identity.",
};
