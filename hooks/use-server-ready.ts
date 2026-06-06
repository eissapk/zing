"use client";

import { waitForServer } from "@/lib/server";
import { useCallback, useEffect, useRef, useState } from "react";

export function useServerReady() {
	const [ready, setReady] = useState(false);
	const [failed, setFailed] = useState(false);
	const abortRef = useRef<AbortController | null>(null);

	const check = useCallback(async () => {
		abortRef.current?.abort();
		const controller = new AbortController();
		abortRef.current = controller;

		setFailed(false);
		const ok = await waitForServer({ signal: controller.signal });
		if (controller.signal.aborted) return;

		if (ok) {
			setReady(true);
		} else {
			setFailed(true);
		}
	}, []);

	useEffect(() => {
		check();
		return () => abortRef.current?.abort();
	}, [check]);

	return { ready, failed, retry: check };
}
