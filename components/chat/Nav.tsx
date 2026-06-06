"use client";

import People from "@/components/People";
import WallpaperPicker from "@/components/chat/WallpaperPicker";
import ThemeToggle from "@/components/ThemeToggle";
import ToolTip from "@/components/ToolTip";
import { useToast } from "@/hooks/use-toast";
import { Hash, MessageCircle, User } from "lucide-react";
import Link from "next/link";

function copyToClipboard(text: string) {
	if (navigator.clipboard && window.isSecureContext) {
		navigator.clipboard.writeText(text).catch(console.error);
	} else {
		const textArea = document.createElement("textarea");
		textArea.value = text;
		textArea.style.position = "fixed";
		textArea.style.left = "-999999px";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		try {
			document.execCommand("copy");
		} catch (err) {
			console.error("Unable to copy", err);
		}
		document.body.removeChild(textArea);
	}
}

function Nav({ roomId, userName }: { roomId: string; userName: string }) {
	const { toast } = useToast();

	const copyUrl = () => {
		const url = window.location.href;
		copyToClipboard(url);
		toast({
			title: "Link copied!",
			description: "Share it with others to invite them.",
			variant: "default",
		});
	};

	return (
		<header className="shrink-0 border-b border-border/60 bg-background z-10">
			<nav className="max-w-chat mx-auto w-full px-3 py-2.5 flex items-center justify-between">
				<div className="flex items-center gap-3 min-w-0">
					<Link
						href="/"
						className="size-9 rounded-full bg-sky-500 flex items-center justify-center shrink-0 hover:bg-sky-600 transition-colors">
						<MessageCircle className="size-4 text-white" />
					</Link>
					<div className="min-w-0 flex-1">
						<p className="text-sm font-semibold truncate">Room chat</p>
						<div className="text-xs text-muted-foreground flex items-center gap-1.5 min-w-0">
							<ToolTip title="Copy invite link">
								<button
									type="button"
									onClick={copyUrl}
									className="font-mono inline-flex items-center gap-1 min-w-0 truncate rounded-sm hover:text-foreground transition-colors">
									<Hash className="size-3 shrink-0" />
									<span className="truncate">{roomId}</span>
								</button>
							</ToolTip>
							{userName ? (
								<>
									<span className="shrink-0 text-border">·</span>
									<span className="inline-flex items-center gap-1 shrink-0 font-medium text-foreground">
										<User className="size-3 shrink-0" />
										{userName}
									</span>
								</>
							) : null}
						</div>
					</div>
				</div>

				<ul className="flex items-center gap-0.5">
					<li>
						<WallpaperPicker />
					</li>
					<li>
						<ThemeToggle />
					</li>
					<li>
						<People roomId={roomId} />
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Nav;
