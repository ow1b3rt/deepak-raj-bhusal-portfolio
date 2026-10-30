import { StoryGrid, EducationList, SocialInvolvement, ProfessionalJourney, ForeignTrips } from "@/features/story";

export const metadata = {
  title: "My Story",
  description:
    "The life story of Deepak Raj Bhusal — from a small village in Nepal to founding the Enlighten Group, with milestones in education, business, leadership, and social service.",
  alternates: { canonical: "/story" },
  openGraph: {
    title: "My Story | Deepak Raj Bhusal",
    description:
      "From a small village in Nepal to founding the Enlighten Group — milestones in education, business, leadership, and social service.",
    url: "/story",
  },
}

export default function StoryPage() {
  return (
    <div className='flex flex-col py-2 gap-20 container mx-auto px-4 xl:px-0'>
      <StoryGrid />
      <ProfessionalJourney />
      <EducationList />
      <ForeignTrips />
      <SocialInvolvement />
    </div>
  );
}
