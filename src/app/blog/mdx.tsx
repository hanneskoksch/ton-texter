import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

interface CustomLinkProps {
  href: string;
  children: any;
}

function CustomLink(props: CustomLinkProps) {
  let href = props.href;

  if (href.startsWith("/")) {
    return <Link {...props}>{props.children}</Link>;
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  // external links
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

let components = {
  a: CustomLink,
};

export function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
