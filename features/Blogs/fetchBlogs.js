import { fetcher } from "@/lib/fetcher"; 

export async function fetchBlogs() {
  try {
    const blogs = await fetcher("/blogs");
    if (!blogs || !blogs.items) {
      throw new Error("Blogs was not fetched successfully");
    }
    return blogs.items;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}
