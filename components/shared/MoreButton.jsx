import Link from "next/link"

export function MoreButton({ href, content, bgColor = "chart-3" }) {
  const className = `px-4 cursor-pointer py-2 rounded-lg text-white bg-${bgColor} hover:bg-${bgColor}/80 transition-colors duration-300 text-sm md:text-base xl:text-lg font-semibold w-fit`

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    )
  }

  return <button className={className}>{content}</button>
}
