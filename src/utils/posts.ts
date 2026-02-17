import { getCollection, type CollectionEntry } from "astro:content";

export const getSortedPosts = async (): Promise<CollectionEntry<"blog">[]> => {
  const posts = await getCollection("blog");

  return posts
    .filter((post) => import.meta.env.DEV || !post.data.draft)
    .sort(
      (firstPost, secondPost) =>
        secondPost.data.pubDatetime.valueOf() - firstPost.data.pubDatetime.valueOf()
    );
};
