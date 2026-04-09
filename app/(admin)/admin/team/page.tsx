import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export const metadata = {
  title: "Admin — Team",
}

export default async function AdminTeamPage() {
  const user = await getCurrentUser()
  if (!user || (user as any).role !== "ADMIN") redirect("/login")

  const employees = await db.employeeProfile.findMany({
    include: {
      user: { select: { name: true, email: true } },
      _count: { select: { projectEmployees: true } },
    },
    orderBy: { department: "asc" },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Team"
        text="Manage your employees and their departments."
      />
      {employees.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="user" />
          <EmptyPlaceholder.Title>No team members yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Employees appear here once their profiles are created.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      ) : (
        <div className="divide-y rounded-md border">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="flex items-center justify-between p-4"
            >
              <div>
                <p className="font-medium">{emp.user.name ?? "—"}</p>
                <p className="text-sm text-muted-foreground">{emp.user.email}</p>
                {emp.jobTitle && (
                  <p className="text-xs text-muted-foreground">{emp.jobTitle}</p>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                  {emp.department}
                </span>
                <span>{emp._count.projectEmployees} projects</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  )
}
