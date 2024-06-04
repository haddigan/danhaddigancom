import { initTRPC, TRPCError } from "@trpc/server";
import { Resource } from "sst";
import { createContext } from "./context";
import jwt from "jsonwebtoken";

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async function isAuthed(
  opts
) {
  const authHeader = opts?.ctx?.event?.headers?.["authorization"];
  const token = authHeader?.split(" ")[1] ?? "";

  try {
    const user = jwt.verify(token, Resource.EncryptionSecret.value);

    return opts.next({
      ctx: {
        user,
      },
    });
  } catch (err) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
});
