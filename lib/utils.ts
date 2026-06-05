import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const randomKey = () => Math.random().toString(36).slice(2);

export const fetcher = async ({ url, options = {} }: { url: string; options?: RequestInit }) => {
	let headers: HeadersInit = {};
	if (options && options.headers) {
		headers = { ...options.headers };
	}
	try {
		const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, { ...options, headers });
		if (!response.ok) return { error: true, message: response.statusText };
		const json = await response.json();
		return json;
	} catch (err) {
		return { error: true, message: err };
	}
};

function nameHash(name: string): number {
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}
	return Math.abs(hash);
}

export function avatarStyle(name: string): { backgroundColor: string; color: string } {
	const hue = nameHash(name) % 360;
	const backgroundColor = `hsl(${hue} 52% 40%)`;
	return { backgroundColor, color: "#ffffff" };
}

export function msgId() {
	return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function formatMessageTime(timestamp: number): string {
	return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function formatDateLabel(timestamp: number): string {
	const date = new Date(timestamp);
	const today = new Date();
	const yesterday = new Date();
	yesterday.setDate(today.getDate() - 1);

	const isSameDay = (a: Date, b: Date) =>
		a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

	if (isSameDay(date, today)) return "Today";
	if (isSameDay(date, yesterday)) return "Yesterday";

	const weekAgo = new Date();
	weekAgo.setDate(today.getDate() - 6);
	if (date >= weekAgo) {
		return date.toLocaleDateString([], { weekday: "long" });
	}

	return date.toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" });
}

export function getInitials(name: string): string {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}
