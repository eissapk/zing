"use client";
import People from "@/components/People";
import { Copy } from "lucide-react";
import ToolTip from "@/components/ToolTip";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

function copyToClipboard(text:string) {
	// Use the Clipboard API if available
	if (navigator.clipboard && window.isSecureContext) {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				console.log("Text copied to clipboard");
			})
			.catch(error => {
				console.error("Failed to copy text: ", error);
			});
	} else {
		// Fallback for older browsers or non-secure contexts
		const textArea = document.createElement("textarea");
		textArea.value = text;

		// Make the textarea out of viewport
		textArea.style.position = "fixed";
		textArea.style.left = "-999999px";
		textArea.style.top = "-999999px";
		document.body.appendChild(textArea);

		textArea.focus();
		textArea.select();

		try {
			const successful = document.execCommand("copy");
			const msg = successful ? "successful" : "unsuccessful";
			console.log("Fallback: Copying text was " + msg);
		} catch (err) {
			console.error("Fallback: Unable to copy", err);
		}

		document.body.removeChild(textArea);
	}
}

function Nav({ roomId }: { roomId: string }) {
	const { toast } = useToast();

	const copyUrl = () => {
		const url = window.location.href;
		copyToClipboard(url);
		console.log("copied", url);
		toast({
			title: "Copied to clipboard!",
			description: url,
		});
	};
	return (
		<nav className="max-w-max mx-auto w-full px-4">
			<ul className="flex items-center justify-end gap-x-4">
				<li>
					<ToolTip title="Copy room link">
						<Button size={"icon"} variant={"outline"} className="rounded-full" onClick={copyUrl}>
							<Copy className="w-4 h-4" />
						</Button>
					</ToolTip>
				</li>
				<li>
					<People roomId={roomId} />
				</li>
			</ul>
		</nav>
	);
}

export default Nav;
