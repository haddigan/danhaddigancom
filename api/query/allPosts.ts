import { PostsTable } from "../db";
export default async function () {
  return PostsTable.query("POST", { limit: 10, reverse: true });
}
