import type { MetadataRoute } from "next";

// Static sitemap — handful of public routes. /begin is dynamic but
// indexable so crawlers can see the onboarding entry point.

const BASE = "https://sleep.solivana.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/cbt-i", "/audio", "/pricing", "/science", "/begin", "/privacy", "/terms", "/disclosure"];
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1.0 : path.startsWith("/begin") || path.startsWith("/pricing") ? 0.9 : 0.7,
  }));
}
