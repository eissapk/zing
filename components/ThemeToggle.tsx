"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
	const { theme, toggleTheme, mounted } = useTheme();

	return (
		<Button
			type="button"
			size="icon"
			variant="ghost"
			onClick={toggleTheme}
			title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
			className={`relative z-[60] size-9 rounded-xl hover:bg-foreground/5 ${className}`}
			aria-label="Toggle theme">
			{!mounted ? (
				<span className="size-4" />
			) : theme === "dark" ? (
				<Sun className="size-4 pointer-events-none" />
			) : (
				<Moon className="size-4 pointer-events-none" />
			)}
		</Button>
	);
}
