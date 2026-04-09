import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export const metadata = {
  title: "Pricing | Code Crafters Creators",
}

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "999",
      description: "Perfect for small businesses ready to go digital.",
      features: [
        "5-page professional website",
        "Mobile responsive design",
        "Basic SEO setup",
        "Contact form integration",
        "1 month of support",
        "Google Analytics setup",
      ],
      cta: "Get Started",
      href: "/register",
      highlighted: false,
    },
    {
      name: "Growth",
      price: "2,499",
      description: "For growing businesses that need more reach and results.",
      features: [
        "Up to 15-page website",
        "Advanced SEO optimization",
        "Social media setup (3 platforms)",
        "Monthly performance reports",
        "3 months of support",
        "Google Ads campaign setup",
        "Content strategy (4 blogs/mo)",
        "Email marketing integration",
      ],
      cta: "Start Growing",
      href: "/register",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Full-scale digital presence with a dedicated team.",
      features: [
        "Custom web application",
        "Full digital marketing suite",
        "Dedicated account manager",
        "Priority 24/7 support",
        "Unlimited revisions",
        "E-commerce & payments",
        "Advanced analytics dashboard",
        "Quarterly strategy reviews",
      ],
      cta: "Contact Us",
      href: "/#contact",
      highlighted: false,
    },
  ]

  return (
    <section className="container flex flex-col gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col items-center gap-4 text-center md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Simple, transparent pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Choose the package that fits your business goals. All plans include
          professional delivery with no hidden fees.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex flex-col rounded-lg border p-8",
              plan.highlighted
                ? "border-primary bg-primary text-primary-foreground shadow-lg"
                : "bg-background"
            )}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-foreground px-3 py-1 text-xs font-semibold text-primary">
                Most Popular
              </span>
            )}
            <div className="mb-6">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p
                className={cn(
                  "mt-1 text-sm",
                  plan.highlighted
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                )}
              >
                {plan.description}
              </p>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  {plan.price === "Custom" ? "" : "$"}
                  {plan.price}
                </span>
                {plan.price !== "Custom" && (
                  <span
                    className={cn(
                      "ml-1 text-sm",
                      plan.highlighted
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    )}
                  >
                    one-time
                  </span>
                )}
              </div>
            </div>
            <ul className="mb-8 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Icons.check
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      plan.highlighted
                        ? "text-primary-foreground"
                        : "text-primary"
                    )}
                  />
                  <span
                    className={
                      plan.highlighted ? "text-primary-foreground/90" : ""
                    }
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                plan.highlighted
                  ? "bg-background text-foreground hover:bg-background/90"
                  : ""
              )}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
      <div className="mx-auto flex w-full max-w-[58rem] flex-col items-center gap-2 text-center">
        <p className="leading-normal text-muted-foreground sm:leading-7">
          Need something custom? We work with all budgets.{" "}
          <Link href="/#contact" className="underline underline-offset-4">
            Get in touch
          </Link>{" "}
          and let&apos;s build something great together.
        </p>
      </div>
    </section>
  )
}
