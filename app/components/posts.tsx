import Link from "next/link";
import { getPostList } from "@/app/lib/utils";
import { daysAgo } from "@/app/lib/date";

export async function Posts({ maxItem = 0 }) {
  const posts = await getPostList();
  const preFlight = posts
    ?.sort((a, b) => {
      if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .map((post, index) => {
      return (
        <p key={post.title}>
          <Link href={`/blog/${post.slug}`} className="visited:text-gray-400">
            <span className="pr-1">{index + 1}. </span>
            {post.title}
            <span className="pl-6 text-xs">
              {daysAgo(post.publishedAt) + " 天前发布"}
            </span>
          </Link>
        </p>
      );
    });

  return <>{maxItem ? preFlight?.slice(0, maxItem) : preFlight}</>;
}
