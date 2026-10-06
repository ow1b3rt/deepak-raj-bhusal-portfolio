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

export async function fetchSingleBlog(slug) {
  try {
    const blog = await fetcher(`/blogs/slug/${slug}`);
    if (!blog || !blog.item) {
      throw new Error("Blog was not fetched successfully");
    }
    return blog.item;
  } catch (error) {
    console.error(`Error fetching blog with slug "${slug}":`, error);
    return null;
  }
}
