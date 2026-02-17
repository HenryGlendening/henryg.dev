import rss from "@astrojs/rss";
import { SITE } from "../consts";
import { getSortedPosts } from "../utils/posts";

export async function GET(context: { site: URL | undefined }) {
  const posts = await getSortedPosts();

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: context.site ?? SITE.website,
    customData: `<language>${SITE.lang}</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDatetime,
      link: `/posts/${post.id}/`,
      categories: post.data.tags,
      author: post.data.author,
    })),
  });
}
