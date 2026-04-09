import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export const metadata = {
  title: "My Projects",
}

const statusColors: Record<string, string> = {
  ENQUIRY: "bg-yellow-100 text-yellow-800",
  PROPOSAL_SENT: "bg-blue-100 text-blue-800",
  IN_PROGRESS: "bg-indigo-100 text-indigo-800",
  REVIEW: "bg-purple-100 text-purple-800",
  COMPLETED: "bg-green-100 text-green-800",
  ON_HOLD: "bg-gray-100 text-gray-800",
  CANCELLED: "bg-red-100 text-red-800",
}

export default async function ClientPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const clientProfile = await db.clientProfile.findUnique({
    where: { userId: user.id },
    include: {
      projects: {
        include: { _count: { select: { tasks: true } } },
        orderBy: { createdAt: "desc" },
      },
      invoices: { orderBy: { createdAt: "desc" }, take: 3 },
    },
  })

  if (!clientProfile) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Welcome"
          text="Your client account is being set up. Please contact us."
        />
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No profile yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Your account is pending setup by our team.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Dashboard"
        text="Track your projects and invoices."
      />
      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground">Total Projects</p>
            <p className="mt-1 text-3xl font-bold">
              {clientProfile.projects.length}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="mt-1 text-3xl font-bold">
              {
                clientProfile.projects.filter(
                  (p) => p.status === "IN_PROGRESS"
                ).length
              }
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="mt-1 text-3xl font-bold">
              {
                clientProfile.projects.filter((p) => p.status === "COMPLETED")
                  .length
              }
            </p>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Recent Projects</h3>
          {clientProfile.projects.length === 0 ? (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post" />
              <EmptyPlaceholder.Title>No projects yet</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                Your projects will appear here once our team starts working.
              </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
          ) : (
            <div className="divide-y rounded-md border">
              {clientProfile.projects.slice(0, 5).map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4"
                >
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {project._count.tasks} tasks
                    </p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      statusColors[project.status] ?? "bg-gray-100"
                    )}
                  >
                    {project.status.replace(/_/g, " ")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}
