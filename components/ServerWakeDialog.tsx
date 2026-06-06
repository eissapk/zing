"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Moon, RefreshCw } from "lucide-react";

type ServerWakeDialogProps = {
	open: boolean;
	failed?: boolean;
	onRetry?: () => void;
};

export default function ServerWakeDialog({ open, failed = false, onRetry }: ServerWakeDialogProps) {
	return (
		<Dialog open={open}>
			<DialogContent
				hideClose
				className="sm:max-w-md bg-background/95 backdrop-blur-xl border-border shadow-2xl"
				onPointerDownOutside={(e) => e.preventDefault()}
				onEscapeKeyDown={(e) => e.preventDefault()}>
				<DialogHeader>
					<div className="mx-auto mb-2 size-12 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center glow-violet">
						{failed ? <RefreshCw className="size-6 text-white" /> : <Moon className="size-6 text-white" />}
					</div>
					<DialogTitle className="text-center text-xl">
						{failed ? "Server is taking too long" : "Waking up the server"}
					</DialogTitle>
					<DialogDescription className="text-center">
						{failed
							? "The chat server didn't respond in time. It may still be starting up — try again in a moment."
							: "The chat server was asleep. It should be ready in just a moment..."}
					</DialogDescription>
				</DialogHeader>
				{failed ? (
					<DialogFooter>
						<Button
							onClick={onRetry}
							className="w-full h-11 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white border-0 glow-violet">
							<RefreshCw className="size-4 mr-2" />
							Try again
						</Button>
					</DialogFooter>
				) : (
					<div className="flex justify-center py-2">
						<Loader2 className="size-8 text-violet-500 animate-spin" />
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
