import Link from "next/link";
import { Wordmark } from "./Brand";

const NAV = [
  { href: "/cbt-i", label: "The Protocol" },
  { href: "/audio", label: "Audio" },
  { href: "/science", label: "Science" },
  { href: "/pricing", label: "Membership" },
];

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-warm/80 border-b border-bark/10">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between gap-4">
        <Wordmark />
        <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm text-bark/80 hover:text-amber transition-colors min-h-[44px] inline-flex items-center"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/audio" className="btn-primary" aria-label="Open tonight's audio library">
            Tonight&apos;s audio
          </Link>
          {/* Mobile menu — native <details> disclosure pattern: keyboard-
              accessible, screen-reader-friendly, no JS state needed. */}
          <details className="md:hidden relative group">
            <summary
              aria-label="Open menu"
              className="list-none cursor-pointer min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-md border border-bark/15 px-2 text-bark hover:border-amber hover:text-amber transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path className="group-open:hidden" d="M3 6h16M3 11h16M3 16h16" />
                <path className="hidden group-open:block" d="M5 5l12 12M17 5L5 17" />
              </svg>
              <span className="sr-only">Menu</span>
            </summary>
            <nav
              aria-label="Mobile primary"
              className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-bark/10 bg-white shadow-elevated p-2 z-50"
            >
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="block px-3 py-3 text-bark hover:bg-warm hover:text-amber rounded-md text-sm min-h-[44px]"
                >
                  {n.label}
                </Link>
              ))}
              <hr className="my-1 border-bark/10" />
              <Link
                href="/begin"
                className="block px-3 py-3 text-bark hover:bg-warm hover:text-amber rounded-md text-sm min-h-[44px]"
              >
                Begin
              </Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
