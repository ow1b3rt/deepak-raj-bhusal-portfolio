import { fetchBlogs, BlogList } from "@/features/Blogs";

export default async function Page() {
  const blogs = await fetchBlogs();

  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="flex flex-col gap-2 self-center">
        <h1 className="text-2xl md:text-3xl xl:text-4xl self-center font-bold">Blogs</h1>
        <p className="text-chart-3 self-center text-base md:text-lg xl:text-xl">Explore latest articles and insights.</p>
      </div>

      <BlogList blogs={blogs} />
    </div>
  );
}
