import Link from "next/link";
import { getPostList } from "@/lib/utils";
import { TimePast } from "@/components/timePast";

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
            <TimePast date={post.publishedAt} />
          </Link>
        </p>
      );
    });

  return <>{maxItem ? preFlight?.slice(0, maxItem) : preFlight}</>;
}
