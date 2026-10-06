import { EducationCard } from "./EducationCard";
import { educationData } from "./education.data";
import { Heading } from "@/components/shared/Heading";

export function EducationList({ data = educationData }) {
  const { title, items } = data;

  return (
    <section className='rounded-[2rem] bg-[#fff8f8] px-6 py-12 sm:px-12 lg:px-[7%]'>
      <Heading className='text-center self-center'>{title}</Heading>

      <div className='divide-y divide-neutral-300'>
        {items.map((item) => (
          <EducationCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
