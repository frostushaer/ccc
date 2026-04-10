"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Globe,
  TrendingUp,
  Search,
  Palette,
  Smartphone,
  PenTool,
  ChevronDown,
  Check,
  Star,
} from "lucide-react"

const ease = [0.25, 0.46, 0.45, 0.94] as const
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.6, ease },
  }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

const marqueeItems = [
  "Next.js","React","TypeScript","Node.js","Tailwind CSS",
  "Google Ads","Meta Ads","Shopify","WordPress","Figma",
  "Next.js","React","TypeScript","Node.js","Tailwind CSS",
  "Google Ads","Meta Ads","Shopify","WordPress","Figma",
]

const bentoFeatures = [
  { id:"web", tag:"Development", Icon:Globe, title:"Custom Web Development", desc:"High-performance websites and web apps built with Next.js, React, and modern stacks — fast, secure, and scalable.", wide:true, accent:"#6366f1" },
  { id:"marketing", tag:"Marketing", Icon:TrendingUp, title:"Digital Marketing Campaigns", desc:"Data-driven paid campaigns across Google, Meta, YouTube, and LinkedIn that drive qualified traffic and revenue.", wide:false, accent:"#8b5cf6" },
  { id:"seo", tag:"SEO", Icon:Search, title:"Search Engine Optimization", desc:"Technical SEO audits, on-page optimization, authority building, and keyword strategies that rank and convert.", wide:false, accent:"#06b6d4" },
  { id:"design", tag:"Design", Icon:Palette, title:"UI / UX Design", desc:"Pixel-perfect interfaces backed by user research — Figma prototypes to production-ready code.", wide:true, accent:"#ec4899" },
  { id:"social", tag:"Social", Icon:Smartphone, title:"Social Media Management", desc:"Content calendars, community management, and paid social that build brand presence and grow your audience.", wide:false, accent:"#f59e0b" },
  { id:"content", tag:"Content", Icon:PenTool, title:"Content Creation", desc:"Compelling copy, long-form articles, scripts, and multimedia that tell your brand story and drive engagement.", wide:false, accent:"#10b981" },
]

const steps = [
  { n:"01", title:"Book a Free Strategy Call", desc:"Tell us about your business, goals, and timeline. We'll identify the biggest growth levers and outline a custom action plan." },
  { n:"02", title:"We Build & Execute", desc:"Our team of developers, designers, and marketers gets to work. Weekly progress reports keep you in the loop at every step." },
  { n:"03", title:"Watch Your Business Grow", desc:"Launch, optimise, and scale. We monitor performance metrics and continuously improve to maximise your ROI." },
]

const stats = [
  { value:"150+", label:"Projects Delivered", sub:"Across industries worldwide" },
  { value:"98%", label:"Client Satisfaction", sub:"Clients keep coming back" },
  { value:"5×", label:"Average ROI", sub:"Measurable revenue growth" },
  { value:"8+", label:"Years Experience", sub:"In digital & development" },
]

const testimonials = [
  { stars:5, tag:"Business Growth", quote:"Code Crafters rebuilt our entire digital presence — new website, SEO strategy, and paid ads. Revenue is up 3× in six months. Absolutely outstanding team.", name:"Arjun Mehta", role:"Founder, TechBridge Solutions" },
  { stars:5, tag:"Increased Traffic", quote:"Their SEO work took us from page 5 to position 2 for our core keywords. The organic leads we get now far exceed any paid channel we'd tried before.", name:"Priya Sharma", role:"Head of Marketing, GreenNest" },
  { stars:5, tag:"E-Commerce", quote:"The Shopify redesign and Meta ads campaign delivered a 4.8× ROAS in the first month. We've extended the contract indefinitely.", name:"Rohan Verma", role:"E-Commerce Director, UrbanCart" },
  { stars:5, tag:"Brand Identity", quote:"From brand identity to a full web app, CCC handled everything with precision. Feedback from our users has been phenomenal since launch.", name:"Sneha Kapoor", role:"CEO, DesignPulse Studio" },
]

