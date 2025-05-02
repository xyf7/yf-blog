import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { getAboutContent } from "@/app/lib/io";
import { directRender } from "@/app/lib/render";

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
