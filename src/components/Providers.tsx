"use client";

import { trpc } from "@/app/_trpc/client";
import { getURL } from "@/utils/utils";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { PropsWithChildren, useState } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getURL()}api/trpc`,
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            {children}
          </NextThemesProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
