// import ImageKit from "imagekit";
// const imagekit = new ImageKit({
//   publicKey: "public_G1mBGH4ynRy46gzsggJdCguDRZA=",
//   privateKey: "private_Df2/XKDIEaIDztFzQ+tAJVmKAOI=",
//   urlEndpoint: "https://ik.imagekit.io/padeusnha",
//})
import axios from "axios";
export const uploadAndGetUrl = async (url, fileName = url.split("/").pop()) => {
  console.log("Uploading ", url);
  const file = await (await fetch(url)).blob();
  const formData = new FormData();
  formData.append("file", file, fileName);
  formData.append("fileName", fileName);

  console.log("Converting to blob ", url);
  /** @type {Blob} */
  const r = formData._blob();
  /** @type {import("axios").AxiosRequestConfig} */
  console.log("Uploading ", url);
  var options = {
    method: "post",
    url:
      // "http://192.168.43.214:3000" ||
      "https://upload.imagekit.io/api/v1/files/upload",
    auth: {
      username: "private_Df2/XKDIEaIDztFzQ+tAJVmKAOI=",
      password: "",
    },
    formSerializer: () => r,
    maxBodyLength: Infinity,
    data: r,
    headers: {
      "Content-Type": r.type,
      Connection: "close",
      "User-Agent": "axios/0.27.2",
    },
  };
  const { data } = await axios(options);
  return data.url;
};

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
