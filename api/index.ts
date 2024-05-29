import { z } from "zod";
import { APIGatewayEvent } from "aws-lambda";
import {
  awsLambdaRequestHandler,
  CreateAWSLambdaContextOptions,
} from "@trpc/server/adapters/aws-lambda";
import { initTRPC } from "@trpc/server";
import { allPosts } from "./query";
import { addPost } from "./mutation";

const t = initTRPC.create();
const publicProcedure = t.procedure;

export const router = t.router({
  greet: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return `Hello ${input.name}!`;
    }),
  allPosts: publicProcedure.query(async () => {
    const posts = await allPosts();
    return posts;
  }),
  addPost: publicProcedure
    .input(
      z.object({ title: z.string(), caption: z.string(), photoUrl: z.string() })
    )
    .mutation(async ({ input }) => {
      const response = await addPost(input);
      return response;
    }),
});

export type Router = typeof router;

const createContext = (opts: CreateAWSLambdaContextOptions<APIGatewayEvent>) =>
  opts;

export const handler = awsLambdaRequestHandler({
  router: router,
  createContext,
});
