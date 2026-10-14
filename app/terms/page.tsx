import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Brand";

export const metadata = { title: "Terms — SoliVana Sleep" };

export default function TermsPage() {
  return (
    <>
      <TopBar />
      <main id="main">
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <Eyebrow className="mb-3">Terms of use</Eyebrow>
            <h1 className="font-sans text-bark text-3xl md:text-4xl font-light leading-tight">
              The plain version.
            </h1>

            <div className="mt-8 space-y-6 text-mid leading-relaxed">
              <p>
                SoliVana Sleep is an educational sleep program operated by SoliVana
                Wellness. By using it, you agree to the following.
              </p>

              <h2 className="font-sans text-bark text-xl font-medium pt-2">Educational, not medical</h2>
              <p>
                The CBT-I content and the audio library are provided for educational
                self-guided practice. They are not a substitute for diagnosis or
                treatment of clinical insomnia disorder, sleep apnea, or any other
                medical condition. If you have severe or persistent sleep symptoms,
                consult a sleep specialist.
              </p>

              <h2 className="font-sans text-bark text-xl font-medium pt-2">Eligibility</h2>
              <p>
                You must be 18 or older. Sleep restriction therapy is not appropriate
                for people with bipolar disorder, untreated sleep apnea, or active
                psychosis — please use this tool only with clinical supervision in
                those cases.
              </p>

              <h2 className="font-sans text-bark text-xl font-medium pt-2">Refunds</h2>
              <p>
                The $99 program is refundable for 14 days, no questions asked. The
                $12.99 monthly membership cancels at any time and runs until the
                billing period ends.
              </p>

              <h2 className="font-sans text-bark text-xl font-medium pt-2">Limitation of liability</h2>
              <p>
                SoliVana provides this content as-is. We make no medical claims. To the
                extent permitted by law, our total liability is limited to the amount
                you paid in the prior twelve months.
              </p>

              <h2 className="font-sans text-bark text-xl font-medium pt-2">Contact</h2>
              <p>
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
