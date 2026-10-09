"use client";

import { useParams, useRouter } from "next/navigation";
import { PostForm } from "@/packages/admin";

import { PostWrapper } from "@/components/organisms/PostWrapper";

export default function NewsArticleEditor() {
  const { id } = useParams();
  const router = useRouter();
  const isNew = id === "new";

  return isNew ? (
    <PostForm onSubmit={() => router.push("/admin/blogs")} />
  ) : (
    <PostWrapper id={id} onSubmit={() => router.push("/admin/blogs")} />
  );
}
