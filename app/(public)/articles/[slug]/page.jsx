import { fetchSingleArticle } from "@/features/Articles/fetchArticles"
import { resolveUrl, localDate } from "@/lib/utils"
import { notFound } from "next/navigation"
import { FileText } from "lucide-react"

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = await fetchSingleArticle(slug)

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    }
  }

  return {
    title: article.title,
    description:
      article.description || `Read "${article.title}" by Deepak Raj Bhusal.`,
    alternates: { canonical: `/articles/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description || "",
      url: `/articles/${slug}`,
      publishedTime: article.publishedAt,
    },
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const article = await fetchSingleArticle(slug)

  if (!article) {
    notFound()
  }

  const pdfUrl = resolveUrl(article.pdfUrl)

  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-10 md:px-20">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold md:text-5xl">{article.title}</h1>

        {/* Author row */}
        {(article.author || article.publishedAt) && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-gray-500">
            {article.author && (
              <span className="font-medium text-gray-700">
                {article.author}
              </span>
            )}
            {article.coAuthors && (
              <span className="text-gray-400">
                with{" "}
                <span className="font-medium text-gray-600">
                  {article.coAuthors}
                </span>
              </span>
            )}
            {article.publishedAt && (
              <>
                {(article.author || article.coAuthors) && (
                  <span className="text-gray-300">·</span>
                )}
                <span>Published on {localDate(article.publishedAt)}</span>
              </>
            )}
          </div>
        )}

        {article.description && (
          <p className="max-w-3xl text-lg text-gray-600">
            {article.description}
          </p>
        )}
      </div>

      {/* PDF Viewer */}
      {pdfUrl ? (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            title={article.title}
            className="h-[80vh] w-full"
            allow="fullscreen"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-gray-300 py-24 text-gray-400">
          <FileText className="h-16 w-16" />
          <p className="text-lg">No PDF attached to this article yet.</p>
        </div>
      )}
    </div>
  )
}
