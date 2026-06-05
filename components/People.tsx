"use client";

import Avatar from "@/components/chat/Avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { fetcher } from "@/lib/utils";
import { UsersRound } from "lucide-react";
import { useState } from "react";

type User = { name: string; id: string };

function People({ roomId }: { roomId: string }) {
	const [users, setUsers] = useState<User[]>([]);

	const clickHandler = async () => {
		const response = await fetcher({ url: `/api/room/${roomId}/users` });
		if (!response.success) return;
		const usersMap = response.users || {};
		const modifiedUsers: User[] = Object.entries(usersMap).map(([key, value]) => ({
			name: value as string,
			id: key,
		}));
		setUsers(modifiedUsers);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button onClick={clickHandler} variant="ghost" size="icon" className="size-9 rounded-xl hover:bg-foreground/5">
					<UsersRound className="size-4" />
				</Button>
			</SheetTrigger>
			<SheetContent className="w-80 bg-background border-border">
				<SheetHeader className="border-b border-border pb-4">
					<SheetTitle className="flex items-center gap-2 text-foreground">
						<UsersRound className="size-5 text-violet-500 dark:text-violet-400" />
						People
						{users.length > 0 && (
							<span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
								{users.length}
							</span>
						)}
					</SheetTitle>
				</SheetHeader>
				<ul className="flex flex-col gap-1 py-4">
					{users.length === 0 ? (
						<li className="text-sm text-muted-foreground text-center py-8">No one here yet</li>
					) : (
						users.map((item) => (
							<li
								key={item.id}
								className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors">
								<Avatar name={item.name} size="sm" />
								<span className="text-sm font-medium text-foreground truncate">{item.name}</span>
								<span className="ml-auto size-2 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-sm shadow-emerald-500/50" />
							</li>
						))
					)}
				</ul>
			</SheetContent>
		</Sheet>
	);
}

export default People;
