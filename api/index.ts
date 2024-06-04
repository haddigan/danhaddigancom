import { z } from "zod";
import {
  awsLambdaRequestHandler,
  type CreateAWSLambdaContextOptions,
} from "@trpc/server/adapters/aws-lambda";
import type { APIGatewayEvent } from "aws-lambda";
import { initTRPC, TRPCError } from "@trpc/server";
import { Resource } from "sst";
import { allPosts, postById } from "./query";
import { addPost, deletePost } from "./mutation";
import jwt from "jsonwebtoken";

const t = initTRPC.context<typeof createContext>().create();
const publicProcedure = t.procedure;

const protectedProcedure = t.procedure.use(async function isAuthed(opts) {
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

export const router = t.router({
  // queries
  allPosts: publicProcedure.query(async () => {
    const posts = await allPosts();
    return posts;
  }),
  postById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => await postById(input)),
  // mutations
  addPost: protectedProcedure
    .input(
      z.object({ title: z.string(), caption: z.string(), imageUrl: z.string() })
    )
    .mutation(async ({ input }) => await addPost(input)),
  deletePost: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => await deletePost(input)),
});

export type Router = typeof router;

const createContext = (opts: CreateAWSLambdaContextOptions<APIGatewayEvent>) =>
  opts;

export const handler = awsLambdaRequestHandler({
  router: router,
  createContext,
});
