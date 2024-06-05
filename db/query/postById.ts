import { Post, type IPost } from "db";
export default async function (postId: string) {
  const postKey = { SK: "METADATA", PK: `POST#${postId}` };
  return (await Post.get(postKey)).Item as IPost;
}
