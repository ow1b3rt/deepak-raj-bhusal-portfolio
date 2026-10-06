import { Radio, ArrowUpRight } from "lucide-react";
import { sideContentData } from "./SideContent.data";
import { MoreButton } from "@/components/shared/MoreButton";

export function SideContent({ data = sideContentData }) {
  const { eyebrow, heading, paragraphs, highlights } = data;

  return (
    <div className='flex flex-col items-start gap-6'>
      <span className='text-xl font-medium text-black'>{eyebrow}</span>

      <h2 className='text-xl font-extrabold uppercase leading-tight text-chart-3 md:text-4xl'>
        {heading}
      </h2>

      <div className='text-lg leading-snug text-neutral-600'>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* highlight box */}
      <div className='grid w-full grid-cols-1 rounded-3xl border border-neutral-200 sm:grid-cols-2 sm:divide-x sm:divide-neutral-200 [&>div]:p-6'>
        {highlights.map((item) => (
          <div key={item.id} className='flex items-center gap-4'>
            <span className='flex size-14 shrink-0 items-center justify-center rounded-full bg-black text-white'>
              <Radio className='size-7' />
            </span>
            <p className='text-lg lg:text-2xl font-medium leading-snug text-neutral-800'>
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <MoreButton content={
        <div className='flex items-center gap-2 '>
          <span>Connect with us</span>
          <ArrowUpRight className='size-4' />
        </div>
      } />
    </div>
  );
}
