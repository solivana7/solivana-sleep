import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Brand";

export const metadata = { title: "Privacy — SoliVana Sleep" };

export default function PrivacyPage() {
  return (
    <>
      <TopBar />
      <main id="main">
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6 prose-strong:text-bark prose-a:text-bark">
            <Eyebrow className="mb-3">Privacy</Eyebrow>
            <h1 className="font-sans text-bark text-3xl md:text-4xl font-light leading-tight">
              How we hold your sleep data.
            </h1>

            <div className="mt-8 space-y-6 text-mid leading-relaxed">
              <p>
                Sleep is health-adjacent. We treat it that way. The shortest version:
                your sleep logs and audio sessions stay on your device. Wearable data
                requires explicit consent at the moment of connection. We never sell
                personal information.
              </p>

              <h2 className="font-sans text-bark text-xl font-medium pt-4">What we collect</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>Email when you sign up. Used only for account recovery and one operational confirmation per week.</li>
                <li>Sleep log entries (time in bed, wake count, perceived quality). Stored in your browser by default; mirrored to your account only if you enable practitioner sync.</li>
                <li>Wearable data (Oura, Whoop, Apple Health, Garmin, Fitbit). Pulled only after you grant access via the provider&apos;s OAuth flow. Revocable from the wearable&apos;s app or from /settings.</li>
                <li>Audio playback events (which protocol, how long). Used to adapt the next session. Not joined to ad networks.</li>
              </ul>

              <h2 className="font-sans text-bark text-xl font-medium pt-4">What we don&apos;t do</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>We don&apos;t sell or trade personal information.</li>
                <li>We don&apos;t join sleep data to advertising identifiers.</li>
                <li>We don&apos;t share with insurance companies, employers, or wellness brokers without explicit per-disclosure consent.</li>
              </ul>

              <h2 className="font-sans text-bark text-xl font-medium pt-4">California (CCPA)</h2>
              <p>
                California residents may request access, correction, or deletion of any
                personal information tied to a SoliVana Sleep account. Email{" "}
                <a href="mailto:info@solivana.com?subject=CCPA%20Request" className="underline">
                  info@solivana.com
                </a>{" "}
                with the subject &quot;CCPA Request&quot; — we respond within 45 days.
              </p>

              <h2 className="font-sans text-bark text-xl font-medium pt-4">HIPAA-adjacent</h2>
              <p>
                SoliVana Sleep is a wellness application, not a Covered Entity under
                HIPAA. We treat connected wearable data with HIPAA-adjacent care:
                encrypted at rest, limited internal access, deletion on request.
              </p>

              <h2 className="font-sans text-bark text-xl font-medium pt-4">Contact</h2>
              <p>
                Privacy questions:{" "}
                <a href="mailto:info@solivana.com" className="underline">info@solivana.com</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
