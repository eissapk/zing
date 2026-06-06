import { LogIn, LogOut } from "lucide-react";

export default function SystemMsg({ msg, variant = "join" }: { msg: string; variant?: "join" | "leave" | "info" }) {
	const Icon = variant === "leave" ? LogOut : LogIn;

	return (
		<div className="flex items-center justify-center gap-2 py-2 animate-fade-in">
			<div className="chat-system-msg flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-muted-foreground">
				{variant !== "info" && <Icon className="size-3 opacity-60" />}
				<span>{msg}</span>
			</div>
		</div>
	);
}
