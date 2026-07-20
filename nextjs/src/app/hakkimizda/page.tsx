import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Hakkımızda | GünYayla",
  description: "GünYayla Haber Portalı - Yozgat ve bölge haberleri, güncel gelişmeler, galeri ve daha fazlası.",
}

export default function HakkimizdaPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Hakkımızda</h1>

      <section className="space-y-6 text-gray-700 text-sm leading-relaxed">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">GünYayla Nedir?</h2>
          <p>GünYayla, Yozgat ve çevre bölgelerden güncel haberleri, kültürel etkinlikleri, galerileri ve köy yaşamına dair içerikleri okuyucularına ulaştırmak amacıyla kurulmuş bağımsız bir haber portalıdır. Modern teknolojiler kullanılarak geliştirilen platformumuz, hızlı ve güvenilir haber akışı sunmayı hedeflemektedir.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Misyonumuz</h2>
          <p>Yozgat ve çevre illerdeki güncel gelişmeleri, kültürel zenginlikleri ve toplumsal olayları tarafsız, doğru ve hızlı bir şekilde okuyucularımıza aktarmak. Yerel haberlerin yanı sıra ülke ve dünya gündeminden de önemli gelişmeleri takipçilerimizle paylaşmaktayız.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Köyümüzün Tarihçesi</h2>
          <p>Günyayla Köyü'nün zengin tarihi hakkında detaylı bilgiye <Link href="/tarihce" className="text-primary hover:underline">Tarihçe sayfamızdan</Link> ulaşabilirsiniz.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">İletişim</h2>
          <p>Bizimle iletişime geçmek için:</p>
          <p className="mt-2">
            <strong>E-posta:</strong> info@gunyayla.com.tr<br />
            <strong>Telefon:</strong> +90 534 663 64 64
          </p>
        </div>
      </section>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <Link href="/" className="text-primary hover:underline text-sm">← Ana Sayfaya Dön</Link>
      </div>
    </div>
  )
}
