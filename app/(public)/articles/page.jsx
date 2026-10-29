import { fetchArticles, ArticleList } from "@/features/Articles";
import { Heading } from "@/components/shared/Heading";

export const metadata = {
  title: "Articles | Deepak Raj Bhusal",
  description:
    "Browse published articles and thought-leadership pieces by Deepak Raj Bhusal on entrepreneurship, education, and community development.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Articles | Deepak Raj Bhusal",
    description:
      "Published articles and thought-leadership pieces on entrepreneurship, education, and community development.",
    url: "/articles",
  },
};

export default async function ArticlesPage() {
  const articles = await fetchArticles();

  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="flex flex-col gap-2 self-center">
        <Heading>Articles</Heading>
        <p className="text-chart-3 self-center text-base md:text-lg xl:text-xl">
          Explore published articles and research.
        </p>
      </div>

      <ArticleList articles={articles} />
    </div>
  );
}
