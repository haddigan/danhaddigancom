import { useLoaderData, Form, useOutletContext } from "@remix-run/react";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { client } from "util/api";

export default function Post() {
  const post = useLoaderData<typeof loader>();
  const { isAdmin } = useOutletContext<{ isAdmin: boolean }>();

  return (
    <div className="card lg:card-side shadow-xl bg-slate-300 dark:bg-slate-700 dark:text-slate-100 items-start">
      <figure className="basis-3/4">
        <img src={post.imageUrl} alt={post.caption} />
      </figure>
      <div className="card-body basis-1/4">
        <h1 className="card-title">{post.title}</h1>
        <p className="overflow-y-auto">
          <p className="max-h-[60vh]">{post.caption}</p>
        </p>
        {isAdmin && (
          <div className="card-actions">
            <Form method="post" action="destroy">
              <button type="submit" className="btn btn-error">
                Delete
              </button>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const postId = params.postId;
  if (!postId) throw new Error("No postId provided");
  const post = await client(request).postById.query(postId);
  return json(post);
};
