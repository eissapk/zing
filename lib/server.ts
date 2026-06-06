const HEALTH_PATH = "/health";

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
	return new Promise((resolve, reject) => {
		const timeout = setTimeout(resolve, ms);
		signal?.addEventListener(
			"abort",
			() => {
				clearTimeout(timeout);
				reject(new DOMException("Aborted", "AbortError"));
			},
			{ once: true }
		);
	});
}

export async function checkServerHealth(signal?: AbortSignal): Promise<boolean> {
	try {
		const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + HEALTH_PATH, {
			method: "GET",
			signal,
		});
		return response.ok;
	} catch {
		return false;
	}
}

export async function waitForServer({
	interval = 2000,
	maxAttempts = 60,
	signal,
}: {
	interval?: number;
	maxAttempts?: number;
	signal?: AbortSignal;
} = {}): Promise<boolean> {
	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		if (signal?.aborted) return false;
		if (await checkServerHealth(signal)) return true;
		if (attempt < maxAttempts - 1) {
			try {
				await sleep(interval, signal);
			} catch {
				return false;
			}
		}
	}
	return false;
}
