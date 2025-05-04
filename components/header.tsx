"use client";
import Link from "next/link";
import { GithubSvg } from "@/components/githubSvg";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  return (
    <header>
      <nav className="flex items-center space-x-10">
        <span>&gt;</span>
        <Link
          href="/"
          className={pathname === "/" ? "border-b-2 border-blue-500" : ""}
        >
          首页
        </Link>
        <Link
          href="/blog"
          className={
            pathname.startsWith("/blog") ? "border-b-2 border-blue-500" : ""
          }
        >
          杂文
        </Link>
        <Link
          href="/about"
          className={pathname === "/about" ? "border-b-2 border-blue-500" : ""}
        >
          关于我
        </Link>
        <span className="mr-10 ml-auto">
          <GithubSvg />
        </span>
      </nav>
    </header>
  );
}
