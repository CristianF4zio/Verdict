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
    title: "Affiliate Disclosure",
    updated: "Last updated: August 6, 2026",
    sections: [
      {
        heading: "This site contains affiliate links",
        body: [
          `${SITE_NAME} participates in affiliate marketing programs. This means that when you click certain links on this site and make a qualifying purchase or sign up for a service, we may earn a commission, at no additional cost to you. In some cases, we may receive a free trial, discount, or other consideration from a vendor in exchange for a review.`,
        ],
      },
      {
        heading: "Affiliate programs we participate in",
        body: [
          `We currently participate in affiliate programs for tools we review, including Kit (formerly ConvertKit), GetResponse, and other providers across the categories covered on this site: email marketing, course and membership platforms, automation tools, and business security/VPN services. This list may grow as we add new reviews. The disclosure above applies to every affiliate link on the site, regardless of whether the specific program is named here.`,
        ],
      },
      {
        heading: "How this affects our reviews",
        body: [
          "Our opinions are our own. We form them by testing the products we write about, and we do not accept payment in exchange for a positive review or a guaranteed ranking. Where a product has known limitations, we say so, whether or not we have an affiliate relationship with the vendor.",
        ],
      },
      {
        heading: "Identifying affiliate links",
        body: [
          "Affiliate links on this site are routed through internal /go/ links so we can track click activity. Outbound affiliate links are also marked with rel=\"sponsored\" per Google's guidelines for paid or affiliate content.",
        ],
      },
      {
        heading: "Questions",
        body: [
          `If you have questions about this disclosure, contact us at ${CONTACT_EMAIL}.`,
          `This site is operated by ${OPERATOR_NAME}.`,
        ],
      },
    ],
  },
  es: {
    kicker: "Legal",
    title: "Divulgación de Afiliados",
    updated: "Última actualización: 6 de agosto de 2026",
    sections: [
      {
        heading: "Este sitio contiene enlaces de afiliados",
        body: [
          `${SITE_NAME} participa en programas de marketing de afiliados. Esto significa que cuando haces clic en ciertos enlaces de este sitio y realizas una compra o te suscribes a un servicio, podemos recibir una comisión, sin costo adicional para ti. En algunos casos, podemos recibir una prueba gratuita, un descuento u otra compensación por parte de un proveedor a cambio de una reseña.`,
        ],
      },
      {
        heading: "Programas de afiliados en los que participamos",
        body: [
          `Actualmente participamos en programas de afiliados de herramientas que reseñamos, incluyendo Kit (antes ConvertKit), GetResponse, y otros proveedores dentro de las categorías cubiertas en este sitio: email marketing, plataformas de cursos y membresías, herramientas de automatización, y seguridad empresarial/VPN. Esta lista puede crecer a medida que agreguemos nuevas reseñas. La divulgación anterior aplica a todos los enlaces de afiliado del sitio, se mencione o no el programa específico acá.`,
        ],
      },
      {
        heading: "Cómo esto afecta nuestras reseñas",
        body: [
          "Nuestras opiniones son propias. Las formamos probando los productos sobre los que escribimos, y no aceptamos pagos a cambio de una reseña positiva o un ranking garantizado. Cuando un producto tiene limitaciones conocidas, lo decimos, tengamos o no una relación de afiliado con el proveedor.",
        ],
      },
      {
        heading: "Cómo identificar los enlaces de afiliado",
        body: [
          "Los enlaces de afiliado de este sitio pasan por enlaces internos /go/ para poder registrar la actividad de clics. Los enlaces salientes de afiliado también están marcados con rel=\"sponsored\" siguiendo las pautas de Google para contenido pago o de afiliados.",
        ],
      },
      {
        heading: "Preguntas",
        body: [
          `Si tienes preguntas sobre esta divulgación, escríbenos a ${CONTACT_EMAIL}.`,
          `Este sitio es operado por ${OPERATOR_NAME}.`,
        ],
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

export default async function AffiliateDisclosurePage({
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
