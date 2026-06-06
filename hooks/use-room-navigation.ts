"use client";

import { waitForServer } from "@/lib/server";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";

export function useRoomNavigation() {
	const router = useRouter();
	const [waking, setWaking] = useState(false);
	const [failed, setFailed] = useState(false);
	const pendingRoomRef = useRef<string | null>(null);
	const abortRef = useRef<AbortController | null>(null);

	const goToRoom = useCallback(
		async (roomId: string) => {
			abortRef.current?.abort();
			const controller = new AbortController();
			abortRef.current = controller;

			pendingRoomRef.current = roomId;
			setWaking(true);
			setFailed(false);

			const ok = await waitForServer({ signal: controller.signal });
			if (controller.signal.aborted) return;

			setWaking(false);
			if (ok) {
				router.push(`/room/${roomId}`);
			} else {
				setFailed(true);
			}
		},
		[router]
	);

	const retry = useCallback(() => {
		if (pendingRoomRef.current) goToRoom(pendingRoomRef.current);
	}, [goToRoom]);

	const dismiss = useCallback(() => {
		abortRef.current?.abort();
		setWaking(false);
		setFailed(false);
		pendingRoomRef.current = null;
	}, []);

	return { goToRoom, waking, failed, retry, dismiss };
}
