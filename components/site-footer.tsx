"use client"

import * as React from "react"
import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
function IconTwitterX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Docs", href: "/docs" },
  { label: "Contact", href: "/#contact" },
]

const contactInfo = [
  { Icon: Mail, text: "hello@codecrafterscreators.com", href: "mailto:hello@codecrafterscreators.com" },
  { Icon: Phone, text: "+1 (800) 123-4567", href: "tel:+18001234567" },
  { Icon: MapPin, text: "Worldwide — Remote & On-site", href: "#" },
]

const socials = [
  { Icon: IconFacebook, href: "https://facebook.com" },
  { Icon: IconInstagram, href: "https://instagram.com" },
  { Icon: IconTwitterX, href: siteConfig.links.twitter },
  { Icon: IconLinkedin, href: "https://linkedin.com" },
]

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const [email, setEmail] = React.useState("")

  return (
    <footer className={cn("border-t border-white/[0.06] bg-[#050505] text-neutral-400", className)}>
      <div className="container mx-auto max-w-6xl px-4 pt-16 pb-8">

        {/* top grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* brand + newsletter */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Icons.logo className="h-6 w-6 text-indigo-400" />
              <span className="font-heading text-base font-bold text-white">{siteConfig.name}</span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-500 max-w-sm">
              Find everything you need to know about our digital services — web development,
              marketing, SEO, design, and more. One partner for your entire digital presence.
            </p>
            {/* newsletter */}
            <div>
              <p className="mb-3 text-sm font-semibold text-white">Stay Updated</p>
              <form
                className="flex gap-2"
                onSubmit={e => { e.preventDefault(); setEmail("") }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-indigo-500/40 transition-colors"
                />
                <button
                  type="submit"
                  className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-all hover:bg-neutral-200"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-2 text-xs text-neutral-600">
                By subscribing you agree to our{" "}
                <Link href="#" className="underline underline-offset-2 hover:text-neutral-400">Privacy Policy</Link>.
              </p>
            </div>
          </div>

          {/* quick links */}
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-widest text-white">Quick Links</p>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm transition-colors hover:text-white">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact info */}
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-widest text-white">Contact</p>
            <ul className="space-y-4">
              {contactInfo.map(({ Icon, text, href }) => (
                <li key={text}>
                  <a href={href} className="flex items-start gap-3 text-sm hover:text-white transition-colors">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                    {text}
                  </a>
                </li>
              ))}
            </ul>

            {/* social icons */}
            <div className="mt-8 flex gap-3">
              {socials.map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-400 transition-all hover:border-white/20 hover:bg-white/[0.07] hover:text-white">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="mt-12 h-px bg-white/[0.06]" />

        {/* bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-neutral-600">
            <Link href="#" className="hover:text-neutral-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-neutral-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-neutral-400 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
