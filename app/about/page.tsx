import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getAboutContent } from "@/lib/io";
import { directRender } from "@/lib/render";

export default async function Page() {
  const rawContent = await getAboutContent();
  const htmlContent = await directRender(rawContent);

  return (
    <>
      <Header />
      <main className="mt-20">
        <article
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className="prose prose-a:no-underline prose-a:text-inherit prose-a:hover:underline"
        ></article>
      </main>
      <Footer />
    </>
  );
}
