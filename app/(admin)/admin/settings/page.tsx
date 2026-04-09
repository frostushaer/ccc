import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { UserNameForm } from "@/components/user-name-form"

export const metadata = {
  title: "Admin Settings",
}

export default async function AdminSettingsPage() {
  const user = await getCurrentUser()
  if (!user || (user as any).role !== "ADMIN") redirect("/login")

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage your admin account settings."
      />
      <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
      </div>
    </DashboardShell>
  )
}
