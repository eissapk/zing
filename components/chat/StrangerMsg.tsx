import Avatar from "@/components/chat/Avatar";

export default function StrangerMsg({ msg = "", name = "Anonymous", time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }: { msg: string; name?: string; time?: string }) {
	return (
		<div className="flex gap-3 items-end animate-slide-up">
			<Avatar name={name} size="sm" />
			<div className="flex flex-col gap-1 max-w-[75%]">
				<div className="flex items-center gap-2 px-1">
					<span className="text-xs font-medium text-foreground/80">{name}</span>
					<span className="text-[10px] text-muted-foreground">{time}</span>
				</div>
				<div className="px-4 py-2.5 rounded-2xl rounded-bl-md glass text-sm leading-relaxed">{msg}</div>
			</div>
		</div>
	);
}
