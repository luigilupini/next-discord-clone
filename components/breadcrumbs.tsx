import { clsx } from "clsx"
import Link from "next/link"

type Breadcrumb = {
  label: string
  href: string
  active?: boolean
}

export default function Breadcrumbs({
  breadcrumbs,
  className,
}: {
  breadcrumbs: Breadcrumb[]
  className?: string
}) {
  return (
    <nav className={className}>
      <ol className={"flex text-xl"}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active
                ? "pointer-events-none font-semibold"
                : "font-normal",
            )}
          >
            <span>
              <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            </span>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-1 inline-block font-light opacity-60">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
