"use client"

import { useRouter } from "next/navigation"
import { LANGS, LANG_LABELS, LANG_COOKIE, type Lang } from "@/lib/i18n"

export default function LanguageSwitcher({ lang }: { lang: Lang }) {
  const router = useRouter()

  const choose = (l: string) => {
    document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`
    router.refresh()
  }

  return (
    <select
      aria-label="Dil / Language"
      defaultValue={lang}
      onChange={(e) => choose(e.target.value)}
      className="text-xs font-medium bg-transparent border border-gray-200 rounded-lg px-2 py-1 text-gray-600 cursor-pointer outline-none hover:text-primary"
    >
      {LANGS.map((code) => (
        <option key={code} value={code}>
          {LANG_LABELS[code] ?? code}
        </option>
      ))}
    </select>
  )
}
