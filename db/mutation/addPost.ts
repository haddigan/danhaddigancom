import { humanId } from "human-id";
import { Post } from "db";

export interface PostUserData {
  title: string;
  caption: string;
  imageUrl: string;
}
export default function addPost({ title, caption, imageUrl }: PostUserData) {
  const id = humanId({ separator: "-", capitalize: false });
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
