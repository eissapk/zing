import InfoPageLayout from "@/components/home/InfoPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "FAQ | Zing",
	description: "Frequently asked questions about Zing chat rooms.",
};

export default function FaqPage() {
	return (
		<InfoPageLayout title="FAQ">
			<section>
				<h2 className="mb-2 text-base font-semibold text-foreground">What is Zing?</h2>
				<p>
					Zing is an anonymous, real-time chat app. Create or join a room instantly — no account or sign-up
					required.
				</p>
			</section>

			<section>
				<h2 className="mb-2 text-base font-semibold text-foreground">Are messages stored?</h2>
				<p>
					No. Messages are delivered in real time and are not saved after the room ends. When everyone leaves,
					the room is gone.
				</p>
			</section>

			<section>
				<h2 className="mb-2 text-base font-semibold text-foreground">How do rooms work?</h2>
				<p>
					Create a room to get a unique link, then share it with others. Anyone with the link can join. Rooms
					exist only while people are connected.
				</p>
			</section>

			<section>
				<h2 className="mb-2 text-base font-semibold text-foreground">Do I need an account?</h2>
				<p>
					No. Pick a display name when you join a room. Nothing is tied to an email, phone number, or permanent
					profile.
				</p>
			</section>

			<section>
				<h2 className="mb-2 text-base font-semibold text-foreground">Is Zing open source?</h2>
				<p>
					Yes. The source code is available on{" "}
					<a
						href="https://github.com/eissapk/zing"
						target="_blank"
						rel="noopener noreferrer"
						className="text-foreground underline underline-offset-4 hover:text-violet-500">
						GitHub
					</a>
					.
				</p>
			</section>
		</InfoPageLayout>
	);
}
