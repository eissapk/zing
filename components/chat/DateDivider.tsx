export default function DateDivider({ label }: { label: string }) {
	return (
		<div className="flex justify-center py-3 animate-fade-in">
			<span className="chat-date-divider px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-medium text-muted-foreground shadow-sm">
				{label}
			</span>
		</div>
	);
}
