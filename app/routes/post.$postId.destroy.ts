import { client } from "api/client";
import { type ActionFunctionArgs, redirect } from "@remix-run/node";

export const action = async ({ params }: ActionFunctionArgs) => {
  if (!params.postId) throw new Error("No postId provided");
  await client.deletePost.mutate(params.postId);
  return redirect("/");
};
