import { Post } from "db";
export default async function (postId: string) {
  const postKey = { SK: "METADATA", PK: `POST#${postId}` };
  return (await Post.get(postKey)).Item as {
    id: string;
    title: string | undefined;
    caption: string | undefined;
    imageUrl?: string | undefined;
    created: string;
    modified: string;
    entity: string;
  };
}
