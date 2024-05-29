import { nanoid } from "nanoid";
import { Post } from "api/db";

export interface PostUserData {
  title: string;
  caption: string;
  photoUrl: string;
}
export default function addPost({ title, caption, photoUrl }: PostUserData) {
  const id = nanoid(9);
  const post = {
    PK: `POST#${id}`,
    SK: "METADATA",
    GSI1PK: "POST",
    createdAt: new Date().toISOString(),
    id,
    title,
    caption,
    photoUrl,
  };

  return Post.put(post);
}
