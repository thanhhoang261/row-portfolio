import { config, collection, fields } from "@keystatic/core";

const repo = (process.env.NEXT_PUBLIC_KEYSTATIC_REPO ??
  "your-github-user/row-portfolio") as `${string}/${string}`;

const postFields = {
  title: fields.slug({ name: { label: "Title" } }),
  description: fields.text({ label: "Description", multiline: true }),
  date: fields.date({ label: "Date", validation: { isRequired: true } }),
  tags: fields.array(fields.text({ label: "Tag" }), {
    label: "Tags",
    itemLabel: (props) => props.value,
  }),
  draft: fields.checkbox({ label: "Draft", defaultValue: false }),
  content: fields.mdx({ label: "Content" }),
};

export default config({
  // GitHub mode (commits via a GitHub App) when NEXT_PUBLIC_KEYSTATIC_STORAGE=github,
  // otherwise local mode (writes files directly; dev only).
  storage:
    process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github"
      ? { kind: "github", repo }
      : { kind: "local" },
  collections: {
    postsVi: collection({
      label: "Bài viết (VI)",
      slugField: "title",
      path: "content/posts/vi/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: postFields,
    }),
    postsEn: collection({
      label: "Posts (EN)",
      slugField: "title",
      path: "content/posts/en/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: postFields,
    }),
  },
});
