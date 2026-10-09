import { ArticleBody } from "@/components/shared/ArticleBody";
import { SafeImage } from "@/components/ui/safe-image";
import { resolveUrl, capitalise, localDate } from "@/lib/utils";
import { fetchSingleBlog } from "@/features/Blogs/fetchBlogs";

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const blog = await fetchSingleBlog(slug)

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="flow-root mt-10">
      {/* child 1: photo, must come BEFORE the text in the DOM */}
      <div className="relative mb-6  w-full overflow-hidden rounded-3xl lg:float-right lg:mb-6 lg:ml-8 lg:w-1/3">
        <SafeImage
          src={resolveUrl(blog.mediaUrl)}
          alt={blog.mediaAlt}
          height={0}
          width={0}
          sizes="100vw, 50vw, 33vw"
          objectFit='contain'
        className='w-full'
        />
      </div>

      {/* child 2: text */}
      <h1 className='text-2xl mb-6 md:text-5xl font-bold'>{blog.title}</h1>
      <span className="text-xl font-medium text-gray-500">
        By {capitalise(blog.authorName)} | Published on {localDate(blog.publishedAt)}
      </span>
      <ArticleBody html={blog.content} />
    </div>
  )
}
