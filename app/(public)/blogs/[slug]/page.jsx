import { ArticleBody } from "@/components/shared/ArticleBody";
import { SafeImage } from "@/components/ui/safe-image";
import { resolveUrl, capitalise, localDate, stripHtml } from "@/lib/utils";
import { fetchSingleBlog } from "@/features/Blogs/fetchBlogs";

function toDescription(blog) {
  const text = stripHtml(blog.content).replace(/\s+/g, " ").trim();
  if (!text) {
    return `Read "${blog.title}" by Deepak Raj Bhusal.`;
  }
  return text.length > 160 ? `${text.slice(0, 157).trimEnd()}...` : text;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await fetchSingleBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const description = toDescription(blog);
  const image = resolveUrl(blog.mediaUrl);

  return {
    title: blog.title,
    description,
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: {
      type: "article",
      title: blog.title,
      description,
      url: `/blogs/${slug}`,
      publishedTime: blog.publishedAt,
      authors: blog.authorName ? [capitalise(blog.authorName)] : undefined,
      images: image ? [{ url: image, alt: blog.mediaAlt || blog.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

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
