import InfoPageLayout from "@/components/home/InfoPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Terms | Zing",
	description: "Terms of use for Zing chat rooms.",
};

export default function TermsPage() {
	return (
		<InfoPageLayout title="Terms of Use">
			<section>
				<h2 className="mb-2 text-base font-semibold text-foreground">Acceptance</h2>
				<p>
					By using Zing, you agree to these terms. If you do not agree, please do not use the service.
				</p>
			</section>

			<section>
				<h2 className="mb-2 text-base font-semibold text-foreground">Service description</h2>
				<p>
					Zing provides temporary, real-time chat rooms. The service is provided as-is, without guarantees of
					availability, retention, or delivery.
				</p>
			</section>

			<section>
				<h2 className="mb-2 text-base font-semibold text-foreground">Acceptable use</h2>
				<p>
					Do not use Zing for harassment, illegal activity, spam, or content that violates applicable laws.
					You are responsible for what you share in a room.
				</p>
			</section>

			<section>
				<h2 className="mb-2 text-base font-semibold text-foreground">No warranty</h2>
				<p>
					Zing is offered without warranty. We do not promise uninterrupted service, message delivery, or
					protection against misuse by other participants.
				</p>
			</section>

			<section>
				<h2 className="mb-2 text-base font-semibold text-foreground">Limitation of liability</h2>
				<p>
					To the extent permitted by law, Zing and its contributors are not liable for damages arising from
					your use of the service.
				</p>
			</section>

			<section>
				<h2 className="mb-2 text-base font-semibold text-foreground">Changes</h2>
				<p>
					These terms may be updated from time to time. Continued use of Zing after changes means you accept
					the updated terms.
				</p>
			</section>
		</InfoPageLayout>
	);
}
