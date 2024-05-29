import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { PostsTable } from "~/util/db";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const data = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export const loader = async () => {
  const data = await PostsTable.query("POST", { limit: 10, reverse: true });

  return json(data);
};
