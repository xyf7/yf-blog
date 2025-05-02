import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "yufeng的博客",
  description: "我的一些思考，希望对你有用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`mx-auto my-2 min-h-screen p-2 md:max-w-[1500] ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mx-auto flex max-w-[1024] flex-col">{children}</div>
      </body>
    </html>
  );
}
