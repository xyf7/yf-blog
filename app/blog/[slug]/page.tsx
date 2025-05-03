import { getPostContent } from "@/app/lib/utils";
import { MarkdownRender } from "@/app/lib/render";
import { formatDate, getPostList } from "@/app/lib/utils";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";

export async function generateStaticParams() {
  const posts = await getPostList();

  return (
    posts?.map((post) => ({
      slug: post.slug,
    })) || []
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = await getPostContent(slug);

  return (
    <>
      <Header />
      <main className="mt-20">
        <h1 className="text-xl font-bold">{post?.metadata.title}</h1>
        <p className="mb-10 text-sm text-gray-500">
          {formatDate(post?.metadata.publishedAt || "")}
        </p>
        <MarkdownRender mdContent={post?.content || ""} />
      </main>
      <Footer />
    </>
  );
}
