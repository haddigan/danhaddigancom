import { useRef, useState } from "react";
import { Form } from "@remix-run/react";
import {
  json,
  redirect,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from "@remix-run/node";
import { getUploadUrl, uploadToS3 } from "util/file";
import { client } from "util/api";
import { ImagePreview } from "~/components/image-preview";
import classNames from "classnames";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const data = await client(request).allPosts.query();
  const uploadUrl = await getUploadUrl();

  return json({ posts: data, uploadUrl });
};

export default function CreatePost() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imgSrc = URL.createObjectURL(file);
      setPreviewUrl(imgSrc);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    (fileInputRef.current as HTMLInputElement).value = "";
  };

  return (
    <div className="container container-xl mx-auto lg:my-16 md:my-8 sm: my-4">
      <Form
        method="post"
        encType="multipart/form-data"
        className="card bg-slate-300 dark:bg-slate-700 max-w-screen-lg mx-auto shadow-xl"
      >
        <div className="card-body">
          <label className="form-control">
            <span className="label-text">
              Title <span className="text-red-500">*</span>
            </span>
            <input
              name="title"
              type="text"
              className="input input-bordered"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              required
            />
          </label>
          {previewUrl && (
            <ImagePreview
              previewSrc={previewUrl}
              onRemoveImage={handleRemoveImage}
            />
          )}
          <label className={classNames("form-control", previewUrl && "hidden")}>
            <span className="label-text">
              Upload a file <span className="text-red-500">*</span>
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              name="uploadFile"
              className="file-input file-input-bordered"
              onChange={handleFileInputChange}
              required
            />
          </label>
          <label className="form-control">
            <span className="label-text">Caption</span>
            <textarea
              name="caption"
              className="textarea textarea-bordered textarea-lg"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
            />
          </label>
        </div>
        <div className="card-body">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const image = formData.get("uploadFile") as File;
  const uploadUrl = await getUploadUrl();
  const imageUrl = await uploadToS3(uploadUrl, image);

  await client(request).addPost.mutate({
    title: formData.get("title") as string,
    caption: formData.get("caption") as string,
    imageUrl,
  });

  return redirect("/");
};
