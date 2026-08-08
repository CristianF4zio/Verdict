import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_NAME, OPERATOR_NAME, CONTACT_EMAIL } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const copy = {
  en: {
    kicker: "Legal",
    title: "Privacy Policy",
    updated: "Last updated: August 6, 2026",
    sections: [
      {
        heading: "Who we are",
        body: [
          `${SITE_NAME} (the "site") is operated by ${OPERATOR_NAME}, based in Venezuela. This policy explains what information we collect when you visit the site, why we collect it, and the choices you have. Contact us at ${CONTACT_EMAIL} with any privacy question.`,
        ],
      },
      {
        heading: "Information we collect",
        body: [
          "We don't require an account to read this site, so we don't collect names, passwords, or payment details directly. The data we do collect falls into two categories:",
          "Analytics data: through Google Analytics 4, Microsoft Clarity, and Vercel Analytics, we collect standard web analytics such as pages viewed, approximate location (country/region level), device and browser type, and referring site. Microsoft Clarity may also record anonymized session behavior (scrolling, clicks) to help us understand how the site is used.",
          "Affiliate click data: when you click a link to a product we review, we log the product slug, the page you clicked from, your selected language, and the referring URL in our database (hosted on Supabase), along with a timestamp. We do this to understand which reviews drive interest in which tools. We do not log your name, email, or IP address as part of this record.",
        ],
      },
      {
        heading: "Cookies and similar technologies",
        body: [
          "Google Analytics 4, Microsoft Clarity, and Vercel Analytics set cookies or use similar local storage to distinguish visitors and sessions. These are third-party analytics cookies, not strictly necessary for the site to function. You can block or delete these cookies through your browser settings at any time; doing so will not prevent you from reading site content.",
        ],
      },
      {
        heading: "How we use this information",
        body: [
          "We use analytics and click data to understand which content is useful, measure the performance of the affiliate reviews we publish, and improve the site over time. We do not use this data to build advertising profiles for third parties, and we do not sell it.",
        ],
      },
      {
        heading: "Who we share data with",
        body: [
          "We share data with the service providers that help us run the site: Google (Analytics), Microsoft (Clarity), Vercel (hosting and analytics), and Supabase (affiliate click database). When you click through to a product we review, the affiliate network or vendor for that product will also receive standard referral data as part of their own tracking. That exchange is governed by their privacy policy, not ours.",
        ],
      },
      {
        heading: "International data transfers",
        body: [
          "Our service providers may process data outside of your country of residence, including in the United States. Where required, these providers rely on standard contractual clauses or equivalent safeguards for cross-border transfers.",
        ],
      },
      {
        heading: "Data retention",
        body: [
          "Affiliate click records are retained for as long as they're useful for measuring site performance, typically no more than 24 months, after which they are deleted or aggregated. Analytics data retention is governed by the retention settings of each analytics provider.",
        ],
      },
      {
        heading: "Your rights under GDPR (EEA/UK visitors)",
        body: [
          "If you are located in the European Economic Area or the United Kingdom, you have the right to: access the personal data we hold about you, request correction or deletion, restrict or object to processing, request data portability, and lodge a complaint with your local data protection authority. Because we collect very little directly identifiable data, most requests can be resolved by asking us to clear analytics identifiers associated with your device. To exercise any of these rights, contact us at the email above.",
        ],
      },
      {
        heading: "Your rights under CCPA (California residents)",
        body: [
          "If you are a California resident, you have the right to know what personal information we collect, request its deletion, correct inaccurate information, and opt out of the sale or sharing of personal information. We do not sell or share personal information, as those terms are defined under the CCPA. We will not discriminate against you for exercising any of these rights.",
        ],
      },
      {
        heading: "Children's privacy",
        body: [
          "This site is not directed at children under 13, and we do not knowingly collect personal information from them.",
        ],
      },
      {
        heading: "Changes to this policy",
        body: [
          "We may update this policy as the site evolves. Material changes will be reflected by updating the date at the top of this page.",
        ],
      },
      {
        heading: "Contact",
        body: [`Questions about this policy can be sent to ${CONTACT_EMAIL}.`],
      },
    ],
  },
  es: {
    kicker: "Legal",
    title: "Política de Privacidad",
    updated: "Última actualización: 6 de agosto de 2026",
    sections: [
      {
        heading: "Quiénes somos",
        body: [
          `${SITE_NAME} (el "sitio") es operado por ${OPERATOR_NAME}, con sede en Venezuela. Esta política explica qué información recopilamos cuando visitas el sitio, por qué la recopilamos y qué opciones tienes. Escríbenos a ${CONTACT_EMAIL} ante cualquier consulta sobre privacidad.`,
        ],
      },
      {
        heading: "Qué información recopilamos",
        body: [
          "No hace falta crear una cuenta para leer este sitio, así que no recopilamos nombres, contraseñas ni datos de pago directamente. Los datos que sí recopilamos entran en dos categorías:",
          "Datos de analítica: a través de Google Analytics 4, Microsoft Clarity y Vercel Analytics, recopilamos analítica web estándar como páginas vistas, ubicación aproximada (a nivel país/región), tipo de dispositivo y navegador, y sitio de referencia. Microsoft Clarity también puede grabar comportamiento de sesión anonimizado (scroll, clics) para entender cómo se usa el sitio.",
          "Datos de clics en afiliados: cuando haces clic en un enlace hacia un producto que reseñamos, registramos el slug del producto, la página desde la que hiciste clic, tu idioma seleccionado y la URL de referencia en nuestra base de datos (alojada en Supabase), junto con una marca de tiempo. Hacemos esto para entender qué reseñas generan interés en qué herramientas. No registramos tu nombre, email ni dirección IP como parte de este registro.",
        ],
      },
      {
        heading: "Cookies y tecnologías similares",
        body: [
          "Google Analytics 4, Microsoft Clarity y Vercel Analytics configuran cookies o usan almacenamiento local similar para distinguir visitantes y sesiones. Son cookies de analítica de terceros, no estrictamente necesarias para el funcionamiento del sitio. Puedes bloquear o eliminar estas cookies desde la configuración de tu navegador en cualquier momento; hacerlo no te impedirá leer el contenido del sitio.",
        ],
      },
      {
        heading: "Cómo usamos esta información",
        body: [
          "Usamos los datos de analítica y de clics para entender qué contenido resulta útil, medir el desempeño de las reseñas de afiliados que publicamos, y mejorar el sitio con el tiempo. No usamos estos datos para armar perfiles publicitarios para terceros, y no los vendemos.",
        ],
      },
      {
        heading: "Con quién compartimos datos",
        body: [
          "Compartimos datos con los proveedores de servicios que nos ayudan a operar el sitio: Google (Analytics), Microsoft (Clarity), Vercel (hosting y analítica), y Supabase (base de datos de clics de afiliados). Cuando haces clic hacia un producto que reseñamos, la red de afiliados o el proveedor de ese producto también va a recibir datos de referencia estándar como parte de su propio seguimiento. Ese intercambio se rige por la política de privacidad de ellos, no por la nuestra.",
        ],
      },
      {
        heading: "Transferencias internacionales de datos",
        body: [
          "Nuestros proveedores de servicios pueden procesar datos fuera de tu país de residencia, incluyendo en Estados Unidos. Cuando corresponde, estos proveedores utilizan cláusulas contractuales estándar o garantías equivalentes para las transferencias transfronterizas.",
        ],
      },
      {
        heading: "Retención de datos",
        body: [
          "Los registros de clics de afiliados se conservan mientras sean útiles para medir el desempeño del sitio, generalmente no más de 24 meses, después de lo cual se eliminan o se agregan. La retención de datos de analítica depende de la configuración de cada proveedor.",
        ],
      },
      {
        heading: "Tus derechos bajo el GDPR (visitantes del EEE/Reino Unido)",
        body: [
          "Si te encuentras en el Espacio Económico Europeo o el Reino Unido, tienes derecho a: acceder a los datos personales que tenemos sobre ti, solicitar su corrección o eliminación, restringir u oponerte al procesamiento, solicitar portabilidad de datos, y presentar una queja ante tu autoridad local de protección de datos. Como recopilamos muy pocos datos directamente identificables, la mayoría de las solicitudes se resuelven pidiéndonos que borremos los identificadores de analítica asociados a tu dispositivo. Para ejercer cualquiera de estos derechos, escríbenos al email de arriba.",
        ],
      },
      {
        heading: "Tus derechos bajo el CCPA (residentes de California)",
        body: [
          "Si eres residente de California, tienes derecho a saber qué información personal recopilamos, solicitar su eliminación, corregir información inexacta, y optar por no participar en la venta o el intercambio de información personal. No vendemos ni compartimos información personal, según se define en el CCPA. No te vamos a discriminar por ejercer ninguno de estos derechos.",
        ],
      },
      {
        heading: "Privacidad de menores",
        body: [
          "Este sitio no está dirigido a menores de 13 años, y no recopilamos información personal de ellos a sabiendas.",
        ],
      },
      {
        heading: "Cambios a esta política",
        body: [
          "Podemos actualizar esta política a medida que el sitio evolucione. Los cambios importantes se van a reflejar actualizando la fecha en la parte superior de esta página.",
        ],
      },
      {
        heading: "Contacto",
        body: [`Las consultas sobre esta política se pueden enviar a ${CONTACT_EMAIL}.`],
      },
    ],
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: copy[locale as Locale].title };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = copy[locale as Locale];

  return (
    <div>
      <section className="mx-auto max-w-[760px] px-7 pb-10 pt-16">
        <div className="mb-6 font-mono text-[11px] uppercase tracking-wider text-muted">
          {t.kicker}
        </div>
        <h1 className="mb-4 text-[40px] font-medium leading-[0.98] tracking-[-0.04em] md:text-[56px]">
          {t.title}
        </h1>
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
          {t.updated}
        </p>
      </section>
      <section className="mx-auto max-w-[760px] px-7 pb-24">
        <div className="grid gap-12">
          {t.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="mb-3 text-[22px] font-medium tracking-[-0.02em]">
                {section.heading}
              </h2>
              <div className="grid max-w-[68ch] gap-4">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-[16px] leading-relaxed text-body"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
