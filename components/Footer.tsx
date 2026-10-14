import Link from "next/link";

// Compliance footer — shown on every page since sleep data + AI insights
// are health-adjacent. CCPA contact + educational-only disclosure.
export function Footer() {
  return (
    <footer className="mt-24 border-t border-bark/10 bg-warm">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <p className="eyebrow mb-2">SoliVana Sleep</p>
            <p className="text-mid leading-relaxed">
              Sleep therapy for executives whose nights stopped working. CBT-I,
              real-time audio, and circadian recovery — built by SoliVana Wellness.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2">Privacy</p>
            <p className="text-mid leading-relaxed">
              Sleep logs and audio sessions stay on your device unless you enable
              practitioner sync. Wearable data (Oura, Whoop, Apple Health) requires
              explicit consent at the moment of connection.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2">California (CCPA)</p>
            <p className="text-mid leading-relaxed">
              We don&apos;t sell your personal information. Email{" "}
              <a href="mailto:info@solivana.com?subject=Sleep%20Data%20Request" className="text-bark underline hover:text-amber">
                info@solivana.com
              </a>{" "}
              for access, correction, or deletion.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2">Disclosure</p>
            <p className="text-mid leading-relaxed">
              Educational interpretation only. CBT-I content is delivered as
              self-guided practice and is not a substitute for a clinical diagnosis
              of insomnia disorder. Consult a sleep specialist for severe or
              persistent symptoms.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-bark/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="eyebrow">Private. Restorative. Transformative.</p>
            <p className="mt-2 text-xs text-mid">
              SoliVana Wellness · Lutz, FL · &copy; {new Date().getFullYear()}
            </p>
          </div>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-mid">
            <Link href="/science" className="hover:text-amber min-h-[44px] inline-flex items-center">Science</Link>
            <Link href="/privacy" className="hover:text-amber min-h-[44px] inline-flex items-center">Privacy</Link>
            <Link href="/terms" className="hover:text-amber min-h-[44px] inline-flex items-center">Terms</Link>
            <Link href="/disclosure" className="hover:text-amber min-h-[44px] inline-flex items-center">AI &amp; Health Disclosure</Link>
            <a href="mailto:info@solivana.com" className="hover:text-amber min-h-[44px] inline-flex items-center">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
