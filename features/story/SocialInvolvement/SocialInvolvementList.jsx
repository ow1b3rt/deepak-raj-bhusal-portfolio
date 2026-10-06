import { SocialInvolvementCard } from './SocialInvolvementCard';
import { socialInvolvements } from './socialInvolvements.data';

export function SocialInvolvementList() {
  return (
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
        {socialInvolvements.map((item) => (
          <SocialInvolvementCard
            key={item.title}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
  )
}
