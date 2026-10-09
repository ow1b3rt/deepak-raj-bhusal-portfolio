"use client";

import { PostForm, useGet } from "@/packages/admin";

export function PostWrapper({ id, onSubmit }) {
  const { data } = useGet("/blogs/" + id);

  return <PostForm defaults={data?.item} onSubmit={onSubmit} />;
}
