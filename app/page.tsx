import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { Posts } from "@/app/components/posts";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <section className="mt-20 space-y-2">
          <h2>杂文更新：</h2>
          <Posts maxItem={3} />
          <Link href="/blog" className="underline">
            ...
          </Link>
        </section>

        <section className="mt-20 space-y-2">
          <h2>一些微小的贡献：</h2>
          <Link
            href="https://www.pronounce-chinese.com/"
            className="visited:text-gray-400"
          >
            pronounce-chinese.com: 协助英语母语人士念对拼音 (WIP)
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
