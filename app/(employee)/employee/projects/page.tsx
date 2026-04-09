import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export const metadata = {
  title: "Employee Projects",
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

export default async function EmployeeProjectsPage() {
  const user = await getCurrentUser()
  if (!user || (user as any).role !== "EMPLOYEE") redirect("/login")

  const employee = await db.employeeProfile.findUnique({
    where: { userId: user.id },
    include: {
      projectEmployees: {
        include: {
          project: {
            include: {
              client: {
                include: { user: { select: { name: true, email: true } } },
              },
              _count: { select: { tasks: true } },
            },
          },
        },
        orderBy: { assignedAt: "desc" },
      },
    },
  })

  const assignments = employee?.projectEmployees ?? []

  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Projects"
        text="Projects where you are currently assigned."
      />
      {assignments.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No projects assigned</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Your assigned projects will appear here.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      ) : (
        <div className="grid gap-4">
          {assignments.map(({ id, project, role }) => (
            <div key={id} className="rounded-lg border bg-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{project.title}</h3>
                  {project.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span>
                      Client: {project.client.user.name ?? project.client.user.email}
                    </span>
                    <span>{project._count.tasks} tasks</span>
                    {project.budget && (
                      <span>Budget: ${project.budget.toLocaleString()}</span>
                    )}
                    {role && <span>Role: {role}</span>}
                  </div>
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
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  )
}
