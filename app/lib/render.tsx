import { marked } from "marked";
import { highlight } from "sugar-high";

function parseCode(htmlContent: string) {
  const codeRegex = /(<code[\s\S]*?>)([\s\S]*?)(<\/code>)/g;
  htmlContent = htmlContent.replace(
    codeRegex,
    (_, openingTag, codeContent, closingTag) => {
      const highlightedContent = highlight(codeContent);
      return `${openingTag}${highlightedContent}${closingTag}`;
    },
  );
  return htmlContent;
}

export async function MarkdownRender({ mdContent }: { mdContent: string }) {
  let markup = await marked.parse(mdContent);
  markup = parseCode(markup);
  return (
    <article
      dangerouslySetInnerHTML={{ __html: markup }}
      className="prose prose-pre:bg-gray-200"
    />
  );
}

export async function directRender(markdown: string) {
  return await marked.parse(markdown);
}
