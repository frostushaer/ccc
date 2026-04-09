import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export const metadata = {
  title: "Admin — Projects",
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

export default async function AdminProjectsPage() {
  const user = await getCurrentUser()
  if (!user || (user as any).role !== "ADMIN") redirect("/login")

  const projects = await db.project.findMany({
    include: {
      client: {
        include: { user: { select: { name: true, email: true } } },
      },
      _count: { select: { tasks: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Projects"
        text="Track and manage all client projects."
      />
      {projects.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No projects yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Projects appear here once created.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      ) : (
        <div className="divide-y rounded-md border">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-4"
            >
              <div>
                <p className="font-medium">{project.title}</p>
                <p className="text-sm text-muted-foreground">
                  {project.client.user.name ?? project.client.user.email}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {project._count.tasks} tasks
                </span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    statusColors[project.status] ?? "bg-gray-100"
                  )}
                >
                  {project.status.replace(/_/g, " ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  )
}
