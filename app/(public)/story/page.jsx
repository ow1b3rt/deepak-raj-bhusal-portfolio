import { StoryGrid, EducationList, SocialInvolvement, ProfessionalJourney } from "@/features/story";


export default function StoryPage() {
  return (
    <div className='flex flex-col py-2 gap-20'>
      <StoryGrid />
      <ProfessionalJourney />
      <EducationList />
      <SocialInvolvement />
    </div>
  );
}
