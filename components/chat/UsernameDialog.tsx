"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function UsernameDialog({ open, onSubmit }: { open: boolean; onSubmit: (name: string) => void }) {
	const [name, setName] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (open) {
			setTimeout(() => inputRef.current?.focus(), 100);
		}
	}, [open]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const trimmed = name.trim();
		if (!trimmed) return;
		onSubmit(trimmed);
	};

	return (
		<Dialog open={open}>
			<DialogContent
				hideClose
				className="sm:max-w-md bg-background/95 backdrop-blur-xl border-border shadow-2xl"
				onPointerDownOutside={(e) => e.preventDefault()}
				onEscapeKeyDown={(e) => e.preventDefault()}>
				<DialogHeader>
					<div className="mx-auto mb-2 size-12 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center glow-violet">
						<Sparkles className="size-6 text-white" />
					</div>
					<DialogTitle className="text-center text-xl">Choose your name</DialogTitle>
					<DialogDescription className="text-center">
						Pick a display name for this room. It won&apos;t be saved anywhere.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<Input
						ref={inputRef}
						placeholder="e.g. ShadowFox"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="h-12 bg-muted border-border text-foreground text-base mt-2"
						maxLength={24}
					/>
					<DialogFooter className="mt-4">
						<Button
							type="submit"
							disabled={!name.trim()}
							className="w-full h-11 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white border-0 glow-violet">
							Join the conversation
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
