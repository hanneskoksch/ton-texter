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
    <div className="mt-4 pt-4 ">
      <h1 className="pt-2 pb-10 text-2xl text-center">{post.metadata.title}</h1>
      <div className="flex justify-center gap-12 py-6 pt-4 items-center">
        <User
          name={post.metadata.author}
          description={post.metadata.authorRole}
          avatarProps={{
            src: `https://github.com/${post.metadata.authorGithub}.png?size=50`,
          }}
        />
        <p>{new Date(post.metadata.publishedAt).toLocaleDateString("de")}</p>
      </div>
      <article className="prose dark:prose-invert">
        <MDXRemote source={post.content} />
      </article>
    </div>
  );
};

export default Page;
