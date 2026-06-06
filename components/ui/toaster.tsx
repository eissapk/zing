"use client";

import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Copy, LogIn, LogOut } from "lucide-react";
import type { VariantProps } from "class-variance-authority";

const iconConfig = {
	default: { Icon: Copy, gradient: "from-violet-500 to-cyan-500" },
	join: { Icon: LogIn, gradient: "from-emerald-500 to-cyan-500" },
	leave: { Icon: LogOut, gradient: "from-amber-500 to-orange-500" },
	destructive: { Icon: LogOut, gradient: "from-red-500 to-rose-500" },
} as const;

type ToastVariant = keyof typeof iconConfig;

function ToastIcon({ variant }: { variant?: VariantProps<typeof Toast>["variant"] }) {
	const key = (variant && variant in iconConfig ? variant : "default") as ToastVariant;
	const { Icon, gradient } = iconConfig[key];

	return (
		<div className={cn("size-9 shrink-0 rounded-xl bg-gradient-to-br flex items-center justify-center", gradient)}>
			<Icon className="size-4 text-white" />
		</div>
	);
}

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider duration={3500}>
			{toasts.map(function ({ id, title, description, action, variant, onOpenChange, className, ...props }) {
				return (
					<Toast
						key={id}
						variant={variant}
						className={cn("cursor-pointer active:scale-[0.98]", className)}
						onOpenChange={onOpenChange}
						onClick={() => onOpenChange?.(false)}
						{...props}>
						<ToastIcon variant={variant} />
						<div className="grid flex-1 gap-0.5 min-w-0">
							{title && <ToastTitle>{title}</ToastTitle>}
							{description && <ToastDescription>{description}</ToastDescription>}
						</div>
						{action}
					</Toast>
				);
			})}
			<ToastViewport />
		</ToastProvider>
	);
}
