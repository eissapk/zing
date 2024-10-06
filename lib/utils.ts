import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const randomKey = () => Math.random().toString(36).slice(2);

export const fetcher = async ({ url, options = {} }: { url: string; options?: any }) => {
	let headers = {};
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
