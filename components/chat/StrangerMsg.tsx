import Avatar from "@/components/chat/Avatar";
import { formatMessageTime, cn } from "@/lib/utils";

export default function StrangerMsg({
	msg,
	name = "Anonymous",
	time,
	showAvatar = true,
	showName = true,
	isGrouped = false,
}: {
	msg: string;
	name?: string;
	time: number;
	showAvatar?: boolean;
	showName?: boolean;
	isGrouped?: boolean;
}) {
	return (
		<div className={cn("flex gap-2 items-end message-in", isGrouped ? "mt-0.5" : "mt-2")}>
			{showAvatar ? (
				<Avatar name={name} size="sm" />
			) : (
				<div className="size-8 shrink-0" />
			)}
			<div className="flex flex-col max-w-[80%] min-w-[4rem]">
				{showName && (
					<span className="text-xs font-semibold text-sky-600 dark:text-sky-400 mb-0.5 ml-1 truncate">{name}</span>
				)}
				<div className="relative">
					<div className="bubble-in px-3 py-1.5 pb-5 rounded-2xl rounded-bl-sm text-sm leading-relaxed break-words">
						<span className="whitespace-pre-wrap">{msg}</span>
						<span className="absolute bottom-1 right-2.5 text-[10px] leading-none text-muted-foreground/70 tabular-nums">
							{formatMessageTime(time)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
