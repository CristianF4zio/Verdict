import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import {
  SITE_NAME,
  OPERATOR_NAME,
  OPERATOR_JURISDICTION_EN,
  OPERATOR_JURISDICTION_ES,
  CONTACT_EMAIL,
} from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const copy = {
  en: {
    kicker: "Legal",
    title: "Terms of Service",
    updated: "Last updated: August 6, 2026",
    sections: [
      {
        heading: "Acceptance of terms",
        body: [
          `By accessing ${SITE_NAME}, you agree to these Terms of Service. If you don't agree, please don't use the site.`,
        ],
      },
      {
        heading: "What this site is",
        body: [
          "This site publishes reviews, comparisons, and roundups of SaaS tools for creators and small teams. Content is informational and reflects our own testing and opinions at the time of publication. Software pricing, features, and availability change frequently. Always confirm current details on the vendor's own site before purchasing.",
        ],
      },
      {
        heading: "Not professional advice",
        body: [
          "Nothing on this site is professional, legal, financial, or security advice. Recommendations about business security or VPN tools, in particular, are general in nature and may not account for your specific risk profile or regulatory obligations. Consult a qualified professional for decisions that matter to your business.",
        ],
      },
      {
        heading: "Affiliate links",
        body: [
          "Many links on this site are affiliate links, meaning we may earn a commission if you make a purchase through them, at no extra cost to you. See our Affiliate Disclosure page for details.",
        ],
      },
      {
        heading: "Acceptable use",
        body: [
          "You agree not to misuse the site, for example by attempting to interfere with its normal operation, scraping content at scale without permission, or using it for any unlawful purpose.",
        ],
      },
      {
        heading: "Third-party links",
        body: [
          "This site links to third-party websites we don't control. We're not responsible for their content, policies, or practices. Review their terms and privacy policies independently.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "The text, design, and original graphics on this site are owned by us unless otherwise noted, and may not be reproduced without permission. Product names, logos, and trademarks mentioned belong to their respective owners.",
        ],
      },
      {
        heading: "Disclaimer of warranties",
        body: [
          'This site and its content are provided "as is," without warranties of any kind, express or implied, including accuracy, completeness, or fitness for a particular purpose.',
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          "To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of this site or reliance on its content, including losses related to a third-party product you purchased through a link on this site.",
        ],
      },
      {
        heading: "Changes to these terms",
        body: [
          "We may update these terms as the site evolves. Continued use of the site after changes are posted means you accept the updated terms.",
        ],
      },
      {
        heading: "Governing law",
        body: [
          `These terms are governed by the laws of ${OPERATOR_JURISDICTION_EN}, without regard to conflict-of-law principles. This site is operated by ${OPERATOR_NAME}.`,
        ],
      },
      {
        heading: "Contact",
        body: [`Questions about these terms can be sent to ${CONTACT_EMAIL}.`],
      },
    ],
  },
  es: {
    kicker: "Legal",
    title: "Términos de Servicio",
    updated: "Última actualización: 6 de agosto de 2026",
    sections: [
      {
        heading: "Aceptación de los términos",
        body: [
          `Al acceder a ${SITE_NAME}, aceptas estos Términos de Servicio. Si no estás de acuerdo, por favor no uses el sitio.`,
        ],
      },
      {
        heading: "Qué es este sitio",
        body: [
          "Este sitio publica reseñas, comparativas y recopilaciones de herramientas SaaS para creadores y equipos pequeños. El contenido es informativo y refleja nuestras propias pruebas y opiniones al momento de la publicación. Los precios, funciones y disponibilidad del software cambian con frecuencia. Confirma siempre los detalles actuales en el sitio oficial del proveedor antes de comprar.",
        ],
      },
      {
        heading: "No es asesoría profesional",
        body: [
          "Nada en este sitio constituye asesoría profesional, legal, financiera o de seguridad. Las recomendaciones sobre herramientas de seguridad empresarial o VPN, en particular, son de carácter general y pueden no contemplar tu perfil de riesgo específico ni tus obligaciones regulatorias. Consulta a un profesional calificado para decisiones que sean importantes para tu negocio.",
        ],
      },
      {
        heading: "Enlaces de afiliado",
        body: [
          "Muchos enlaces de este sitio son de afiliado, lo que significa que podemos ganar una comisión si compras a través de ellos, sin costo adicional para ti. Consulta nuestra página de Divulgación de Afiliados para más detalles.",
        ],
      },
      {
        heading: "Uso aceptable",
        body: [
          "Aceptas no hacer un mal uso del sitio, por ejemplo intentando interferir con su funcionamiento normal, extrayendo contenido a gran escala sin permiso, o usándolo con fines ilegales.",
        ],
      },
      {
        heading: "Enlaces a terceros",
        body: [
          "Este sitio enlaza a sitios web de terceros que no controlamos. No somos responsables de su contenido, políticas o prácticas. Revisa sus términos y políticas de privacidad de forma independiente.",
        ],
      },
      {
        heading: "Propiedad intelectual",
        body: [
          "El texto, diseño y gráficos originales de este sitio nos pertenecen salvo que se indique lo contrario, y no pueden reproducirse sin permiso. Los nombres de productos, logos y marcas mencionados pertenecen a sus respectivos dueños.",
        ],
      },
      {
        heading: "Renuncia de garantías",
        body: [
          "Este sitio y su contenido se proporcionan \"tal cual\", sin garantías de ningún tipo, expresas o implícitas, incluyendo exactitud, integridad o idoneidad para un propósito particular.",
        ],
      },
      {
        heading: "Limitación de responsabilidad",
        body: [
          "En la máxima medida permitida por la ley, no somos responsables por daños indirectos, incidentales o consecuentes derivados del uso de este sitio o de confiar en su contenido, incluyendo pérdidas relacionadas con un producto de terceros comprado a través de un enlace de este sitio.",
        ],
      },
      {
        heading: "Cambios a estos términos",
        body: [
          "Podemos actualizar estos términos a medida que el sitio evolucione. El uso continuado del sitio después de publicados los cambios implica que aceptas los términos actualizados.",
        ],
      },
      {
        heading: "Ley aplicable",
        body: [
          `Estos términos se rigen por las leyes de ${OPERATOR_JURISDICTION_ES}, sin considerar principios de conflicto de leyes. Este sitio es operado por ${OPERATOR_NAME}.`,
        ],
      },
      {
        heading: "Contacto",
        body: [`Las consultas sobre estos términos se pueden enviar a ${CONTACT_EMAIL}.`],
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

export default async function TermsPage({
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
