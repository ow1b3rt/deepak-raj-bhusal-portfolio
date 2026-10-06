import { SocialInvolvementList } from './SocialInvolvementList';
import { Heading } from '@/components/shared/Heading';

export function SocialInvolvement() {
  return (
    <div className='flex flex-col gap-4'>
      <Heading className='self-start'>Social Involvement</Heading>
      <SocialInvolvementList />
    </div>
  );
}
