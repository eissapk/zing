export type WallpaperId = "default" | "ocean" | "sunset" | "forest" | "lavender" | "midnight" | "dots" | "plain";

export type Wallpaper = {
	id: WallpaperId;
	label: string;
};

export const WALLPAPERS: Wallpaper[] = [
	{ id: "default", label: "Classic" },
	{ id: "ocean", label: "Ocean" },
	{ id: "sunset", label: "Sunset" },
	{ id: "forest", label: "Forest" },
	{ id: "lavender", label: "Lavender" },
	{ id: "midnight", label: "Midnight" },
	{ id: "dots", label: "Dots" },
	{ id: "plain", label: "Plain" },
];

const WALLPAPER_IDS = new Set(WALLPAPERS.map((w) => w.id));

export function isWallpaperId(value: string): value is WallpaperId {
	return WALLPAPER_IDS.has(value as WallpaperId);
}

export const WALLPAPER_STORAGE_KEY = "zing-wallpaper";
