import InfoPageLayout from "@/components/home/InfoPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy | Zing",
	description: "How Zing handles your data and privacy.",
};

export default function PrivacyPage() {
	return (
		<InfoPageLayout title="Privacy">
			<section>
				<h2 className="mb-2 text-base font-semibold text-foreground">Overview</h2>
				<p>
					Zing is built for ephemeral, anonymous conversations. We collect as little as possible and do not
					require accounts.
				</p>
			</section>

			<section>
				<h2 className="mb-2 text-base font-semibold text-foreground">What we don&apos;t collect</h2>
				<p>
					No email, phone number, or permanent user profile. Chat messages are not stored on our servers after
					a room ends.
				</p>
			</section>

			<section>
				<h2 className="mb-2 text-base font-semibold text-foreground">What may be processed</h2>
				<p>
					While you are in a room, messages are relayed in real time so others can receive them. A display name
					you choose is visible to others in the same room. Basic technical data (such as connection logs) may
					be processed to keep the service running.
				</p>
			</section>

			<section>
				<h2 className="mb-2 text-base font-semibold text-foreground">Local storage</h2>
				<p>
					Your browser may store preferences locally (such as theme or chat wallpaper). This stays on your
					device and is not sent to us as profile data.
				</p>
			</section>

			<section>
				<h2 className="mb-2 text-base font-semibold text-foreground">Third parties</h2>
				<p>
					Zing does not sell your data. If we use third-party infrastructure to host the service, those
					providers may process technical data needed to deliver the app.
				</p>
			</section>

			<section>
				<h2 className="mb-2 text-base font-semibold text-foreground">Contact</h2>
				<p>
					Questions about privacy? Open an issue on{" "}
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
