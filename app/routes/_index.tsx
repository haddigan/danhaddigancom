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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: ".25rem",
        }}
      >
        {posts?.Items?.map((post) => (
          <div
            key={post.id}
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "100%",
              overflow: "hidden",
              background: "#ccc",
            }}
          >
            <Link to={`post/${post.id}`}>
              <img
                src={post.imageUrl}
                alt={post.caption}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "100%",
                  height: "100%",
                  transform: "translate(-50%, -50%)",
                  objectFit: "cover",
                }}
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
