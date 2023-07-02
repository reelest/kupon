import ImageKit from "imagekit";
const imagekit = new ImageKit({
  publicKey: "public_G1mBGH4ynRy46gzsggJdCguDRZA=",
  privateKey: "private_Df2/XKDIEaIDztFzQ+tAJVmKAOI=",
  urlEndpoint: "https://ik.imagekit.io/padeusnha",
});
export const uploadAndGetUrl = async (url, fileName = url.split("/").pop()) => {
  try {
    const result = await imagekit.upload({
      file: url,
      fileName: fileName,
    });
    console.log(result);
    throw new Error("Test");
    return result.url;
  } catch (e) {
    console.log(e.stack);
    throw e;
  }
};
