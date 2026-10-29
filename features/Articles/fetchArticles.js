import { fetcher } from "@/lib/fetcher";

export async function fetchArticles() {
  try {
    const result = await fetcher("/articles?status=published");
    if (!result || !result.items) {
      throw new Error("Articles were not fetched successfully");
    }
    return result.items;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function fetchSingleArticle(slug) {
  try {
    const result = await fetcher(`/articles/slug/${slug}`);
    if (!result || !result.item) {
      throw new Error("Article was not fetched successfully");
    }
    return result.item;
  } catch (error) {
    console.error(`Error fetching article with slug "${slug}":`, error);
    return null;
  }
}
