import { redirect } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Brand";
import { isAdmin } from "@/lib/auth";
import { AdminLoginForm } from "./LoginForm";

export const metadata = { title: "Admin · SoliVana Sleep", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <>
      <TopBar />
      <main id="main">
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-md px-6">
            <Eyebrow className="mb-3">Admin</Eyebrow>
            <h1 className="font-sans text-bark text-3xl font-light leading-tight">
              Sign in.
            </h1>
            <p className="mt-3 text-sm text-mid leading-relaxed">
              Single-user gate for the internal dashboard. The password lives
              in <code className="font-mono text-xs">ADMIN_PASSWORD</code> on
              Railway.
            </p>
            <div className="mt-8">
              <AdminLoginForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
