import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export const metadata = {
  title: "Admin — Invoices",
}

const statusColors: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-800",
  SENT: "bg-blue-100 text-blue-800",
  PAID: "bg-green-100 text-green-800",
  OVERDUE: "bg-red-100 text-red-800",
  CANCELLED: "bg-gray-100 text-gray-500",
}

export default async function AdminInvoicesPage() {
  const user = await getCurrentUser()
  if (!user || (user as any).role !== "ADMIN") redirect("/login")

  const invoices = await db.invoice.findMany({
    include: {
      client: {
        include: { user: { select: { name: true, email: true } } },
      },
      project: { select: { title: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  const totalPaid = invoices
    .filter((i) => i.status === "PAID")
    .reduce((sum, i) => sum + i.amount, 0)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Invoices"
        text={`Total collected: $${totalPaid.toLocaleString()}`}
      />
      {invoices.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="billing" />
          <EmptyPlaceholder.Title>No invoices yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Invoices appear here once created.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      ) : (
        <div className="divide-y rounded-md border">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4"
            >
              <div>
                <p className="font-medium">{invoice.invoiceNo}</p>
                <p className="text-sm text-muted-foreground">
                  {invoice.client.user.name ?? invoice.client.user.email}
                  {invoice.project ? ` — ${invoice.project.title}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium">
                  ${invoice.amount.toLocaleString()}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    statusColors[invoice.status] ?? "bg-gray-100"
                  )}
                >
                  {invoice.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  )
}
