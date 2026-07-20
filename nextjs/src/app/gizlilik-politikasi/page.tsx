import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Gizlilik Politikası | GünYayla",
  description: "GünYayla gizlilik politikası ve kişisel verilerin korunması hakkında bilgiler.",
}

export default function GizlilikPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gizlilik Politikası</h1>
      <p className="text-sm text-gray-500 mb-8">Son güncelleme: 25 Haziran 2026</p>

      <section className="space-y-6 text-gray-700 text-sm leading-relaxed">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">1. Veri Sorumlusu</h2>
          <p>GünYayla Haber Duyuru (gunyayla.com.tr) olarak kişisel verilerinizin güvenliğine önem vermekteyiz. İşbu gizlilik politikası, sitemizi ziyaret ettiğinizde hangi verilerin toplandığı, nasıl kullanıldığı ve hangi haklara sahip olduğunuz hakkında sizi bilgilendirmeyi amaçlar.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">2. Toplanan Veriler</h2>
          <p>Sitemizi ziyaret ettiğinizde aşağıdaki veriler otomatik olarak toplanabilir:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>IP adresiniz ve tarayıcı bilgileriniz</li>
            <li>Sayfa görüntüleme ve tıklama istatistikleriniz</li>
            <li>Çerezler (cookies) aracılığıyla kullanıcı tercihleri</li>
            <li>Haber bültenine abone olmanız durumunda e-posta adresiniz</li>
            <li>Siteye yorum yapmanız durumunda adınız ve e-posta adresiniz</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">3. Verilerin Kullanım Amaçları</h2>
          <p>Toplanan veriler aşağıdaki amaçlarla kullanılabilir:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Hizmetlerimizin sağlanması ve iyileştirilmesi</li>
            <li>Kullanıcı deneyiminin kişiselleştirilmesi</li>
            <li>Site trafiğinin ve kullanım istatistiklerinin analizi</li>
            <li>Haber bülteni gönderimi (onayınız dahilinde)</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">4. Çerezler (Cookies)</h2>
          <p>Sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır. Çerezler, tarayıcınız tarafından cihazınızda depolanan küçük metin dosyalarıdır. Çerez kullanımını tarayıcı ayarlarınızdan kontrol edebilir veya tamamen engelleyebilirsiniz. Ancak bazı çerezlerin devre dışı bırakılması, sitemizin bazı özelliklerinin çalışmamasına neden olabilir.</p>
          <p className="mt-2">Kullandığımız çerez türleri:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li><strong>Zorunlu Çerezler:</strong> Sitenin düzgün çalışması için gereklidir.</li>
            <li><strong>Analitik Çerezler:</strong> Ziyaretçi istatistiklerini anonim olarak toplar.</li>
            <li><strong>Reklam Çerezleri:</strong> Google AdSense tarafından ilgi alanına dayalı reklamlar göstermek için kullanılır.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">5. Google AdSense</h2>
          <p>Sitemiz, Google AdSense reklam hizmetini kullanmaktadır. Google, DART çerezleri aracılığıyla sitemizi ve diğer siteleri ziyaretinize dayalı olarak ilgi alanına dayalı reklamlar yayınlayabilir. Google'ın çerez kullanımı hakkında detaylı bilgiye <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Reklam ve Gizlilik sayfasından</a> ulaşabilirsiniz.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">6. Üçüncü Taraf Hizmetler</h2>
          <p>Sitemiz aşağıdaki üçüncü taraf hizmetlerini kullanmaktadır:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Google AdSense:</strong> Reklam yayıncılığı</li>
            <li><strong>Cloudflare:</strong> CDN ve güvenlik hizmetleri</li>
            <li><strong>Ghost CMS:</strong> İçerik yönetim sistemi</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">7. Verilerin Saklanması ve Güvenliği</h2>
          <p>Kişisel verileriniz, hizmetin doğası gereği gerekli olan süre boyunca güvenli sunucularda saklanır. Verilerinizin yetkisiz erişime, kayba veya ifşaya karşı korunması için gerekli teknik ve idari tedbirler alınmaktadır.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">8. Haklarınız</h2>
          <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenmişse bilgi talep etme</li>
            <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
            <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
            <li>Silinmesini veya yok edilmesini isteme</li>
            <li>İtiraz etme</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">9. İletişim</h2>
          <p>Gizlilik politikamız hakkında sorularınız veya talepleriniz için bizimle iletişime geçebilirsiniz:</p>
          <p className="mt-2">
            <strong>E-posta:</strong> info@gunyayla.com.tr<br />
          </p>
        </div>
      </section>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <Link href="/" className="text-primary hover:underline text-sm">← Ana Sayfaya Dön</Link>
      </div>
    </div>
  )
}
