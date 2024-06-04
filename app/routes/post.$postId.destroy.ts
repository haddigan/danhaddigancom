import { client } from "util/api";
import { type ActionFunctionArgs, redirect } from "@remix-run/node";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  if (!params.postId) throw new Error("No postId provided");
  await client(request).deletePost.mutate(params.postId);
  return redirect("/");
};
