import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"
import { Navbar } from "@/components/ui/Navbar"
import { getSiteSettings } from "@/lib/ghost"
import { getServerLang } from "@/lib/i18n-server"
import { getDictionary } from "@/lib/i18n"

const BASE_URL = "https://gunyayla.com.tr"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const title = settings?.title || "GünYayla Haber"
  const description = settings?.description || "Güncel haberler ve galeri"
  const logo = settings?.logo || null

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: BASE_URL,
    },
    openGraph: {
      title,
      description,
      siteName: title,
      locale: "tr_TR",
      type: "website",
      url: BASE_URL,
      ...(logo ? { images: [{ url: logo, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(logo ? { images: [logo] } : {}),
    },
    other: {
      "google-adsense-account": "ca-pub-5393931574744627",
    },
  }
}

function darken(hex: string, amount: number) {
  const num = parseInt(hex.replace("#", ""), 16)
  const r = Math.max(0, (num >> 16) - amount)
  const g = Math.max(0, ((num >> 8) & 0xff) - amount)
  const b = Math.max(0, (num & 0xff) - amount)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  const siteTitle = settings?.title || "GünYayla"
  const siteDescription = settings?.description || "Güncel haberler, galeriler ve daha fazlası."
  const accentColor = settings?.accent_color || "#2563eb"
  const logo = settings?.logo || null
  const navigation = settings?.navigation || []
  const secondaryNav = settings?.secondary_navigation || []
  const lang = await getServerLang()
  const dict = getDictionary(lang)

  const cssVars = {
    "--color-primary": accentColor,
    "--color-primary-hover": darken(accentColor, 20),
    "--color-primary-light": accentColor + "1a",
    "--color-primary-dark": darken(accentColor, 60),
  } as React.CSSProperties

  return (
    <html lang={lang} style={cssVars}>
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar siteTitle={siteTitle} logo={logo} navigation={navigation} lang={lang} dict={dict.nav} />
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-3">{siteTitle}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{siteDescription}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-3">{dict.footer.pages}</h3>
                <ul className="space-y-1.5">
                  {navigation.length > 0 ? navigation.map((item: any) => (
                    <li key={item.url}>
                      <Link href={item.url} className="text-xs text-gray-500 hover:text-primary transition">{item.label}</Link>
                    </li>
                  )) : (
                    <>
                      <li><Link href="/" className="text-xs text-gray-500 hover:text-primary transition">{dict.nav.news}</Link></li>
                      <li><Link href="/koy" className="text-xs text-gray-500 hover:text-primary transition">{dict.nav.village}</Link></li>
                      <li><Link href="/galeri" className="text-xs text-gray-500 hover:text-primary transition">{dict.nav.gallery}</Link></li>
                      <li><Link href="/haberler" className="text-xs text-gray-500 hover:text-primary transition">{dict.nav.allNews}</Link></li>
                      <li><Link href="/reklam" className="text-xs text-gray-500 hover:text-primary transition">{dict.nav.advertise}</Link></li>
                    </>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-3">{dict.footer.categories}</h3>
                <ul className="space-y-1.5">
                  <li><Link href="/?tag=gundem" className="text-xs text-gray-500 hover:text-primary transition">{dict.footer.agenda}</Link></li>
                  <li><Link href="/?tag=spor" className="text-xs text-gray-500 hover:text-primary transition">{dict.footer.sports}</Link></li>
                  <li><Link href="/?tag=ekonomi" className="text-xs text-gray-500 hover:text-primary transition">{dict.footer.economy}</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-3">{dict.footer.contact}</h3>
                <ul className="space-y-1.5">
                  <li><span className="text-xs text-gray-500">info@gunyayla.com.tr</span></li>
                  <li><a href="tel:+905346636464" className="text-xs text-gray-500 hover:text-primary transition">+90 534 663 64 64</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} {siteTitle} — {dict.footer.rights}
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
