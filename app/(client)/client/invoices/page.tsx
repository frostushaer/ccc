import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export const metadata = {
  title: "My Invoices",
}

const statusColors: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-800",
  SENT: "bg-blue-100 text-blue-800",
  PAID: "bg-green-100 text-green-800",
  OVERDUE: "bg-red-100 text-red-800",
  CANCELLED: "bg-gray-100 text-gray-500",
}

export default async function ClientInvoicesPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const clientProfile = await db.clientProfile.findUnique({
    where: { userId: user.id },
    include: {
      invoices: {
        include: { project: { select: { title: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  })

  const invoices = clientProfile?.invoices ?? []
  const totalDue = invoices
    .filter((i) => i.status === "SENT" || i.status === "OVERDUE")
    .reduce((sum, i) => sum + i.amount + i.tax, 0)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Invoices"
        text={
          totalDue > 0
            ? `Outstanding balance: $${totalDue.toLocaleString()}`
            : "All invoices up to date."
        }
      />
      {invoices.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="billing" />
          <EmptyPlaceholder.Title>No invoices yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Invoices will appear here once issued by our team.
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
                {invoice.project && (
                  <p className="text-sm text-muted-foreground">
                    {invoice.project.title}
                  </p>
                )}
                {invoice.dueDate && (
                  <p className="text-xs text-muted-foreground">
                    Due{" "}
                    {new Date(invoice.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium">
                  ${(invoice.amount + invoice.tax).toLocaleString()}
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
