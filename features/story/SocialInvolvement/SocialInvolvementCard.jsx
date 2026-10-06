import { SafeImage } from '@/components/ui/safe-image';
import { resolveUrl } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { MoreButton } from '@/components/shared/MoreButton';

export function SocialInvolvementCard({ title, description, imageUrl }) {
  return (
    <div className='group grid aspect-[4/5] grid-rows-[5fr_1fr] overflow-hidden rounded-lg bg-white transition-[grid-template-rows] duration-300 ease-in-out hover:grid-rows-[1fr_0fr]'>
      {/* image: grows to fill the footer's space on hover */}
      <div className='relative min-h-0 rounded-lg overflow-hidden'>
        <SafeImage
          src={resolveUrl(imageUrl)}
          alt={title}
          fill
          className='h-full w-full object-cover'
        />
        <div className='absolute inset-0 flex flex-col gap-4 items-start justify-end bg-black/60 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          <h2 className='mb-2 text-2xl font-bold line-clamp-3'>{title}</h2>
          <p>{description}</p>
          <MoreButton 
            content={
              <div className='flex items-center gap-2'>
                <span>Learn More</span>
                <ArrowUpRight size={16} />
              </div>
            }
          />
        </div>
      </div>

      {/* footer: collapses to 0 height on hover */}
      <div className='min-h-0 overflow-hidden transition-opacity duration-300 group-hover:opacity-0'>
        <h2 className='p-4 text-2xl font-bold line-clamp-2'>{title}</h2>
      </div>
    </div>
  );
}
