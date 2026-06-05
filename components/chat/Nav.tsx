"use client";

import People from "@/components/People";
import ThemeToggle from "@/components/ThemeToggle";
import ToolTip from "@/components/ToolTip";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Hash, MessageCircle } from "lucide-react";
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

function Nav({ roomId }: { roomId: string }) {
	const { toast } = useToast();

	const copyUrl = () => {
		const url = window.location.href;
		copyToClipboard(url);
		toast({
			title: "Link copied!",
			description: "Share it with others to invite them.",
		});
	};

	return (
		<header className="shrink-0 border-b border-border/60 bg-background/80 backdrop-blur-xl">
			<nav className="max-w-chat mx-auto w-full px-4 py-3 flex items-center justify-between">
				<div className="flex items-center gap-3 min-w-0">
					<Link href="/" className="size-9 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity">
						<MessageCircle className="size-4 text-white" />
					</Link>
					<div className="min-w-0">
						<p className="text-xs text-muted-foreground">Room</p>
						<p className="text-sm font-mono font-medium truncate flex items-center gap-1">
							<Hash className="size-3 text-muted-foreground shrink-0" />
							{roomId}
						</p>
					</div>
				</div>

				<ul className="flex items-center gap-1.5">
					<li>
						<ThemeToggle />
					</li>
					<li>
						<ToolTip title="Copy invite link">
							<Button size="icon" variant="ghost" className="size-9 rounded-xl hover:bg-foreground/5" onClick={copyUrl}>
								<Copy className="size-4" />
							</Button>
						</ToolTip>
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
