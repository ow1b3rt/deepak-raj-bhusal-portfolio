import { StoryGrid, EducationList, SocialInvolvement, ProfessionalJourney } from "@/features/story";


export default function StoryPage() {
  return (
    <div className='flex flex-col py-2 gap-20 container mx-auto px-4 xl:px-0'>
      <StoryGrid />
      <ProfessionalJourney />
      <EducationList />
      <SocialInvolvement />
    </div>
  );
}
