import { SafeImage } from "@/components/ui/safe-image"
import { resolveUrl } from "@/lib/utils"

export function EducationCard({ item }) {
  if (!item) return null

  return (
    <div className="flex items-start gap-6 py-10 sm:gap-10">
      {/* logo */}
      {/*
      <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-neutral-900 sm:size-28 lg:size-32">
        { item.logo && (
          <SafeImage
            src={resolveUrl(item.logo)}
            alt={item.title}
            fill
            className='object-cover'
          />
        /}
      </div>
*/}
      {/* text */}
      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:pt-2">
        <h3 className="text-2xl font-bold text-neutral-900 sm:text-4xl">
          {item.title}
        </h3>
        <p className="max-w-xl text-base text-neutral-800 sm:text-lg">
          {item.description}
        </p>
        <span className="mt-2 text-lg font-semibold text-chart-3 md:hidden">
          {item.period}
        </span>
      </div>

      {/* period (desktop) */}
      <span className="hidden shrink-0 pr-8 text-2xl font-semibold text-chart-3 md:block">
        {item.period}
      </span>
    </div>
  )
}
