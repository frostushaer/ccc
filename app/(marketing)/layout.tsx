import Link from "next/link"
import { marketingConfig } from "@/config/marketing"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="dark flex min-h-screen flex-col bg-[#050505]">
      <header className="fixed top-0 z-50 w-full border-b border-white/[0.05] bg-[#050505]/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4">
          <MainNav items={marketingConfig.mainNav} />
          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex h-9 items-center rounded-full border border-white/20 px-5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/[0.05]"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="inline-flex h-9 items-center rounded-full bg-white px-5 text-sm font-bold text-black transition-all duration-200 hover:bg-neutral-100"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-16">{children}</main>

      <SiteFooter />
    </div>
  )
}
