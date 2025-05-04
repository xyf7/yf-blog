"use client";

export function TimePast({ date }: { date: string }) {
  const now = new Date();
  const then = new Date(date);
  const past = Math.floor(
    (now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24),
  );
  return <span className="pl-6 text-xs">{past + " 天前发布"}</span>;
}
