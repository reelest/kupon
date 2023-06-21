import ImageKit from "imagekit-javascript";
const imagekit = new ImageKit({
  publicKey: "public_G1mBGH4ynRy46gzsggJdCguDRZA=",
  privateKey: "private_Df2/XKDIEaIDztFzQ+tAJVmKAOI=",
  urlEndpoint: "https://ik.imagekit.io/padeusnha",
});
export const uploadAndGetUrl = async (fileName, url) => {
  const result = await imagekit.upload({
    file: url,
    fileName: fileName,
  });
  return result.url;
}