import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/login/", "/sifre-sifirla/", "/email-dogrula/", "/api/"],
    },
    sitemap: "https://gunyayla.com.tr/sitemap.xml",
  }
}
