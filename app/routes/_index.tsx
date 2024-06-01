import {
  json,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData, useFetcher, Link } from "@remix-run/react";
import { getUploadUrl, uploadToS3 } from "util/s3Utils";
import { client } from "api/client";

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
  const fetcher = useFetcher();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <fetcher.Form method="post" encType="multipart/form-data">
        <div>
          Select a file:
          <input type="file" accept="image/*" name="uploadFile" />
          <input name="title" placeholder="Title" />
          <input name="caption" placeholder="Caption" />
        </div>
        <button type="submit">Submit</button>
      </fetcher.Form>
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

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const image = formData.get("uploadFile") as File;
  const uploadUrl = await getUploadUrl();
  const imageUrl = await uploadToS3(uploadUrl, image);

  await client.addPost.mutate({
    title: formData.get("title") as string,
    caption: formData.get("caption") as string,
    imageUrl,
  });

  return {};
};

export const loader = async () => {
  const data = await client.allPosts.query();
  const uploadUrl = await getUploadUrl();

  return json({ posts: data, uploadUrl });
};
