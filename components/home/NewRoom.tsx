"use client";
// TODO: convert it to server component
import { Button } from "@/components/ui/button";
import { randomKey } from "@/lib/utils";
import { MessageSquareText } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewRoom() {
	const router = useRouter();

	return (
		<section>
			<Button className="h-12 text-base" onClick={() => router.push(`/room/${randomKey()}`)}>
				<MessageSquareText className="me-4 h-5 w-5" />
				New room
			</Button>
		</section>
	);
}
