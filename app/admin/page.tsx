import Link from "next/link";
import { redirect } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Brand";
import { isAdmin, hasPreview } from "@/lib/auth";
import { AdminControls } from "./AdminControls";

export const metadata = { title: "Admin · SoliVana Sleep", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const ROUTES = [
  { href: "/", label: "Landing" },
  { href: "/cbt-i", label: "The Protocol" },
  { href: "/audio", label: "Audio Library" },
  { href: "/pricing", label: "Membership" },
  { href: "/science", label: "Science" },
  { href: "/begin", label: "Onboarding" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclosure", label: "Disclosure" },
];

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const preview = await hasPreview();

  // Env status — surfaced so the owner can see at a glance what's wired
  const envStatus = {
    resend: !!process.env.RESEND_API_KEY,
    admin: !!process.env.ADMIN_PASSWORD,
    preview: !!process.env.PREVIEW_CODE,
    makeNotify: !!process.env.MAKE_NOTIFY_WEBHOOK_URL,
  };

  return (
    <>
      <TopBar />
      <main id="main">
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex items-baseline justify-between flex-wrap gap-3 mb-2">
              <Eyebrow>Internal</Eyebrow>
              <span className="eyebrow text-amber">Admin</span>
            </div>
            <h1 className="font-sans text-bark text-3xl md:text-4xl font-light leading-tight">
              SoliVana Sleep · ops view
            </h1>
            <p className="mt-3 text-mid leading-relaxed max-w-prose">
              Where to look for leads, what&apos;s live, what&apos;s configured. The
              preview cookie below lets you exercise the product as a member
              would, without going through checkout.
            </p>

            <AdminControls previewActive={preview} />

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Leads */}
              <section className="card">
                <Eyebrow className="mb-2">Leads</Eyebrow>
                <h2 className="font-sans text-bark text-xl font-light mb-2">
                  Inbox + GHL
                </h2>
                <p className="text-sm text-mid leading-relaxed">
                  Every <code className="font-mono text-xs">/api/notify</code> submission
                  fans out two ways: an email to
                  {" "}<a href="mailto:info@solivana.com" className="text-bark underline hover:text-amber">info@solivana.com</a>
                  {" "}(subject prefix <code className="font-mono text-xs">[Sleep]</code>,
                  reply-to is the lead) and a Make.com webhook that creates the
                  GHL contact with tag <code className="font-mono text-xs">sleep-lead</code>{" "}
                  plus plan + struggle event tags.
                </p>
                <p className="mt-3 text-xs text-mid">
                  GHL is the source of truth. Inbox is the heads-up channel.
                  If <code className="font-mono text-xs">MAKE_NOTIFY_WEBHOOK_URL</code> is
                  missing the email still fires; the GHL push is silently skipped.
                </p>
              </section>

              {/* Environment */}
              <section className="card">
                <Eyebrow className="mb-2">Environment</Eyebrow>
                <h2 className="font-sans text-bark text-xl font-light mb-3">
                  What&apos;s configured
                </h2>
                <dl className="space-y-2 text-sm">
                  <EnvRow name="RESEND_API_KEY" set={envStatus.resend} />
                  <EnvRow name="ADMIN_PASSWORD" set={envStatus.admin} />
                  <EnvRow name="PREVIEW_CODE" set={envStatus.preview} />
                  <EnvRow name="MAKE_NOTIFY_WEBHOOK_URL" set={envStatus.makeNotify} />
                </dl>
                <p className="mt-4 text-xs text-mid">
                  Set in Railway → Sleep service → Variables.
                </p>
              </section>
            </div>

            {/* Route map */}
            <section className="mt-8 card">
              <Eyebrow className="mb-2">Routes</Eyebrow>
              <h2 className="font-sans text-bark text-xl font-light mb-4">
                Everything that&apos;s live
              </h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-2 text-sm">
                {ROUTES.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="text-bark hover:text-amber inline-flex items-center min-h-[36px]"
                    >
                      <span className="font-mono text-xs text-mid mr-2">{r.href}</span>
                      <span>{r.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function EnvRow({ name, set }: { name: string; set: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <code className="font-mono text-xs text-bark">{name}</code>
      <span
        className={`inline-flex items-center gap-2 text-xs font-display tracking-wider uppercase ${set ? "text-bark" : "text-amber"}`}
      >
        <span
          aria-hidden="true"
          className={`w-2 h-2 rounded-full ${set ? "bg-bark" : "bg-amber"}`}
        />
        {set ? "Set" : "Missing"}
      </span>
    </div>
  );
}
