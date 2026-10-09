import { PhotoStat } from './PhotoStat';
import { Radio } from "lucide-react";
import { SideContent } from './SideContent';

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "10+", label: "Business Ventures" },
];

function TopContent() {
  return (
    <div className='flex flex-col gap-4 p-8 text-white h-full'>
      <span className='[writing-mode:vertical-rl] rotate-180 text-xl'>PROFESSIONAL JOURNEY</span>
    </div>
  );
}

function BottomContent() {
  return (
    <div className='flex flex-col gap-4 p-8 text-white'>
        {stats.map((s, i) => (
          <div key={i} className='flex flex-col gap-3'>
            <Radio className='size-10' strokeWidth={2.5} />
            <span className='text-5xl font-extrabold leading-none'>{s.value}</span>
            <span className='text-lg text-white/70'>{s.label}</span>
          </div>
        ))}
    </div>
  );
}


export function ProfessionalJourney() {
  return (
    <div className='grid grid-cols-1 gap-10 md:grid-cols-[2fr_3fr] my-6'>
      <PhotoStat
        photo='https://picsum.photos/id/1050/800/800'
        bottomContent={<BottomContent />}
        topContent={<TopContent />}
      />
      <div className='flex flex-1 flex-col gap-4'>
        <SideContent />
      </div>
    </div>
  );
}

