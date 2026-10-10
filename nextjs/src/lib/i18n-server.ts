import { cookies } from 'next/headers'
import { getDictionary, normalizeLang, LANG_COOKIE, DEFAULT_LANG, type Lang, type Dictionary } from '@/lib/i18n'

export async function getServerLang(): Promise<Lang> {
  try {
    const c = await cookies()
    return normalizeLang(c.get(LANG_COOKIE)?.value)
  } catch {
    return DEFAULT_LANG
  }
}

export async function getServerDict(): Promise<Dictionary> {
  return getDictionary(await getServerLang())
}
