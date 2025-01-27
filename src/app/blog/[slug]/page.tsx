import { getBlogPosts } from "@/app/blog/blog";
import { CustomMDX } from "@/app/blog/mdx";
import { getURL } from "@/utils/utils";
import { format } from "date-fns";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Author from "../Author";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  props: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata | undefined> {
  const params = await props.params;
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let { title, publishedAt: publishedTime, description, image } = post.metadata;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${getURL()}blog/${post.slug}`,
      images: [...previousImages],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const Page = async (props: PageProps) => {
  const params = await props.params;
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
          <Author
            name={post.metadata.author}
            gitHubName={post.metadata.authorGithub}
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
