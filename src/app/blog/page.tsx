import { format } from "date-fns";
import { Metadata } from "next";
import Link from "next/link";
import Author from "./Author";
import { getBlogPosts } from "./blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Lies mehr über unsere Software-Design-Entscheidungen und was uns sonst noch im Projekt beschäftigt hat.",
};

export default function BlogPage() {
  let allBlogs = getBlogPosts();

  return (
    <div className="mt-16">
      <h1 className="mb-2 text-2xl font-medium tracking-tighter">Unser Blog</h1>
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
            className="mb-4 flex flex-col rounded-lg border-2 border-solid border-default-100 bg-default-50 p-2 hover:bg-background"
            href={`/blog/${post.slug}`}
          >
            <div className="flex justify-between space-x-2">
              <p className="tracking-tight text-neutral-900 dark:text-neutral-100">
                {post.metadata.title}
              </p>
              <p className="max-w-fit text-default-500">
                {format(new Date(post.metadata.publishedAt), "dd.MM.yyyy")}
              </p>
            </div>

            <p className="text-default-500">{post.metadata.description}</p>
            <div className="flex items-center space-x-2">
              <Author
                name={post.metadata.author}
                gitHubName={post.metadata.authorGithub}
              />
              <p className="text-default-500">{post.metadata.author}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
