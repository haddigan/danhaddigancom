import { useLoaderData, Form } from "@remix-run/react";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { client } from "util/api";

export default function Post() {
  const post = useLoaderData<typeof loader>();

  return (
    // TODO: Figure out this alias issue
    <div>
      {/* @ts-expect-error these aren't aliased like they should be */}
      <h1>{post.title}</h1>
      {/* @ts-expect-error these aren't aliased like they should be */}
      <img src={post.imageUrl} alt={post.caption} />
      {/* @ts-expect-error these aren't aliased like they should be */}
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
  return json(post.Item);
};
