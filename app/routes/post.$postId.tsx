import { useLoaderData, Form } from "@remix-run/react";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { client } from "util/api";

export default function Post() {
  const post = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.imageUrl} alt={post.caption} />
      <p>{post.caption}</p>
      <Form method="post" action="destroy">
        <button type="submit">Delete</button>
      </Form>
    </div>
  );
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const postId = params.postId;
  if (!postId) throw new Error("No postId provided");
  const post = await client(request).postById.query(postId);
  return json(post);
};
