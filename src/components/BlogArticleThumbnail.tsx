import Link from "next/link";
import { readFileSync } from "fs";
import { join } from "path";
import { bundleMDX } from "mdx-bundler";
import { format } from "date-fns";

async function BlogArticleThumbnail({ urlTitle }: { urlTitle: string }) {
  const filePath = join(process.cwd(), "src/content/blog", `${urlTitle}.mdx`);
  const mdxSource = readFileSync(filePath, "utf8");
  const bundleResult = await bundleMDX({ source: mdxSource });

  return (
    <div className="text-left m-2">
      <Link href={`/blog/${urlTitle}`}>
        <p className="font-semibold">{bundleResult.matter.data.title}</p>
        <div className="text-default-500 divide-default divide-y">
          <p className="text-sm pb-1">
            {bundleResult.matter.content.substring(0, 200)}...
          </p>
          <div className="flex justify-between">
            <p className="text-sm">
              {format(new Date(bundleResult.matter.data.date), "dd.MM.yyyy")}
            </p>
            <p className="text-sm">von {bundleResult.matter.data.author}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BlogArticleThumbnail;
