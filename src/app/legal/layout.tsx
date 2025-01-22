export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="lg:prose-x prose mx-auto mb-20 mt-8 max-w-screen-md px-4 dark:prose-invert">
      {children}
    </div>
  );
}
