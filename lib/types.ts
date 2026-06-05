export type Message =
	| { type: "my"; msg: string }
	| { type: "stranger"; name: string; msg: string }
	| { type: "system"; msg: string; variant: "join" | "leave" | "info" };
