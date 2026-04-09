import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"
import type { Metadata } from "next"
import type { Viewport } from "next"

import "@/styles/globals.css"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Web development agency",
    "Digital marketing",
    "SEO services",
    "Website design",
    "Code Crafters Creators",
  ],
  authors: [
    {
      name: "Code Crafters Creators",
      url: "https://codecrafterscreators.com",
    },
  ],
  creator: "Code Crafters Creators",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@codecrafterscreators",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({ children }: RootLayoutProps) {
  const hydrationSanitizer = `(() => {
    if (window.__cccHydrationSanitizerInstalled) return
    window.__cccHydrationSanitizerInstalled = true

    const shouldStrip = (name) =>
      name === "bis_skin_checked" ||
      name === "bis_register" ||
      name.startsWith("__processed_")

    const stripAttributes = (root) => {
      const nodes = [root, ...root.querySelectorAll("*")]
      for (const el of nodes) {
        if (!el || !el.getAttributeNames) continue
        for (const attr of el.getAttributeNames()) {
          if (shouldStrip(attr)) el.removeAttribute(attr)
        }
      }
    }

    stripAttributes(document.documentElement)

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.target instanceof Element) {
          const name = mutation.attributeName
          if (name && shouldStrip(name)) {
            mutation.target.removeAttribute(name)
          }
        }

        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof Element) stripAttributes(node)
          })
        }
      }
    })

    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
    })
  })();`

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: hydrationSanitizer }} />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Analytics />
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
