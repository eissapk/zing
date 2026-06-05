import { MessageCircle, Shield, Zap } from "lucide-react";

function Header() {
	return (
		<div className="text-center mb-12 animate-slide-up">
			<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 mb-6 glow-violet animate-float">
				<MessageCircle className="size-8 text-white" />
			</div>

			<h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
				<span className="gradient-text">Zing</span>
			</h1>

			<p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto text-balance leading-relaxed">
				Instant, anonymous chat rooms. No accounts, no traces — just real-time conversations.
			</p>

			<div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
				<span className="flex items-center gap-1.5">
					<Shield className="size-4 text-violet-400" />
					Anonymous
				</span>
				<span className="flex items-center gap-1.5">
					<Zap className="size-4 text-cyan-400" />
					Real-time
				</span>
				<span className="flex items-center gap-1.5">
					<MessageCircle className="size-4 text-fuchsia-400" />
					Ephemeral
				</span>
			</div>
		</div>
	);
}

export default Header;
