import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Employee Dashboard",
}

export default async function EmployeePage() {
  const user = await getCurrentUser()
  if (!user || (user as any).role !== "EMPLOYEE") redirect("/login")

  const [assignedTasks, inProgressTasks, reviewTasks, activeProjects] =
    await Promise.all([
      db.task.count({ where: { assigneeId: user.id } }),
      db.task.count({ where: { assigneeId: user.id, status: "IN_PROGRESS" } }),
      db.task.count({ where: { assigneeId: user.id, status: "IN_REVIEW" } }),
      db.projectEmployee.count({
        where: { employee: { userId: user.id } },
      }),
    ])

  const stats = [
    { label: "Assigned Tasks", value: assignedTasks, icon: "🗂️" },
    { label: "In Progress", value: inProgressTasks, icon: "⚙️" },
    { label: "In Review", value: reviewTasks, icon: "🧪" },
    { label: "Active Projects", value: activeProjects, icon: "📁" },
  ]

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Employee Dashboard"
        text="Track your assigned work and project progress."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
