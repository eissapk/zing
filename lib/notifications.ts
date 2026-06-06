import { resetFavicon } from "@/lib/favicon";

export function isNotificationSupported(): boolean {
	return typeof window !== "undefined" && "Notification" in window;
}

export function canNotify(): boolean {
	return isNotificationSupported() && Notification.permission === "granted";
}

export async function requestNotificationPermission(): Promise<NotificationPermission | null> {
	if (!isNotificationSupported()) return null;
	if (Notification.permission !== "default") return Notification.permission;
	return Notification.requestPermission();
}

export function isTabUnfocused(): boolean {
	if (typeof document === "undefined") return false;
	return document.hidden || !document.hasFocus();
}

export function showChatNotification(name: string, message: string, roomId: string) {
	if (!canNotify() || !isTabUnfocused()) return;

	const body = message.length > 140 ? `${message.slice(0, 137)}...` : message;

	const notification = new Notification(name, {
		body,
		tag: `zing-${roomId}`,
	});

	notification.onclick = () => {
		window.focus();
		resetFavicon();
		notification.close();
	};
}
