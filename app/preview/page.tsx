import { redirect } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Brand";
import { hasPreview } from "@/lib/auth";
import { PreviewForm } from "./PreviewForm";

export const metadata = {
  title: "Preview · SoliVana Sleep",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

// User-facing preview entry. Accepts a `code` query param for one-click
// activation (forwarded to the GET route handler that can actually set
// cookies — server components can't), or falls through to a form for
// typed entry. On success, the cookie is set and the visitor is sent
// into the audio library — the same place a paying member lands first.

export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; invalid?: string }>;
}) {
  const sp = await searchParams;

  // One-click via URL: ?code=XXX → forward to the API route that can set the cookie
  if (sp.code) {
    redirect(`/api/preview/activate?code=${encodeURIComponent(sp.code)}`);
  }

  const alreadyIn = await hasPreview();
  const invalid = sp.invalid === "1";

  return (
    <>
      <TopBar />
      <main id="main">
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-md px-6">
            <Eyebrow className="mb-3">Preview access</Eyebrow>
            <h1 className="font-sans text-bark text-3xl md:text-4xl font-light leading-tight">
              {alreadyIn ? "You're already in." : "Open the protocol."}
            </h1>
            <p className="mt-3 text-mid leading-relaxed">
              {alreadyIn
                ? "Preview cookie is active. Head into the audio library or the protocol — everything's unlocked."
                : "Enter the shared code to unlock the full experience without going through checkout. The cookie lasts a year on this device."}
            </p>

            <div className="mt-8">
              {alreadyIn ? (
                <div className="flex flex-wrap gap-3">
                  <a href="/audio" className="btn-primary">
                    Open the audio library
                  </a>
                  <a href="/cbt-i" className="btn-secondary">
                    Read the protocol
                  </a>
                </div>
              ) : (
                <PreviewForm initialError={invalid ? "That code didn't match." : ""} />
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
