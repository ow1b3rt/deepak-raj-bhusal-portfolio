import { BlogCard } from "./BlogCard"

export function BlogList({ blogs }) {
  return (
    <div className="flex flex-col gap-10">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          cardClass={`flex-col md:flex-row`}
        />
      ))}
    </div>
  )
}
