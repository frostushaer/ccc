import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export const metadata = {
  title: "Messages",
}

export default async function ClientMessagesPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const messages = await db.message.findMany({
    where: { senderId: user.id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Messages"
        text="View your communication with our team."
      />
      {messages.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No messages yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Messages from our team will appear here.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      ) : (
        <div className="divide-y rounded-md border">
          {messages.map((msg) => (
            <div key={msg.id} className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{msg.subject}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(msg.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {msg.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  )
}
