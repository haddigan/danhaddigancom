import { PostsTable, type IPost } from "db";
export default async function () {
  const posts = await PostsTable.query("POST", {
    index: "GSI1",
    limit: 9,
    reverse: true,
  });

  return posts.Items as IPost[];
}
