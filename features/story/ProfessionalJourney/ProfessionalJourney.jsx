import { PhotoStat } from "./PhotoStat"
import { Radio } from "lucide-react"
import { SideContent } from "./SideContent"

const stats = [
  { value: "20+", label: "Years of Experience" },
  { value: "10+", label: "Business Ventures" },
]

function TopContent() {
  return (
    <div className="flex h-full flex-col gap-4 p-8 text-white">
      <span className="rotate-180 text-xl [writing-mode:vertical-rl]">
        PROFESSIONAL JOURNEY
      </span>
    </div>
  )
}

function BottomContent() {
  return (
    <div className="flex flex-col gap-4 p-8 text-white">
      {stats.map((s, i) => (
        <div key={i} className="flex flex-col gap-3">
          <Radio className="size-10" strokeWidth={2.5} />
          <span className="text-5xl leading-none font-extrabold">
            {s.value}
          </span>
          <span className="text-lg text-white/70">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

export function ProfessionalJourney() {
  return (
    <div className="my-6 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr]">
      <PhotoStat
        photo="https://picsum.photos/id/1050/800/800"
        bottomContent={<BottomContent />}
        topContent={<TopContent />}
      />
      <div className="flex flex-1 flex-col gap-4">
        <SideContent />
      </div>
    </div>
  )
}
