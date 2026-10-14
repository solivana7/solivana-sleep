import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Brand";

export default function NotFound() {
  return (
    <>
      <TopBar />
      <main id="main">
        <section className="py-24">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <Eyebrow className="inline-block mb-4">404</Eyebrow>
            <h1 className="font-sans text-bark text-4xl font-light leading-tight">
              The page you&apos;re looking for is asleep.
            </h1>
            <p className="mt-4 text-mid leading-relaxed">
              Try the protocol or the audio library — those are the two reasons most
              readers came in tonight.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/cbt-i" className="btn-primary">The Protocol</Link>
              <Link href="/audio" className="btn-secondary">Audio</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
