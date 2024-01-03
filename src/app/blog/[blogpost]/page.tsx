import { notFound, redirect } from "next/navigation";
import { join } from "path";
import { readFileSync, readdirSync } from "fs";
import { bundleMDX } from "mdx-bundler";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { User } from "@nextui-org/react";
import { getMDXComponent } from "mdx-bundler/client";

interface PageProps {
  params: {
    blogpost: string;
  };
}

const Page = async ({ params }: PageProps) => {
  // retrieve the blogpost name from the URL
  const { blogpost } = params;

  // read and bundle MDX source code
  let mdxSource;
  try {
    const filePath = join(process.cwd(), "src/content/blog", `${blogpost}.mdx`);
    mdxSource = readFileSync(filePath, "utf8");
  } catch (e) {
    notFound();
  }
  const bundleResult = await bundleMDX({ source: mdxSource });
  const BlogPost = getMDXComponent(bundleResult.code);

  return (
    <MaxWidthWrapper className="mt-8 ">
      <h1 className="pt-16 pb-10 text-2xl text-center">
        {bundleResult.matter.data.title}
      </h1>
      <div className="flex justify-center gap-12 py-6 pt-4">
        <User
          name={bundleResult.matter.data.author}
          description="Product Designer"
          avatarProps={{
            src: `https://github.com/${bundleResult.matter.data.authorGithub}.png?size=50`,
          }}
        />
        <p>{bundleResult.matter.data.date}</p>
      </div>
      {/* <article className="text-">{bundleResult.matter.content}</article> */}
      <BlogPost />
    </MaxWidthWrapper>
  );
};

export default Page;
