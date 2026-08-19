import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"posts">;

const legacyPostOverrides: Record<
  string,
  { format: "post"; slug?: string } | { format: "none" }
> = {
  "docker-compose": { format: "post" },
  "fork-sync-workflow": { format: "none" },
  "shared-huggingface-cache": {
    format: "post",
    slug: "shared-hf-cache",
  },
};

export const legacyPostPath = (post: Post): string | undefined => {
  const override = legacyPostOverrides[post.id];
  if (override?.format === "none") return undefined;

  if (!override && post.data.kind === "stream") {
    return `/stream/${post.id}/`;
  }

  const year = post.data.date.getUTCFullYear();
  const month = String(post.data.date.getUTCMonth() + 1).padStart(2, "0");
  return `/posts/${year}/${month}/${override?.slug ?? post.id}/`;
};
