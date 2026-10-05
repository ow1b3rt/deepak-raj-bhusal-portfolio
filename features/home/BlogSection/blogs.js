import { fetchBlogs } from "../../Blogs/fetchBlogs"
import { BlogSection } from "./BlogSection"

export async function Blogs() {
  const blogs = await fetchBlogs()
  const len = blogs.length
  console.log("len", len)
  const leftBlog = blogs.slice(0, 1)

  const rightBlog = blogs.slice(1, 4)
  const blogsData = {
    left: leftBlog,
    right: rightBlog,
  }

  return <BlogSection blogsData={blogsData} />
}
