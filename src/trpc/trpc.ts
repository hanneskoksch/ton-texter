import { createClient } from "@/lib/supabase/server";
import { TRPCError, initTRPC } from "@trpc/server";

/**
 * This file initializes tRPC backend,
 * sets up authentication middleware, and exports router and procedure helpers.
 *
 * Should be done only once per backend!
 **/

const t = initTRPC.create();
const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      userId: user.id,
      user,
    },
  });
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
