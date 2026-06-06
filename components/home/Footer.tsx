import { SITE } from "@/lib/site";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="relative z-10 w-full px-4 py-6">
			<div className="mx-auto flex max-w-md flex-col items-center gap-3 text-center">
				<nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
					{SITE.links.map((link) =>
						link.external ? (
							<a
								key={link.href}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								className="transition-colors hover:text-foreground">
								{link.label}
							</a>
						) : (
							<Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
								{link.label}
							</Link>
						)
					)}
				</nav>
				<p className="text-[11px] text-muted-foreground/60">© {new Date().getFullYear()} {SITE.name}</p>
			</div>
		</footer>
	);
}
