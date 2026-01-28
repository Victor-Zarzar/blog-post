import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import env from "@/env.mjs";
import { routing } from "@/i18n/routing";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const translations: Record<
  string,
  { title: string; description: string; ogDescription: string }
> = {
  pt: {
    title: "TEN Blog | Comunidade Dev",
    description:
      "Blog sobre desenvolvimento de software com artigos, tutoriais e insights sobre programação, tecnologias, ferramentas, carreira e tendências no mundo dev.",
    ogDescription:
      "Artigos e tutoriais sobre desenvolvimento, programação e tecnologia para devs.",
  },
  en: {
    title: "TEN Blog | Dev Community",
    description:
      "Software development blog with articles, tutorials and insights about programming, technologies, tools, career and trends in the dev world.",
    ogDescription:
       "Articles and tutorials about development, programming and technology for devs.",
  },
  es: {
    title: "TEN Blog | Comunidade Dev",
    description:
      "Blog sobre desarrollo de software con artículos, tutoriales e insights sobre programación, tecnologías, herramientas, carrera y tendencias en el mundo dev.",
    ogDescription:
      "Artículos y tutoriales sobre desarrollo, programación y tecnología para devs.",
  },
};

const ogLocaleMap: Record<string, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = translations[locale] || translations.en;

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_WEBSITE_URL),
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.ogDescription,
      url: `${env.NEXT_PUBLIC_WEBSITE_URL}/${locale}`,
      siteName: "TEN Blog | Dev Community",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: ogLocaleMap[locale] ?? "en_US",
      type: "website",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "pt-BR": "/pt",
        "en-US": "/en",
        "es-ES": "/es",
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <ThemeProvider enableSystem={true} attribute="class">
        <NextIntlClientProvider>
          {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
