import { notFound } from "next/navigation";
import { User } from "@nextui-org/react";
import { getBlogPosts } from "@/app/blog/blog";
import { MDXRemote } from "next-mdx-remote/rsc";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <article className="prose dark:prose-invert">
        <h1 className="font-semibold text-4xl tracking-tighter mt-2 mb-8">
          {post.metadata.title}
        </h1>
        <div className="flex gap-3">
          <User
            name={post.metadata.author}
            avatarProps={{
              src: `https://github.com/${post.metadata.authorGithub}.png?size=50`,
            }}
          />
          <p>•</p>
          <p>{new Date(post.metadata.publishedAt).toLocaleDateString("de")}</p>
        </div>

        <MDXRemote source={post.content} />
      </article>
    </>
  );
};

export default Page;
