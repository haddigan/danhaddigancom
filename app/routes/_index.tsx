import {
  json,
  type MetaFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { client } from "util/api";

export const meta: MetaFunction = () => {
  return [
    { title: "DanHaddigan.com" },
    {
      name: "description",
      content: "Well, you made it this far; you may as well come inside.",
    },
  ];
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="grid grid-cols-3 gap-1 py-2">
        {posts?.Items?.map((post) => (
          <div
            key={post.id}
            className="relative w-full pt-[100%] overflow-hidden bg-gray-300"
          >
            <Link to={`post/${post.id}`}>
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 object-cover"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const posts = await client(request).allPosts.query();

  return json({ posts });
};
