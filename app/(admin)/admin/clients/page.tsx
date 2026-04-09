import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export const metadata = {
  title: "Admin — Clients",
}

export default async function AdminClientsPage() {
  const user = await getCurrentUser()
  if (!user || (user as any).role !== "ADMIN") redirect("/login")

  const clients = await db.clientProfile.findMany({
    include: {
      user: { select: { name: true, email: true } },
      _count: { select: { projects: true, invoices: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Clients"
        text="Manage all client accounts and their projects."
      />
      {clients.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="user" />
          <EmptyPlaceholder.Title>No clients yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Clients appear here once they register.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      ) : (
        <div className="divide-y rounded-md border">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between p-4"
            >
              <div>
                <p className="font-medium">{client.user.name ?? "—"}</p>
                <p className="text-sm text-muted-foreground">
                  {client.user.email}
                </p>
                {client.company && (
                  <p className="text-xs text-muted-foreground">
                    {client.company}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{client._count.projects} projects</span>
                <span>{client._count.invoices} invoices</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  )
}
