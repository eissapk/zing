"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { fetcher } from "@/lib/utils";
import { UsersRound } from "lucide-react";
import { useState } from "react";

function People({ roomId }: { roomId: string }) {
	const [users, setUsers] = useState<object[]>([]);
	const clickHandler = async () => {
		const response = await fetcher({ url: `/api/room/${roomId}/users` });
		if (!response.success) return;
		console.log(response.users);
		const users = response.users || {};
		const modifedUsers: object[] = Object.entries(users).map(([key, value]) => ({ name: value, id: key }));
		setUsers(modifedUsers);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button onClick={clickHandler} variant="outline" size={"icon"} className="rounded-full">
					<UsersRound className="w-4 h-4" />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>
						People <span className="text-sm text-zinc-700">{users.length ? `(${users.length})` : ""}</span>
					</SheetTitle>
				</SheetHeader>
				<ul className="flex flex-col gap-2 py-4 border-t border-t-zinc-200 pt-4 mt-4">
					{users.map((item: any) => (
						<li className="font-bold text-zinc-700 truncate max-w-48 first-letter:capitalize text-sm" key={item.id}>
							{item.name}
						</li>
					))}
				</ul>
			</SheetContent>
		</Sheet>
	);
}
export default People;
