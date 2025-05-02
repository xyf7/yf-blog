import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const aboutPath = ["content", "about.md"];

export async function getAboutContent() {
  const filePath = path.join(process.cwd(), ...aboutPath);
  return await readFile(filePath, "utf8");
}
