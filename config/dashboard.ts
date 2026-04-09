import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Support",
      href: "/support",
    },
  ],
  sidebarNav: [
    {
      title: "Overview",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Projects",
      href: "/dashboard/projects",
      icon: "page",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}

export const adminConfig: DashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Overview",
      href: "/admin",
      icon: "post",
    },
    {
      title: "Clients",
      href: "/admin/clients",
      icon: "user",
    },
    {
      title: "Projects",
      href: "/admin/projects",
      icon: "page",
    },
    {
      title: "Team",
      href: "/admin/team",
      icon: "user",
    },
    {
      title: "Invoices",
      href: "/admin/invoices",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: "settings",
    },
  ],
}

export const employeeConfig: DashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "My Tasks",
      href: "/employee",
      icon: "post",
    },
    {
      title: "Projects",
      href: "/employee/projects",
      icon: "page",
    },
    {
      title: "Profile",
      href: "/employee/profile",
      icon: "settings",
    },
  ],
}
