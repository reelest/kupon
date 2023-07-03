import { uploadAndGetUrl } from "../utils/imgUpload";

export default async function processImages(images) {
  console.log("processing images");

  try {
    const result = images
      ? JSON.stringify(await Promise.all(images.map((e) => uploadAndGetUrl(e))))
      : "[]";
    console.log("processed images");
    return result;
  } catch (e) {
    console.log("An error occured ", e);
    throw e;
  }
}
