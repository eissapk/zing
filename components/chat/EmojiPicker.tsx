"use client";

import { EMOJI_CATEGORIES } from "@/lib/emojis";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function EmojiPicker({
	open,
	onClose,
	onSelect,
	anchorRef,
}: {
	open: boolean;
	onClose: () => void;
	onSelect: (emoji: string) => void;
	anchorRef: React.RefObject<HTMLElement | null>;
}) {
	const [activeCategory, setActiveCategory] = useState(EMOJI_CATEGORIES[0].id);
	const panelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;

		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as Node;
			if (panelRef.current?.contains(target) || anchorRef.current?.contains(target)) return;
			onClose();
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open, onClose, anchorRef]);

	if (!open) return null;

	const category = EMOJI_CATEGORIES.find((c) => c.id === activeCategory) ?? EMOJI_CATEGORIES[0];

	return (
		<div
			ref={panelRef}
			className="absolute bottom-full left-0 right-0 mb-2 rounded-2xl border border-border bg-background shadow-2xl overflow-hidden animate-slide-up z-50">
			<div className="max-h-52 overflow-y-auto p-2 grid grid-cols-8 gap-0.5">
				{category.emojis.map((emoji) => (
					<button
						key={emoji}
						type="button"
						onClick={() => onSelect(emoji)}
						className="size-9 flex items-center justify-center text-xl rounded-lg hover:bg-muted transition-colors">
						{emoji}
					</button>
				))}
			</div>

			<div className="flex border-t border-border bg-muted/50 px-1 py-1 gap-0.5 overflow-x-auto">
				{EMOJI_CATEGORIES.map((cat) => (
					<button
						key={cat.id}
						type="button"
						onClick={() => setActiveCategory(cat.id)}
						className={cn(
							"size-9 shrink-0 flex items-center justify-center text-lg rounded-lg transition-colors",
							activeCategory === cat.id ? "bg-background shadow-sm" : "hover:bg-background/60"
						)}
						title={cat.label}>
						{cat.icon}
					</button>
				))}
			</div>
		</div>
	);
}
