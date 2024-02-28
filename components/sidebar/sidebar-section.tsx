import { Link } from "@/components/sidebar/configuration"
import SidebarLink from "@/components/sidebar/sidebar-link"

export default function SidebarSection({
  links,
  isOpen,
}: {
  links: Link[]
  isOpen: boolean
}) {
  return (
    <section className="w-full px-3">
      {links.map((link) => (
        <SidebarLink key={link.id} link={link as any} isOpen={isOpen} />
      ))}
    </section>
  )
}
