import { nanoid } from "nanoid";
import { Post } from "api/db";

export interface PostUserData {
  title: string;
  caption: string;
  imageUrl: string;
}
export default function addPost({ title, caption, imageUrl }: PostUserData) {
  const id = nanoid(9);
  const post = {
    PK: `POST#${id}`,
    SK: "METADATA",
    GSI1PK: "POST",
    createdAt: new Date().toISOString(),
    id,
    title,
    caption,
    imageUrl,
  };

  return Post.put(post);
}
