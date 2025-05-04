import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Posts } from "@/components/posts";

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
