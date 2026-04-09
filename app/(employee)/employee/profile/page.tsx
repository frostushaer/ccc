import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { UserNameForm } from "@/components/user-name-form"

export const metadata = {
  title: "Employee Profile",
}

export default async function EmployeeProfilePage() {
  const user = await getCurrentUser()
  if (!user || (user as any).role !== "EMPLOYEE") redirect("/login")

  const profile = await db.employeeProfile.findUnique({
    where: { userId: user.id },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Profile"
        text="Manage your profile and account preferences."
      />
      <div className="grid gap-6 rounded-lg border bg-card p-6">
        <div>
          <p className="text-sm text-muted-foreground">Department</p>
          <p className="text-lg font-semibold">{profile?.department ?? "—"}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Job Title</p>
          <p className="text-lg font-semibold">{profile?.jobTitle ?? "—"}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Phone</p>
          <p className="text-lg font-semibold">{profile?.phone ?? "—"}</p>
        </div>
      </div>
      <UserNameForm user={{ id: user.id, name: user.name || "" }} />
    </DashboardShell>
  )
}
