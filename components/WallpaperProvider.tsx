"use client";

import { isWallpaperId, WALLPAPER_STORAGE_KEY, type WallpaperId } from "@/lib/wallpapers";
import { createContext, useContext, useEffect, useState } from "react";

type WallpaperContextValue = {
	wallpaper: WallpaperId;
	setWallpaper: (id: WallpaperId) => void;
};

const WallpaperContext = createContext<WallpaperContextValue | null>(null);

export function WallpaperProvider({ children }: { children: React.ReactNode }) {
	const [wallpaper, setWallpaperState] = useState<WallpaperId>("default");

	useEffect(() => {
		const stored = localStorage.getItem(WALLPAPER_STORAGE_KEY);
		if (stored && isWallpaperId(stored)) setWallpaperState(stored);
	}, []);

	const setWallpaper = (id: WallpaperId) => {
		setWallpaperState(id);
		localStorage.setItem(WALLPAPER_STORAGE_KEY, id);
	};

	return <WallpaperContext.Provider value={{ wallpaper, setWallpaper }}>{children}</WallpaperContext.Provider>;
}

export function useWallpaper() {
	const ctx = useContext(WallpaperContext);
	if (!ctx) throw new Error("useWallpaper must be used within WallpaperProvider");
	return ctx;
}
