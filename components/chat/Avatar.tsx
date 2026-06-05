import { avatarColor, cn, getInitials } from "@/lib/utils";

export default function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
	const sizeClasses = {
		sm: "size-7 text-[10px]",
		md: "size-9 text-xs",
		lg: "size-11 text-sm",
	};

	return (
		<div
			className={cn(
				"rounded-full bg-gradient-to-br flex items-center justify-center font-semibold text-white shrink-0 shadow-lg",
				avatarColor(name),
				sizeClasses[size]
			)}>
			{getInitials(name)}
		</div>
	);
}
