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

const AVATAR_COLORS = [
	"from-violet-500 to-purple-600",
	"from-cyan-500 to-blue-600",
	"from-fuchsia-500 to-pink-600",
	"from-emerald-500 to-teal-600",
	"from-amber-500 to-orange-600",
	"from-rose-500 to-red-600",
	"from-indigo-500 to-violet-600",
	"from-sky-500 to-cyan-600",
];

export function avatarColor(name: string): string {
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}
	return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function getInitials(name: string): string {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}
