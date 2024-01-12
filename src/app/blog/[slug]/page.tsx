import { notFound } from "next/navigation";
import { User } from "@nextui-org/react";
import { getBlogPosts } from "@/app/blog/blog";
import { CustomMDX } from "@/app/blog/mdx";
import { format } from "date-fns";

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
        <div className="flex gap-3">
          <User
            name={post.metadata.author}
            avatarProps={{
              src: `https://github.com/${post.metadata.authorGithub}.png?size=50`,
            }}
          />
          <p>•</p>
          <p>{format(new Date(post.metadata.publishedAt), "dd.MM.yyyy")}</p>
        </div>

        <CustomMDX source={post.content} />
      </article>
    </>
  );
};

export default Page;
