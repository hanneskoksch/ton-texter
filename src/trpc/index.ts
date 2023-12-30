import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { createClient } from "@/lib/supabase/server";

/**
 * This is the router that will be used by the server.
 * It contains all the procedures that can be called by the client.
 */
export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    // get current user from auth service
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

    // check if user is already in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      // if user ist not yet in db, create user in db
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
          name: "Herr Hardgecodet",
        },
      });
    }

    return { success: true };
  }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
