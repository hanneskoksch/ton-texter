import { AppRouter } from "@/trpc";
import { createTRPCReact } from "@trpc/react-query";

// Initializes a React Query client for trpc with the AppRouter.
export const trpc = createTRPCReact<AppRouter>({});
