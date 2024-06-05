import { Resource } from "sst";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { humanId } from "human-id";

export async function getUploadUrl() {
  const command = new PutObjectCommand({
    Key: humanId(),
    Bucket: Resource.ImageBucket.name,
  });

  return await getSignedUrl(new S3Client({}), command);
}

export async function uploadToS3(uploadUrl: string, image: File) {
  const uploadedResult = await fetch(uploadUrl, {
    body: image,
    method: "PUT",
    headers: {
      "Content-Type": image.type,
      "Content-Disposition": `attachment; filename="${image.name}"`,
    },
  });

  return uploadedResult.url.split("?")[0];
}
