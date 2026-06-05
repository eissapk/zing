import { avatarStyle, cn, getInitials } from "@/lib/utils";

export default function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
	const sizeClasses = {
		sm: "size-8 text-xs",
		md: "size-10 text-sm",
		lg: "size-12 text-base",
	};

	const style = avatarStyle(name);

	return (
		<div
			style={style}
			className={cn(
				"rounded-full flex items-center justify-center font-bold shrink-0 select-none shadow-sm ring-1 ring-black/10 dark:ring-white/15",
				sizeClasses[size]
			)}>
			{getInitials(name)}
		</div>
	);
}
