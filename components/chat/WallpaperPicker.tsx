"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useWallpaper } from "@/components/WallpaperProvider";
import { WALLPAPERS } from "@/lib/wallpapers";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

export default function WallpaperPicker() {
	const { wallpaper, setWallpaper } = useWallpaper();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon" variant="ghost" className="size-9 rounded-full hover:bg-muted" aria-label="Change chat wallpaper">
					<ImageIcon className="size-4" />
				</Button>
			</SheetTrigger>
			<SheetContent className="w-80 bg-background border-border">
				<SheetHeader className="border-b border-border pb-4">
					<SheetTitle className="flex items-center gap-2 text-foreground">
						<ImageIcon className="size-5 text-sky-500" />
						Chat Wallpaper
					</SheetTitle>
				</SheetHeader>
				<div className="grid grid-cols-2 gap-3 py-4">
					{WALLPAPERS.map((wp) => (
						<button
							key={wp.id}
							type="button"
							onClick={() => setWallpaper(wp.id)}
							className={cn(
								"flex flex-col gap-2 rounded-xl overflow-hidden border-2 transition-all hover:scale-[1.02]",
								wallpaper === wp.id ? "border-sky-500 ring-2 ring-sky-500/30" : "border-border"
							)}>
							<div className={cn("h-20 w-full chat-area", `chat-wp-${wp.id}`)} />
							<span className="text-xs font-medium text-foreground pb-2">{wp.label}</span>
						</button>
					))}
				</div>
			</SheetContent>
		</Sheet>
	);
}
