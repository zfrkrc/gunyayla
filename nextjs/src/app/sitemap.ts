import { getPosts, getPages } from "@/lib/ghost"
import { MetadataRoute } from "next"

const BASE_URL = "https://gunyayla.com.tr"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "hourly", priority: 1.0 },
    { url: `${BASE_URL}/haberler`, changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE_URL}/galeri`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/hakkimizda`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/gizlilik-politikasi`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/reklam`, changeFrequency: "monthly", priority: 0.4 },
  ]

  let allPosts: any[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    const { posts, meta } = await getPosts(page, 100)
    if (!posts || posts.length === 0) {
      hasMore = false
    } else {
      allPosts = allPosts.concat(posts)
      const totalPages = meta?.pagination?.pages || 1
      hasMore = page < totalPages
      page++
    }
  }

  const articleUrls: MetadataRoute.Sitemap = allPosts.map((post: any) => ({
    url: `${BASE_URL}/haberler/${post.slug}`,
    lastModified: new Date(post.updated_at || post.published_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const pages = await getPages()
  const pageUrls: MetadataRoute.Sitemap = (pages || [])
    .filter((p: any) => p.slug !== "404")
    .map((p: any) => ({
      url: `${BASE_URL}/${p.slug}`,
      lastModified: new Date(p.updated_at || p.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))

  return [...staticPages, ...articleUrls, ...pageUrls]
}
