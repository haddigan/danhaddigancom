import { Form } from "@remix-run/react";
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { getUploadUrl, uploadToS3 } from "util/s3Utils";
import { client } from "api/client";

export const loader = async () => {
  const data = await client.allPosts.query();
  const uploadUrl = await getUploadUrl();

  return json({ posts: data, uploadUrl });
};

export default function CreatePost() {
  return (
    <div>
      <Form method="post" encType="multipart/form-data">
        <div>
          Select a file:
          <input type="file" accept="image/*" name="uploadFile" />
          <input name="title" placeholder="Title" />
          <input name="caption" placeholder="Caption" />
        </div>
        <button type="submit">Submit</button>
      </Form>
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

  return redirect("/");
};