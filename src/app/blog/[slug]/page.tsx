import { getBlogPosts } from "@/app/blog/blog";
import { CustomMDX } from "@/app/blog/mdx";
import { Avatar } from "@nextui-org/react";
import { format } from "date-fns";
import { notFound } from "next/navigation";

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
        <h1 className="mb-8 mt-6 text-4xl font-semibold tracking-tighter">
          {post.metadata.title}
        </h1>
        <div className="flex items-center space-x-2">
          <Avatar
            src={`https://github.com/${post.metadata.authorGithub}.png?size=50`}
          />
          <p>{post.metadata.author}</p>
          <p>•</p>
          <p>{format(new Date(post.metadata.publishedAt), "dd.MM.yyyy")}</p>
        </div>

        <CustomMDX source={post.content} />
      </article>
    </>
  );
};

export default Page;
