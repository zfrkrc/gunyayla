import tr from '@/locales/tr.json'
import en from '@/locales/en.json'
import de from '@/locales/de.json'
import es from '@/locales/es.json'
import fr from '@/locales/fr.json'
import ru from '@/locales/ru.json'
import zh from '@/locales/zh.json'
import pt from '@/locales/pt.json'

export const LANGS = ['tr', 'en', 'de', 'es', 'fr', 'ru', 'zh', 'pt'] as const
export type Lang = (typeof LANGS)[number]
export const DEFAULT_LANG: Lang = 'tr'
export const LANG_COOKIE = 'lang'

export const LANG_LABELS: Record<Lang, string> = {
  tr: 'Türkçe', en: 'English', de: 'Deutsch', es: 'Español',
  fr: 'Français', ru: 'Русский', zh: '中文', pt: 'Português',
}

export type Dictionary = typeof tr
const DICTS: Record<Lang, Dictionary> = { tr, en, de, es, fr, ru, zh, pt }

export function isLang(v: unknown): v is Lang {
  return typeof v === 'string' && (LANGS as readonly string[]).includes(v)
}
export function normalizeLang(v: unknown): Lang {
  return isLang(v) ? v : DEFAULT_LANG
}
export function getDictionary(lang: unknown): Dictionary {
  return DICTS[normalizeLang(lang)]
}
