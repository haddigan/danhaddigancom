import {
  json,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { client } from "api/client";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const data = useLoaderData();
  const fetcher = useFetcher();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <fetcher.Form method="post">
        <input name="title" placeholder="Title" />
        <input name="caption" placeholder="Caption" />
        <input name="photoUrl" placeholder="Photo Url" />
        <button type="submit">Submit</button>
      </fetcher.Form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  await client.addPost.mutate({
    title: formData.get("title") as string,
    caption: formData.get("caption") as string,
    photoUrl: formData.get("photoUrl") as string,
  });

  return {};
};

export const loader = async () => {
  const data = await client.allPosts.query();

  return json(data);
};
