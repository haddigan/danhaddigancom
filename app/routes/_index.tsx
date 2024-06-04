import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
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
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gridGap: "15px",
        }}
      >
        {posts?.Items?.map((post) => (
          <div key={post.id}>
            <Link to={`post/${post.id}`}>
              <img
                src={post.imageUrl}
                alt={post.caption}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