const faqs = [
  { q:"What services does Code Crafters Creators offer?", a:"We offer end-to-end digital services: custom web development, digital marketing campaigns (Google, Meta, LinkedIn), SEO optimization, UI/UX design, social media management, and content creation." },
  { q:"How long does a typical project take?", a:"A standard marketing website takes 3–5 weeks. A complex web application takes 8–16 weeks. We scope every project during the strategy call and give you a precise timeline before we begin." },
  { q:"Do you offer maintenance and ongoing support?", a:"Yes. Every project delivery includes a 30-day free bug-fix window. After that, we offer flexible monthly retainer packages for ongoing development, SEO, and marketing." },
  { q:"Can you work with my existing website?", a:"Absolutely. We regularly audit, redesign, and optimise existing sites across WordPress, Shopify, Webflow, and custom stacks without requiring a full rebuild." },
  { q:"What makes Code Crafters Creators different?", a:"We combine a senior technical team with data-driven marketing expertise under one roof. You get one partner instead of juggling multiple agencies." },
]

function DashboardMock() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 shadow-2xl">
      <div className="mb-4 flex items-center gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <div className="ml-3 h-4 w-48 rounded bg-white/5" />
      </div>
      <div className="flex gap-3">
        <div className="flex w-[100px] flex-col gap-2 shrink-0">
          {["Dashboard","Projects","Clients","Analytics","Settings"].map(l => (
            <div key={l} className={`flex h-7 items-center gap-2 rounded-lg px-2 ${l==="Dashboard"?"bg-indigo-500/20 border border-indigo-500/30":""}`}>
              <div className={`h-2 w-2 rounded-full ${l==="Dashboard"?"bg-indigo-400":"bg-white/20"}`} />
              <div className={`h-2 flex-1 rounded ${l==="Dashboard"?"bg-white/60":"bg-white/15"}`} />
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-2.5">
          <div className="grid grid-cols-3 gap-2">
            {[["Web Projects","#6366f1"],["Campaigns","#8b5cf6"],["SEO Rank","#06b6d4"]].map(([label, color]) => (
              <div key={label as string} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
                <div className="mb-1.5 h-1.5 w-8 rounded" style={{ background: color as string }} />
                <div className="h-5 w-10 rounded bg-white/60" />
                <div className="mt-1 h-2 w-14 rounded bg-white/20" />
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
            <div className="mb-2 h-2 w-20 rounded bg-white/30" />
            <div className="flex items-end gap-1 h-16">
              {[40,65,45,80,55,90,70,85,60,95,75].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm"
                  style={{ height:`${h}%`, background:"linear-gradient(180deg,#6366f1 0%,#8b5cf620 100%)", opacity:0.7+i*0.03 }} />
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            {[85,55,72].map((w,i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-white/10" />
                <div className="h-2 rounded bg-white/20" style={{width:`${w}%`}}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function IndexPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="relative overflow-x-hidden bg-[#050505] text-white">

      {/* HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-32 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-1/4 h-[600px] w-[500px] rounded-full"
            style={{ background:"radial-gradient(circle, rgba(239,68,68,0.12) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)", filter:"blur(80px)" }} />
          <div className="absolute -right-32 top-1/3 h-[600px] w-[500px] rounded-full"
            style={{ background:"radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(99,102,241,0.08) 40%, transparent 70%)", filter:"blur(80px)" }} />
          <div className="absolute inset-0"
            style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize:"60px 60px" }} />
        </div>

        <motion.div aria-hidden animate={{ y:[0,-14,0], rotate:[0,8,0] }} transition={{ repeat:Infinity, duration:6, ease:"easeInOut" }}
          className="pointer-events-none absolute left-[6%] top-[22%] hidden lg:block">
          <div className="h-20 w-20 rounded-2xl border border-white/10"
            style={{ background:"linear-gradient(135deg,#ec4899,#8b5cf6,#6366f1)", opacity:0.85, boxShadow:"0 16px 48px rgba(139,92,246,0.35)" }} />
        </motion.div>
        <motion.div aria-hidden animate={{ y:[0,12,0], rotate:[0,-8,0] }} transition={{ repeat:Infinity, duration:7, ease:"easeInOut", delay:0.8 }}
          className="pointer-events-none absolute right-[7%] top-[28%] hidden lg:block">
          <div className="h-16 w-16 rounded-2xl border border-white/10"
            style={{ background:"linear-gradient(135deg,#6366f1,#06b6d4)", opacity:0.8, boxShadow:"0 12px 40px rgba(99,102,241,0.35)" }} />
        </motion.div>
        <motion.div aria-hidden animate={{ y:[0,-10,0] }} transition={{ repeat:Infinity, duration:5, ease:"easeInOut", delay:1.2 }}
          className="pointer-events-none absolute left-[15%] bottom-[28%] hidden xl:block">
          <div className="h-12 w-12 rounded-xl border border-white/10"
            style={{ background:"linear-gradient(135deg,#f59e0b,#ef4444)", opacity:0.75, boxShadow:"0 8px 30px rgba(245,158,11,0.3)" }} />
        </motion.div>
        <motion.div aria-hidden animate={{ y:[0,10,0] }} transition={{ repeat:Infinity, duration:8, ease:"easeInOut", delay:0.4 }}
          className="pointer-events-none absolute right-[14%] bottom-[30%] hidden xl:block">
          <div className="h-14 w-14 rounded-xl border border-white/10"
            style={{ background:"linear-gradient(135deg,#10b981,#06b6d4)", opacity:0.75, boxShadow:"0 8px 30px rgba(16,185,129,0.3)" }} />
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex max-w-5xl flex-col items-center gap-6">
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-2 text-xs font-medium text-neutral-300 backdrop-blur-md">
            <span className="rounded-sm bg-gradient-to-r from-indigo-500 to-purple-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">New</span>
            Introducing Code Crafters Creators — Your Complete Digital Partner
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1}
            className="font-heading text-5xl font-bold leading-[1.06] tracking-tight sm:text-6xl md:text-7xl lg:text-[5rem]">
            From Strategy to Scale,<br />
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage:"linear-gradient(90deg,#a78bfa 0%,#60a5fa 50%,#38bdf8 100%)" }}>
              We Build Digital Brands
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className="max-w-[42rem] text-lg leading-relaxed text-neutral-400">
            From stunning custom websites to full-scale digital marketing campaigns —
            Code Crafters Creators delivers measurable growth for businesses worldwide.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/register"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-100 hover:shadow-[0_0_32px_rgba(255,255,255,0.2)]">
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/register"
              className="inline-flex h-12 items-center rounded-full border border-white/20 bg-white/[0.04] px-7 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08]">
              Sign Up For Free
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} custom={4} className="flex items-center gap-3 text-sm text-neutral-500">
            <div className="flex -space-x-2.5">
              {["🧑‍💻","👩‍🎨","👨‍📈","🧑‍🔬","👩‍💼"].map((e,i) => (
                <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-neutral-800 text-sm ring-2 ring-[#050505]">{e}</div>
              ))}
            </div>
            <span>Trusted by <strong className="font-semibold text-white">150+ businesses</strong> worldwide</span>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity:0, y:60 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.9, duration:0.9, ease }}
          className="relative mt-16 w-full max-w-4xl px-4">
          <div aria-hidden className="pointer-events-none absolute -inset-4 rounded-3xl"
            style={{ background:"radial-gradient(ellipse 80% 50% at 50% 100%, rgba(99,102,241,0.15), transparent)", filter:"blur(24px)" }} />
          <DashboardMock />
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-6">
        <p className="mb-5 text-center text-xs font-bold uppercase tracking-widest text-neutral-500">
          Technologies &amp; Platforms We Master
        </p>
        <div className="flex select-none gap-10 whitespace-nowrap" style={{ animation:"marquee 30s linear infinite" }}>
          {marqueeItems.concat(marqueeItems).map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500/60" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURES BENTO */}
      <section id="services" className="relative px-4 py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-80px" }}
            className="mb-16 flex flex-col items-center text-center">
            <motion.p variants={fadeUp} className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-400">What We Do</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Three Clicks. One Partner.<br />Unlimited Growth.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-5 max-w-xl text-neutral-400">
              Expert digital services that cover every angle — development, design, marketing, and beyond. All under one roof.
            </motion.p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-40px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bentoFeatures.map(({ id, tag, Icon, title, desc, wide, accent }, i) => (
              <motion.div key={id} variants={fadeUp} custom={i}
                className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 ${wide?"lg:col-span-2":""}`}
                style={{ backdropFilter:"blur(12px)" }}>
                <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background:`radial-gradient(circle at 30% 20%, ${accent}14, transparent 60%)` }} />
                <div className="absolute left-0 top-0 h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-full"
                  style={{ background:`linear-gradient(90deg, ${accent}, transparent)` }} />
                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full border px-2.5 py-0.5 text-[11px] font-semibold"
                      style={{ borderColor:`${accent}40`, color:accent, background:`${accent}10` }}>{tag}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                      <Icon className="h-5 w-5" style={{ color:accent }} />
                    </div>
                  </div>
                  <h3 className="mb-2.5 text-lg font-bold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">{desc}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold" style={{ color:accent }}>
                    Learn more <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="work" className="relative px-4 py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10"
          style={{ background:"radial-gradient(ellipse 70% 50% at 50% 50%, rgba(99,102,241,0.05), transparent)" }} />
        <div className="mx-auto max-w-6xl">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-80px" }}
            className="mb-16 flex flex-col items-center text-center">
            <motion.p variants={fadeUp} className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-400">How It Works</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Choose your plan, and we&apos;ll handle the rest.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-5 max-w-xl text-neutral-400">
              Get started in under 24 hours — no technical know-how required.
            </motion.p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map(({ n, title, desc }, i) => (
              <motion.div key={n}
                initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ delay:i*0.15, duration:0.65, ease }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-8"
                style={{ backdropFilter:"blur(12px)" }}>
                <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background:"radial-gradient(circle at 20% 30%, rgba(99,102,241,0.08), transparent 60%)" }} />
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10">
                  <span className="font-heading text-sm font-bold text-indigo-400">{n}</span>
                </div>
                <div className="mb-6 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <div className="space-y-2">
                    <div className="h-2 w-3/4 rounded bg-white/15" />
                    <div className="h-2 w-1/2 rounded bg-white/10" />
                    <div className="mt-3 flex gap-2">
                      {["bg-indigo-500/40","bg-purple-500/40","bg-sky-500/40"].map(c => (
                        <div key={c} className={`h-7 flex-1 rounded-lg ${c}`} />
                      ))}
                    </div>
                    <div className="mt-2 h-16 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-white/[0.05]" />
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-neutral-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025]" style={{ backdropFilter:"blur(20px)" }}>
            <div className="grid divide-y divide-white/[0.05] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
              {stats.map(({ value, label, sub }, i) => (
                <motion.div key={label}
                  initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }}
                  transition={{ delay:i*0.1, duration:0.6, ease }}
                  className="flex flex-col items-center py-12 text-center sm:py-14 border-b border-white/[0.05] lg:border-b-0">
                  <span className="font-heading text-4xl font-bold md:text-5xl bg-clip-text text-transparent"
                    style={{ backgroundImage:"linear-gradient(180deg,#ffffff 0%,#9ca3af 100%)" }}>
                    {value}
                  </span>
                  <span className="mt-2.5 font-semibold text-white text-sm">{label}</span>
                  <span className="mt-1 text-xs text-neutral-500">{sub}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative px-4 py-28 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-80px" }}
            className="mb-16 flex flex-col items-center text-center">
            <motion.p variants={fadeUp} className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-400">Testimonials</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Real results from real clients
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-5 max-w-xl text-neutral-400">
              Real experiences from teams who depend on Code Crafters Creators to stay ahead — delivering on time and scaling with confidence.
            </motion.p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map(({ stars, tag, quote, name, role }, i) => (
              <motion.div key={name} variants={fadeUp} custom={i}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
                style={{ backdropFilter:"blur(12px)" }}>
                <div aria-hidden className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background:"radial-gradient(circle, rgba(99,102,241,0.12), transparent)", filter:"blur(12px)" }} />
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length:stars }).map((_,si) => (
                      <Star key={si} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold text-neutral-300">{tag}</span>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-neutral-300">&ldquo;{quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-xs font-bold text-white">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-[11px] text-neutral-500">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative px-4 py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10"
          style={{ background:"radial-gradient(ellipse 60% 40% at 50% 50%, rgba(99,102,241,0.05), transparent)" }} />
        <div className="mx-auto max-w-3xl">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-80px" }}
            className="mb-14 flex flex-col items-center text-center">
            <motion.p variants={fadeUp} className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-400">FAQ</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Everything you need to know
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-5 max-w-xl text-neutral-400">
              About Code Crafters Creators, our services, and how we work.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" variants={stagger} viewport={{ once:true }} className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]"
                style={{ backdropFilter:"blur(12px)" }}>
                <button className="flex w-full items-center justify-between p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-white pr-4">{q}</span>
                  <motion.div animate={{ rotate:openFaq === i ? 180 : 0 }} transition={{ duration:0.25 }}>
                    <ChevronDown className="h-5 w-5 shrink-0 text-neutral-400" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div key="content"
                      initial={{ height:0, opacity:0 }}
                      animate={{ height:"auto", opacity:1 }}
                      exit={{ height:0, opacity:0 }}
                      transition={{ duration:0.3, ease }}>
                      <p className="px-6 pb-6 text-sm leading-relaxed text-neutral-400">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="relative px-4 py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.7, ease }}
            className="relative overflow-hidden rounded-3xl border border-white/[0.08] px-8 py-20 text-center md:px-16"
            style={{ background:"linear-gradient(135deg,rgba(99,102,241,0.08) 0%,rgba(139,92,246,0.05) 50%,rgba(255,255,255,0.02) 100%)", backdropFilter:"blur(24px)" }}>
            <div aria-hidden className="pointer-events-none absolute inset-0"
              style={{ background:"radial-gradient(ellipse 80% 60% at 50% 80%, rgba(99,102,241,0.1), transparent)" }} />

            <motion.div aria-hidden animate={{ y:[0,-12,0], rotate:[0,10,0] }} transition={{ repeat:Infinity, duration:5, ease:"easeInOut" }}
              className="pointer-events-none absolute right-8 top-8 hidden md:block">
              <div className="h-14 w-14 rounded-2xl border border-white/10"
                style={{ background:"linear-gradient(135deg,#a78bfa,#60a5fa)", opacity:0.8 }} />
            </motion.div>
            <motion.div aria-hidden animate={{ y:[0,10,0], rotate:[0,-8,0] }} transition={{ repeat:Infinity, duration:6, ease:"easeInOut", delay:0.5 }}
              className="pointer-events-none absolute left-8 bottom-8 hidden md:block">
              <div className="h-10 w-10 rounded-xl border border-white/10"
                style={{ background:"linear-gradient(135deg,#ec4899,#f59e0b)", opacity:0.7 }} />
            </motion.div>

            <div className="relative z-10">
              <div className="mb-5 inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-400">
                Start Today
              </div>
              <h2 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Start Free Trial<br />
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage:"linear-gradient(90deg,#a78bfa 0%,#60a5fa 55%,#38bdf8 100%)" }}>
                  Sign Up For Free
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-neutral-400">
                Book a free 30-minute strategy call. No commitment, no credit card required.
                Let&apos;s figure out exactly how we can grow your business.
              </p>
              <div className="mx-auto mt-7 flex max-w-lg flex-wrap justify-center gap-x-6 gap-y-3">
                {["No long-term contracts","Free strategy call","14-day money-back","Dedicated account manager"].map(p => (
                  <div key={p} className="flex items-center gap-1.5 text-sm text-neutral-400">
                    <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0" />{p}
                  </div>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link href="/register"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-100 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link href="/pricing"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-8 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08]">
                  View Pricing
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
