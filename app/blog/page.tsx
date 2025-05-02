import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { Posts } from "@/app/components/posts";

export default function Page() {
  return (
    <>
      <Header />
      <main className="mt-20">
        <section className="space-y-2">
          <h1>文字集合</h1>
          <Posts />
        </section>
        <Footer />
      </main>
    </>
  );
}
