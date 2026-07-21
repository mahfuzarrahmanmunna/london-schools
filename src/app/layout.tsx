import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutProvider from "./provider/LayoutProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c79bf",
};

export const metadata: Metadata = {
  // ─── Basic SEO ────────────────────────────────
  title: {
    default:
      "London School of Higher Studies | CIPS Qualifications & Hospitality Courses",
    template: "%s | London School of Higher Studies",
  },
  description:
    "LSHS is a CIPS accredited centre in London offering internationally recognised Procurement & Supply Chain and Hospitality & Tourism Management qualifications from Level 2 to MCIPS.",
  keywords: [
    "CIPS courses London",
    "CIPS qualifications",
    "MCIPS",
    "procurement and supply",
    "hospitality management courses",
    "London School of Higher Studies",
    "CIPS Level 4 Diploma",
    "CIPS Level 6 Professional Diploma",
    "study procurement in London",
    "Sampan Group",
  ],
  authors: [
    { name: "London School of Higher Studies", url: "https://lshs.ac.uk" },
  ],
  creator: "London School of Higher Studies",
  publisher: "London School of Higher Studies",
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

  // ─── fav ──────────────────────────────────
  icons: {
    icon: [{ url: "/logo/fav.png", sizes: "any", type: "image/jpeg" }],
    shortcut: "/logo/fav.png",
    apple: [{ url: "/logo/fav.png", sizes: "180x180", type: "image/jpeg" }],
  },

  // ─── Open Graph (Facebook, LinkedIn, Discord…) ─
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://lshs.ac.uk",
    siteName: "London School of Higher Studies",
    title:
      "London School of Higher Studies | CIPS Qualifications & Hospitality Courses",
    description:
      "Internationally recognised Procurement & Supply Chain (CIPS) and Hospitality & Tourism Management qualifications in the heart of London.",
    images: [
      {
        url: "/logo/logo.webp",
        width: 1200,
        height: 630,
        alt: "London School of Higher Studies",
        type: "image/png",
      },
    ],
  },

  // ─── Twitter / X Card ─────────────────────────
  twitter: {
    card: "summary_large_image",
    title:
      "London School of Higher Studies | CIPS Qualifications & Hospitality Courses",
    description:
      "Internationally recognised Procurement & Supply Chain (CIPS) and Hospitality & Tourism Management qualifications in the heart of London.",
    images: ["/logo/logo.webp"],
    creator: "@LSHS_London",
  },

  // ─── Verification (add your real IDs) ────────
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },

  // ─── Alternates ───────────────────────────────
  alternates: {
    canonical: "https://lshs.ac.uk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Direct fav link for maximum browser compat */}
        <link rel="icon" href="/logo/fav.png" />
        <link rel="apple-touch-icon" href="/logo/fav.png" />

        {/* Preload sharing image for faster OG rendering */}
        <link rel="preload" href="/logo/logo.webp" as="image" type="image/png" />

        {/* Structured Data Educational Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "London School of Higher Studies",
              alternateName: "LSHS",
              url: "https://lshs.ac.uk",
              logo: "https://lshs.ac.uk/logo/logo.webp",
              description:
                "CIPS accredited centre offering internationally recognised Procurement & Supply Chain and Hospitality & Tourism Management qualifications.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123-125 Camden High Street",
                addressLocality: "London",
                postalCode: "NW1 7JH",
                addressCountry: "GB",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+44-20-1234-5678",
                contactType: "admissions",
                email: "info@lshs.ac.uk",
                availableLanguage: ["English"],
              },
              sameAs: [
                "https://www.facebook.com/lshslondon",
                "https://www.instagram.com/lshslondon",
                "https://www.linkedin.com/school/lshs-london",
                "https://x.com/LSHS_London",
              ],
              parentOrganization: {
                "@type": "Organization",
                name: "Sampan Group",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "CIPS Qualifications",
                itemListElement: [
                  {
                    "@type": "Course",
                    name: "Certificate in Procurement & Supply Operations",
                    courseCode: "CIPS-L2",
                    educationalLevel: "Beginner",
                  },
                  {
                    "@type": "Course",
                    name: "Advanced Certificate in Procurement & Supply Operations",
                    courseCode: "CIPS-L3",
                    educationalLevel: "Intermediate",
                  },
                  {
                    "@type": "Course",
                    name: "Diploma in Procurement & Supply",
                    courseCode: "CIPS-L4",
                    educationalLevel: "Advanced",
                  },
                  {
                    "@type": "Course",
                    name: "Advanced Diploma in Procurement & Supply",
                    courseCode: "CIPS-L5",
                    educationalLevel: "Advanced",
                  },
                  {
                    "@type": "Course",
                    name: "Professional Diploma in Procurement & Supply (MCIPS)",
                    courseCode: "CIPS-L6",
                    educationalLevel: "Expert",
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
