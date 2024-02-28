export type Link = {
  id: number
  label: string
  icon: string
  href: string
}

export const topLinks: Link[] = [
  {
    id: 0,
    label: "Workspace",
    icon: "Home",
    href: "/",
  },
  {
    id: 1,
    label: "Visualization",
    icon: "BarChart",
    href: "/visualization",
  },
  {
    id: 2,
    label: "Reporting",
    icon: "Activity",
    href: "/reportings",
  },
  {
    id: 3,
    label: "Resources",
    icon: "Database",
    href: "/resources",
  },
  {
    id: 4,
    label: "Management",
    icon: "Users",
    href: "/permissions",
  },
]

export const bottomLinks: Link[] = [
  {
    id: 1,
    label: "Sandbox",
    icon: "Package",
    href: "/sandbox",
  },
  {
    id: 2,
    label: "Settings",
    icon: "Settings",
    href: "/settings",
  },
]
