import type { MetadataRoute } from "next";
import { getAllContentPaths } from "@/lib/content";
import { CONTENT_TYPES } from "@/config/navigation";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.fischwiki.wiki";

  // Static paths that always exist; content-type entries stay in sync with CONTENT_TYPES
  const staticPaths = ["/", ...CONTENT_TYPES.map((ct) => `/${ct}`), "/privacy-policy", "/terms-of-service", "/copyright", "/about"];

  // Dynamic paths: scan actual MDX content files
  const contentPaths = await getAllContentPaths("en");
  const dynamicPaths = contentPaths.map((item) => `/${[item.contentType, ...item.slug].join("/")}`);

  const paths = [...staticPaths, ...dynamicPaths];

  const entries = routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? ("daily" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : CONTENT_TYPES.includes(path.slice(1)) ? 0.8 : 0.6,
    })),
  );

  // Canonical homepage at the site root (/, not only /<locale>)
  return [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    ...entries,
  ];
}
