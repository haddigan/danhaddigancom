import { Post } from "db";

export default function deletePost(postId: string) {
  const post = {
    PK: `POST#${postId}`,
    SK: "METADATA",
  };

  return Post.delete(post);
}
