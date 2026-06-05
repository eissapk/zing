let audioCtx: AudioContext | null = null;

function getCtx() {
	if (!audioCtx && typeof window !== "undefined") {
		audioCtx = new AudioContext();
	}
	return audioCtx;
}

function playTone(freq: number, duration: number, type: OscillatorType = "sine", volume = 0.08) {
	const ctx = getCtx();
	if (!ctx) return;

	if (ctx.state === "suspended") ctx.resume();

	const osc = ctx.createOscillator();
	const gain = ctx.createGain();

	osc.type = type;
	osc.frequency.setValueAtTime(freq, ctx.currentTime);
	gain.gain.setValueAtTime(volume, ctx.currentTime);
	gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

	osc.connect(gain);
	gain.connect(ctx.destination);

	osc.start(ctx.currentTime);
	osc.stop(ctx.currentTime + duration);
}

export function playSendSound() {
	playTone(520, 0.08, "sine", 0.06);
	setTimeout(() => playTone(680, 0.1, "sine", 0.05), 60);
}

export function playReceiveSound() {
	playTone(440, 0.1, "sine", 0.07);
	setTimeout(() => playTone(380, 0.12, "sine", 0.06), 80);
}

export function playJoinSound() {
	playTone(523, 0.1, "sine", 0.07);
	setTimeout(() => playTone(659, 0.1, "sine", 0.06), 90);
	setTimeout(() => playTone(784, 0.14, "sine", 0.05), 180);
}

export function playLeaveSound() {
	playTone(392, 0.12, "sine", 0.06);
	setTimeout(() => playTone(330, 0.12, "sine", 0.05), 100);
	setTimeout(() => playTone(262, 0.18, "triangle", 0.04), 200);
}
