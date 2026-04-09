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

export default async function ClientProjectsPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const clientProfile = await db.clientProfile.findUnique({
    where: { userId: user.id },
    include: {
      projects: {
        include: {
          _count: { select: { tasks: true } },
          projectEmployees: {
            include: {
              employee: { include: { user: { select: { name: true } } } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  })

  const projects = clientProfile?.projects ?? []

  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Projects"
        text="View all your ongoing and completed projects."
      />
      {projects.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No projects yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Projects will appear here once our team starts working with you.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="rounded-lg border bg-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{project.title}</h3>
                  {project.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  )}
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
              <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
                <span>{project._count.tasks} tasks</span>
                {project.deadline && (
                  <span>
                    Due{" "}
                    {new Date(project.deadline).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                )}
                {project.budget && (
                  <span>Budget: ${project.budget.toLocaleString()}</span>
                )}
              </div>
              {project.projectEmployees.length > 0 && (
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Team:</span>
                  {project.projectEmployees.map((pe) => (
                    <span
                      key={pe.id}
                      className="rounded bg-muted px-2 py-0.5 text-xs"
                    >
                      {pe.employee.user.name ?? "—"}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  )
}
