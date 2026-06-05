import { cn, formatMessageTime } from "@/lib/utils";

export default function MyMsg({
	msg,
	time,
	isGrouped = false,
}: {
	msg: string;
	time: number;
	isGrouped?: boolean;
}) {
	return (
		<div className={cn("flex justify-end message-in", isGrouped ? "mt-0.5" : "mt-2")}>
			<div className="relative max-w-[80%] min-w-[4rem]">
				<div className="bubble-out px-3 py-1.5 pb-5 rounded-2xl rounded-br-sm text-sm leading-relaxed break-words">
					<span className="whitespace-pre-wrap">{msg}</span>
					<span className="absolute bottom-1 right-2.5 text-[10px] leading-none text-emerald-800/50 dark:text-emerald-200/50 tabular-nums">
						{formatMessageTime(time)}
					</span>
				</div>
			</div>
		</div>
	);
}
