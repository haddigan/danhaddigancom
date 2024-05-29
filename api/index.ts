import { z } from "zod";
import { APIGatewayEvent } from "aws-lambda";
import {
  awsLambdaRequestHandler,
  CreateAWSLambdaContextOptions,
} from "@trpc/server/adapters/aws-lambda";
import { initTRPC } from "@trpc/server";
import { allPosts } from "./query";

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
    return posts.Items;
  }),
});

export type Router = typeof router;

const createContext = (opts: CreateAWSLambdaContextOptions<APIGatewayEvent>) =>
  opts;

export const handler = awsLambdaRequestHandler({
  router: router,
  createContext,
});
