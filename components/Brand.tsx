import Link from "next/link";

// Single source of truth for the wordmark — Jost, sentence case ("SoliVana"),
// no [AI] pill (that pattern reads as a SaaS tell).
export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="font-display text-bark text-lg tracking-[0.04em] uppercase hover:text-amber transition-colors min-h-[44px] inline-flex items-center"
    >
      SoliVana <span className="ml-2 font-light">Sleep</span>
    </Link>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}
