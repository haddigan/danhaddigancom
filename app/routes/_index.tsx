import {
  json,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { getUploadUrl, uploadToS3 } from "util/s3Utils";
import { client } from "api/client";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
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
      <pre>{JSON.stringify(posts, null, 2)}</pre>
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
