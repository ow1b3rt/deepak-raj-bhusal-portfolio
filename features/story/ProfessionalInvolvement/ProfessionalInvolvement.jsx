import { ProfessionalInvolvementList } from './ProfessionalInvolvementList';
import { Heading } from '@/components/shared/Heading';

export function ProfessionalInvolvement() {
  return (
    <div className='flex flex-col gap-4'>
      <Heading className='self-start'>Professional Involvement</Heading>
      <ProfessionalInvolvementList />
    </div>
  );
}
