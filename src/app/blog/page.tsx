import BlogArticleThumbnail from "@/components/BlogArticleThumbnail";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Metadata } from "next";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { bundleMDX } from "mdx-bundler";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function Home() {
  const paths = readdirSync(join(process.cwd(), "src/content/blog"));
  const filenames = paths.map((path) => path.replace(/\.mdx/, ""));

  //   const mdxSource = readFileSync(paths, "utf8");
  //   const bundleResult = await bundleMDX({ source: mdxSource });

  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center mb-12 text-center mt-28 sm:mt-40">
      <h1 className="text-4xl m-4">Blog</h1>
      <div className="md:grid md:grid-cols-3 md:gap-10">
        {filenames.map((fileName) => (
          <div key={"1"}>
            <BlogArticleThumbnail urlTitle={fileName} />
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
