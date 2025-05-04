import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const filePath = path.join(process.cwd(), "content", "posts");

// return ['*.md', ...] in directory
async function getMarkdownFiles(dir: string) {
  try {
    const files = await readdir(dir);
    return files.filter((elem) => path.extname(elem) === ".md");
  } catch (err) {
    console.error(err);
  }
}

// separate a .md to {frontmatter, content}
async function separateMD(filePath: string) {
  try {
    const file = await readFile(filePath, "utf8");
    const metaRegex = /---\s*([\s\S]*?)\s*---/;
    const match = metaRegex.exec(file);

    if (!match) throw new Error("Frontmatter not found");

    const metaData = match[1];
    const metaLines = metaData.split("\n");

    const frontmatter: Record<string, string> = {};
    metaLines.forEach((elem) => {
      const [key, ...valueArr] = elem.split(":");
      let value = valueArr.join(":").trim();
      value = value.replace(/^["'](.*)["']$/, "$1").trim();

      frontmatter[key.trim()] = value;
    });

    frontmatter["slug"] = frontmatter["slug"] || makeSlug(frontmatter["title"]);

    const content = file.replace(metaRegex, "");
    return { frontmatter, content };
  } catch (err) {
    console.error(err);
  }
}

// return [{post.xxx, ...}, ...] metadata for all .md files
export async function getPostList() {
  try {
    const mdFiles = await getMarkdownFiles(filePath);
    const postList = [];

    if (!mdFiles) return [];
    for (let elem of mdFiles) {
      const result = await separateMD(path.join(filePath, elem));
      if (!result) continue;
      const { frontmatter } = result;
      postList.push(frontmatter);
    }
    return postList;
  } catch (err) {
    console.error(err);
  }
}

export async function getPostContent(slug: string) {
  try {
    const mdFiles = await getMarkdownFiles(filePath);

    if (!mdFiles) return;
    for (const filename of mdFiles) {
      const result = await separateMD(path.join(filePath, filename));
      if (!result) continue;
      const { frontmatter: metadata, content } = result;
      if (metadata.slug === slug) return { metadata, content };
    }
  } catch (err) {
    console.error(err);
  }
}

// convert title string to slug style
function makeSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s*]/g, "-")
    .replace(/[-+]/g, "-");
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
