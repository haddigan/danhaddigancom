import { z } from "zod";
import { APIGatewayEvent } from "aws-lambda";
import {
  awsLambdaRequestHandler,
  CreateAWSLambdaContextOptions,
} from "@trpc/server/adapters/aws-lambda";
import { initTRPC } from "@trpc/server";
import { allPosts, postById } from "./query";
import { addPost, deletePost } from "./mutation";

const t = initTRPC.create();
const publicProcedure = t.procedure;

export const router = t.router({
  allPosts: publicProcedure.query(async () => {
    const posts = await allPosts();
    return posts;
  }),
  addPost: publicProcedure
    .input(
      z.object({ title: z.string(), caption: z.string(), imageUrl: z.string() })
    )
    .mutation(async ({ input }) => await addPost(input)),
  deletePost: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => await deletePost(input)),
  postById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => await postById(input)),
});

export type Router = typeof router;

const createContext = (opts: CreateAWSLambdaContextOptions<APIGatewayEvent>) =>
  opts;

export const handler = awsLambdaRequestHandler({
  router: router,
  createContext,
});
