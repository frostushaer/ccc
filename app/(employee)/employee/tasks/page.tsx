import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export const metadata = {
  title: "My Tasks",
}

const statusColors: Record<string, string> = {
  TODO: "bg-gray-100 text-gray-800",
  IN_PROGRESS: "bg-indigo-100 text-indigo-800",
  IN_REVIEW: "bg-purple-100 text-purple-800",
  DONE: "bg-green-100 text-green-800",
}

const priorityColors: Record<string, string> = {
  LOW: "text-gray-500",
  MEDIUM: "text-blue-600",
  HIGH: "text-orange-600",
  URGENT: "text-red-600",
}

export default async function EmployeeTasksPage() {
  const user = await getCurrentUser()
  if (!user || (user as any).role !== "EMPLOYEE") redirect("/login")

  const tasks = await db.task.findMany({
    where: { assigneeId: user.id },
    include: {
      project: { select: { title: true } },
      creator: { select: { name: true, email: true } },
    },
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Tasks"
        text="All tasks currently assigned to you."
      />
      {tasks.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No tasks assigned</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Tasks will appear here when assigned by your manager.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      ) : (
        <div className="divide-y rounded-md border">
          {tasks.map((task) => (
            <div key={task.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{task.title}</p>
                  {task.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {task.description}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>Project: {task.project.title}</span>
                    <span>
                      Created by: {task.creator.name ?? task.creator.email}
                    </span>
                    {task.dueDate && (
                      <span>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      statusColors[task.status] ?? "bg-gray-100"
                    )}
                  >
                    {task.status.replace(/_/g, " ")}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-semibold",
                      priorityColors[task.priority] ?? "text-gray-500"
                    )}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  )
}
