"use client";

import parse, { attributesToProps, domToReact } from "html-react-parser";

const options = {
  replace(domNode) {
    if (domNode.type !== "tag") return;

    if (domNode.name === "colgroup" || domNode.name === "col") {
      return <></>;
    }

    if (domNode.name === "table") {
      return (
        <div className="table-wrapper overflow-x-auto">
          <table {...attributesToProps(domNode.attribs)}>
            {domToReact(domNode.children, options)}
          </table>
        </div>
      );
    }
  },
};

const proseClasses = [
  // links
  "[&_a]:inline",
  "[&_.bn-inline-content_a]:cursor-pointer [&_.bn-inline-content_a]:text-blue-600 [&_.bn-inline-content_a]:underline [&_.bn-inline-content_a]:underline-offset-2 [&_.bn-inline-content_a:hover]:text-blue-800",
  "[&_a]:cursor-pointer [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-blue-800",

  // headings
  "[&_h1]:my-4 [&_h1]:text-3xl sm:[&_h1]:my-6 sm:[&_h1]:text-6xl",
  "[&_h2]:my-4 [&_h2]:text-2xl [&_h2]:font-extrabold sm:[&_h2]:my-5 sm:[&_h2]:text-3xl",
  "[&_h3]:my-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:leading-snug sm:[&_h3]:my-6 sm:[&_h3]:text-[1.65rem]",

  // paragraphs
  "[&_p]:my-5 [&_p]:text-base [&_p]:leading-relaxed sm:[&_p]:my-8 sm:[&_p]:text-2xl",

  // blockquote — subtle, not bold/italic
  "[&_blockquote]:my-6 [&_blockquote]:pl-4 [&_blockquote]:border-l-2 [&_blockquote]:border-(--border-lo) [&_blockquote]:text-(--text-lo)",
  "[&_blockquote_p]:my-2",

  // table — actual grid with visible borders
  "[&_table]:my-6 [&_table]:w-full [&_table]:min-w-[480px] [&_table]:border [&_table]:border-collapse [&_table]:border-(--border-nm)",
  "[&_th]:border [&_th]:border-(--border-nm) [&_th]:px-1.25 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold",
  "[&_td]:border [&_td]:border-(--border-nm) [&_td]:px-1.25 [&_td]:py-2.5",

  // lists
  "[&_ul]:my-4 [&_ul]:pl-6 [&_ul]:list-disc",
  "[&_ol]:my-4 [&_ol]:pl-6 [&_ol]:list-decimal",
  "[&_li]:my-1.5 [&_li]:pl-1",
  "[&_li_ul]:my-1 [&_li_ol]:my-1",

  // images
  "[&_img]:h-auto [&_img]:max-w-full",
].join(" ");

export default function ArticleBody({ html, className = "" }) {
  if (!html) return null;

  return (
    <div className={`text-(--text-nm) ${proseClasses} ${className}`}>{parse(html, options)}</div>
  );
}
