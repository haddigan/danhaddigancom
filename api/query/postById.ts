import { Post } from "db";
export default async function (postId: string) {
  const post = { SK: "METADATA", PK: `POST#${postId}` };
  return Post.get(post);
}
