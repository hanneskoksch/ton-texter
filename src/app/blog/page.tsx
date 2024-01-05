import { Metadata } from "next";
import { getBlogPosts } from "./blog";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Lies mehr über unsere Software-Design-Entscheidungen und was uns sonst noch im Projekt beschäftigt hat.",
};

export default function BlogPage() {
  let allBlogs = getBlogPosts();

  return (
    <div className="mt-16">
      <h1 className="font-medium text-2xl mb-2 tracking-tighter">Unser Blog</h1>
      <p className="mb-8 text-default-500">
        Lies mehr über unsere Software-Design-Entscheidungen und was uns sonst
        noch im Projekt beschäftigt hat.
      </p>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
              <p className="text-default-500">
                {new Date(post.metadata.publishedAt).toLocaleDateString("de")} •
                von {post.metadata.author}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
