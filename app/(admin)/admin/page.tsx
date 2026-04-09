import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Admin — Overview",
}

export default async function AdminPage() {
  const user = await getCurrentUser()

  if (!user || (user as any).role !== "ADMIN") {
    redirect("/login")
  }

  const [clientCount, projectCount, invoiceCount, employeeCount] =
    await Promise.all([
      db.clientProfile.count(),
      db.project.count(),
      db.invoice.count(),
      db.employeeProfile.count(),
    ])

  const stats = [
    { label: "Total Clients", value: clientCount, icon: "👥" },
    { label: "Active Projects", value: projectCount, icon: "📁" },
    { label: "Invoices", value: invoiceCount, icon: "📄" },
    { label: "Team Members", value: employeeCount, icon: "👨‍💻" },
  ]

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Admin Overview"
        text="Manage clients, projects, team, and invoices."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </span>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
