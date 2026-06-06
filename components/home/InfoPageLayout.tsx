import Footer from "@/components/home/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

export default function InfoPageLayout({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<main className="relative min-h-screen flex flex-col mesh-bg">
			<div className="absolute top-4 right-4 z-20">
				<ThemeToggle />
			</div>

			<article className="relative z-10 mx-auto w-full max-w-2xl flex-1 px-4 py-16">
				<Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
					← Back to home
				</Link>

				<h1 className="mt-6 text-3xl font-bold tracking-tight">{title}</h1>

				<div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">{children}</div>
			</article>

			<Footer />
		</main>
	);
}
