import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default async function IndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <span className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium">
            Web Development &amp; Digital Marketing Agency
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            We Build Digital Experiences That Drive Results
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            From stunning websites to full-scale digital marketing campaigns —
            Code Crafters Creators delivers measurable growth for businesses
            worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "lg" }),
                "transition-transform duration-200 hover:-translate-y-0.5"
              )}
            >
              Get Started
            </Link>
            <Link
              href="/#services"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "transition-transform duration-200 hover:-translate-y-0.5"
              )}
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            What We Do
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            End-to-end digital solutions crafted by experts in web development,
            design, and marketing.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {[
            {
              icon: "🌐",
              title: "Web Development",
              desc: "Custom websites and web apps built with modern frameworks — fast, scalable, and secure.",
            },
            {
              icon: "📈",
              title: "Digital Marketing",
              desc: "Data-driven campaigns across Google, Meta, and more to grow your audience and revenue.",
            },
            {
              icon: "🔍",
              title: "SEO Optimization",
              desc: "On-page, off-page, and technical SEO strategies that rank your site and bring organic traffic.",
            },
            {
              icon: "🎨",
              title: "UI/UX Design",
              desc: "Beautiful, user-friendly interfaces designed to convert visitors into loyal customers.",
            },
            {
              icon: "📱",
              title: "Social Media",
              desc: "Content strategy, community management, and paid social to build your brand presence.",
            },
            {
              icon: "✍️",
              title: "Content Creation",
              desc: "Compelling copy, blogs, and multimedia content that tells your brand story effectively.",
            },
          ].map((service) => (
            <div
              key={service.title}
              className="relative overflow-hidden rounded-lg border bg-background p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <span className="text-4xl">{service.icon}</span>
                <div className="space-y-2">
                  <h3 className="font-bold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        id="work"
        className="container py-8 md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Why Choose Us
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            We combine technical excellence with creative strategy to deliver
            results that matter.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-[64rem] gap-6 sm:grid-cols-3">
          {[
            {
              stat: "150+",
              label: "Projects Delivered",
              desc: "Websites, apps, and campaigns shipped across industries.",
            },
            {
              stat: "98%",
              label: "Client Satisfaction",
              desc: "Our clients come back — and bring their friends.",
            },
            {
              stat: "5x",
              label: "Average ROI",
              desc: "Our clients see measurable growth from day one.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center rounded-lg border bg-background p-8 text-center shadow-sm"
            >
              <span className="font-heading text-5xl font-bold text-primary">
                {item.stat}
              </span>
              <h3 className="mt-2 font-bold">{item.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team specializations */}
      <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Our Experts
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            A multidisciplinary team dedicated to your digital success.
          </p>
        </div>
        <div className="mx-auto grid max-w-[64rem] gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { role: "Developers", emoji: "👨‍💻", desc: "Full-stack & mobile" },
            { role: "Designers", emoji: "🎨", desc: "UI/UX & brand identity" },
            { role: "SEO Specialists", emoji: "🔍", desc: "Search & analytics" },
            { role: "Marketers", emoji: "📣", desc: "Growth & campaigns" },
          ].map((member) => (
            <div
              key={member.role}
              className="flex flex-col items-center rounded-lg border bg-background p-6 text-center"
            >
              <span className="text-3xl">{member.emoji}</span>
              <h3 className="mt-3 font-bold">{member.role}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Ready to Grow Your Business?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Let&apos;s talk about your project. Our team is ready to help you
            build something extraordinary.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "lg" }),
                "transition-transform duration-200 hover:-translate-y-0.5"
              )}
            >
              Start Your Project
            </Link>
            <Link
              href="/pricing"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "transition-transform duration-200 hover:-translate-y-0.5"
              )}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
