import { ArticleCard } from "./ArticleCard"

export function ArticleList({ articles }) {
  return (
    <div className="container mx-auto flex flex-col gap-10">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          cardClass={`flex-col md:flex-row`}
        />
      ))}
    </div>
  )
}
