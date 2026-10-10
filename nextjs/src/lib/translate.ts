import { db, postTranslations } from "@/lib/db"
import { eq, and } from "drizzle-orm"

// Kaynak dil Türkçe; hedef diller:
export const TARGET_LANGS = ["en", "de", "es", "fr", "ru", "zh", "pt"] as const
export const LANG_NAMES: Record<string, string> = {
  en: "English", de: "German", es: "Spanish", fr: "French",
  ru: "Russian", zh: "Simplified Chinese", pt: "Portuguese",
}

// Yerel LLM (VM) — gunyayla ollama'sı küçük olduğu için VM kullanılır.
const OLLAMA_URL = process.env.OLLAMA_TRANSLATE_URL || "http://172.16.16.99:11434"
const MODEL = process.env.OLLAMA_TRANSLATE_MODEL || "qwen2.5:14b"

async function llm(system: string, user: string): Promise<string> {
  const res = await fetch(OLLAMA_URL + "/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL, stream: false, options: { temperature: 0.2 },
      messages: [{ role: "system", content: system }, { role: "user", content: user }],
    }),
    signal: AbortSignal.timeout(180000),
  })
  const d: any = await res.json()
  return (d?.message?.content || "").trim()
}

function translateText(text: string | undefined, lang: string): Promise<string> {
  if (!text) return Promise.resolve(text || "")
  const name = LANG_NAMES[lang] || lang
  return llm(
    `You are a professional translator. Translate the Turkish text to ${name}. ` +
    `Output ONLY the translation, no quotes or notes. Keep brand names (GünYayla) and numbers.`,
    text,
  )
}

function translateHtml(html: string | undefined, lang: string): Promise<string> {
  if (!html) return Promise.resolve(html || "")
  const name = LANG_NAMES[lang] || lang
  return llm(
    `You are a professional translator. Translate the human-readable Turkish text inside the ` +
    `following HTML to ${name}. Preserve ALL HTML tags, attributes, class names, URLs and structure ` +
    `EXACTLY as they are; translate only the visible text. Output ONLY the resulting HTML.`,
    html,
  )
}

/** Post'u hedef dile çevirir (cache'li). tr ise aynen döner. */
export async function translatePost(post: any, lang: string): Promise<any> {
  if (!post || !lang || lang === "tr") return post
  const postId = String(post.id)

  // 1) Cache
  try {
    const rows = await db
      .select()
      .from(postTranslations)
      .where(and(eq(postTranslations.postId, postId), eq(postTranslations.lang, lang)))
      .limit(1)
    const c = rows[0]
    if (c && c.html) {
      return { ...post, title: c.title || post.title, excerpt: c.excerpt || post.excerpt, html: c.html }
    }
  } catch {
    // tablo yoksa/erişilemezse devam (best-effort)
  }

  // 2) Çevir
  let title = post.title, excerpt = post.excerpt, html = post.html
  try {
    ;[title, excerpt, html] = await Promise.all([
      translateText(post.title, lang),
      translateText(post.excerpt, lang),
      translateHtml(post.html, lang),
    ])
  } catch {
    return post // LLM erişilemezse kaynağı döndür
  }

  // 3) Cache'e yaz
  try {
    await db
      .insert(postTranslations)
      .values({ postId, lang, title, excerpt, html, sourceUpdatedAt: new Date() })
      .onConflictDoUpdate({
        target: [postTranslations.postId, postTranslations.lang],
        set: { title, excerpt, html, sourceUpdatedAt: new Date(), updatedAt: new Date() },
      })
  } catch {
    // yazamazsa da çeviriyi döndür
  }

  return { ...post, title: title || post.title, excerpt: excerpt || post.excerpt, html: html || post.html }
}
