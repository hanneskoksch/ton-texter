export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div
      className="mx-auto max-w-screen-md px-4 mt-8 mb-20 prose dark:prose-invert lg:prose-x"
      style={{}}
    >
      {children}
    </div>
  );
}
