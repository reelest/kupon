import { uploadAndGetUrl } from "../utils/imgUpload";

export default async function processImages(images) {
  return images
    ? JSON.stringify(await Promise.all(images.map((e) => uploadAndGetUrl(e))))
    : "[]";
}
