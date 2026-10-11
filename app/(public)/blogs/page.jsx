import { fetchBlogs, BlogList } from "@/features/Blogs";
import { Heading } from "@/components/shared/Heading";

export const metadata = {
  title: "Blogs",
  description:
    "Read the latest articles and insights from Deepak Raj Bhusal on entrepreneurship, education, leadership, travel, technology, and community development.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "Blogs | Deepak Raj Bhusal",
    description:
      "Articles and insights on entrepreneurship, education, leadership, travel, technology, and community development.",
    url: "/blogs",
  },
}

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
