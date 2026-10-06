import { fetchBlogs, BlogList } from "@/features/Blogs";
import { Heading } from "@/components/shared/Heading";

export default async function Page() {
  const blogs = await fetchBlogs();

  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="flex flex-col gap-2 self-center">
        <Heading>Blogs</Heading>
        <p className="text-chart-3 self-center text-base md:text-lg xl:text-xl">Explore latest articles and insights.</p>
      </div>

      <BlogList blogs={blogs} />
    </div>
  );
}
