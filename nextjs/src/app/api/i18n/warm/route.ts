import { getPosts, getPost } from "@/lib/ghost"
import { translatePost, TARGET_LANGS } from "@/lib/translate"

export const dynamic = "force-dynamic"

// Yeni/önemli yazıları hedef dillere önceden çevirir (cache doldurur).
// Çağrı: POST /api/i18n/warm?limit=3&secret=...
export async function POST(req: Request) {
  const secret = process.env.I18N_WARM_SECRET
  const url = new URL(req.url)
  if (secret && url.searchParams.get("secret") !== secret) {
    return new Response("forbidden", { status: 403 })
  }
  const limit = Math.min(Math.max(parseInt(url.searchParams.get("limit") || "3", 10) || 3, 1), 8)

  const { posts } = await getPosts(1, limit)
  let translated = 0
  const errors: string[] = []
  for (const p of posts) {
    const full = await getPost(p.slug)
    if (!full) continue
    for (const lang of TARGET_LANGS) {
      try {
        await translatePost(full, lang)
        translated++
      } catch {
        errors.push(`${p.slug}/${lang}`)
      }
    }
  }
  return Response.json({ ok: true, posts: posts.length, translated, errors: errors.slice(0, 8) })
}
