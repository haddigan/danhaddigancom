import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "./trpc";
import { allPosts, postById } from "./query";
import { addPost, deletePost } from "./mutation";

export const appRouter = router({
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

export type AppRouter = typeof appRouter;
