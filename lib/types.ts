export type Message =
	| { type: "my"; msg: string; time: number; id: string }
	| { type: "stranger"; name: string; msg: string; time: number; id: string }
	| { type: "system"; msg: string; variant: "join" | "leave" | "info"; time: number; id: string };

export type ChatItem = Message | { type: "date"; label: string; id: string };
