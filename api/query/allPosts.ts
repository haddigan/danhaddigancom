import { PostsTable } from "../db";
export default async function () {
  return PostsTable.query("POST", {
    index: "GSI1",
    limit: 3,
    reverse: true,
  });
}
