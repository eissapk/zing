"use client";

import DateDivider from "@/components/chat/DateDivider";
import MyMsg from "@/components/chat/MyMsg";
import StrangerMsg from "@/components/chat/StrangerMsg";
import SystemMsg from "@/components/chat/SystemMsg";
import type { ChatItem, Message } from "@/lib/types";
import { formatDateLabel } from "@/lib/utils";

const GROUP_WINDOW_MS = 5 * 60 * 1000;

function buildChatItems(messages: Message[]): ChatItem[] {
	const items: ChatItem[] = [];
	let lastDateLabel = "";

	for (let i = 0; i < messages.length; i++) {
		const msg = messages[i];
		const dateLabel = formatDateLabel(msg.time);

		if (dateLabel !== lastDateLabel) {
			items.push({ type: "date", label: dateLabel, id: `date-${msg.id}` });
			lastDateLabel = dateLabel;
		}

		items.push(msg);
	}

	return items;
}

function isGroupedWithPrev(messages: Message[], index: number): boolean {
	const current = messages[index];
	const prev = messages[index - 1];
	if (!prev || current.type === "system" || prev.type === "system") return false;
	if (current.type === "my" && prev.type === "my") {
		return current.time - prev.time < GROUP_WINDOW_MS;
	}
	if (current.type === "stranger" && prev.type === "stranger") {
		return current.name === prev.name && current.time - prev.time < GROUP_WINDOW_MS;
	}
	return false;
}

export default function MessageList({ messages }: { messages: Message[] }) {
	const items = buildChatItems(messages);

	const msgIndexMap = new Map<string, number>();
	messages.forEach((m, i) => msgIndexMap.set(m.id, i));

	return (
		<div className="flex flex-col">
			{items.map((item) => {
				if (item.type === "date") {
					return <DateDivider key={item.id} label={item.label} />;
				}

				const index = msgIndexMap.get(item.id) ?? 0;
				const grouped = isGroupedWithPrev(messages, index);

				if (item.type === "my") {
					return <MyMsg key={item.id} msg={item.msg} time={item.time} isGrouped={grouped} />;
				}

				if (item.type === "stranger") {
					return (
						<StrangerMsg
							key={item.id}
							msg={item.msg}
							name={item.name}
							time={item.time}
							showAvatar={!grouped}
							showName={!grouped}
							isGrouped={grouped}
						/>
					);
				}

				if (item.type === "system") {
					return <SystemMsg key={item.id} msg={item.msg} variant={item.variant} />;
				}
			})}
		</div>
	);
}
