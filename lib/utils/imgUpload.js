// import ImageKit from "imagekit";
// const imagekit = new ImageKit({
//   publicKey: "public_G1mBGH4ynRy46gzsggJdCguDRZA=",
//   privateKey: "private_Df2/XKDIEaIDztFzQ+tAJVmKAOI=",
//   urlEndpoint: "https://ik.imagekit.io/padeusnha",
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
import axios from "axios";

export const uploadAndGetUrl = async (url, fileName = url.split("/").pop()) => {
  try {
    const file = await (await fetch(url)).blob();
    const formData = new FormData();
    console.log({cb:formData._blob});
    formData.append("file", file, fileName);
    formData.append("fileName", fileName);
    const encoder = new FormDataEncoder(formData);
    const m = encoder.encode();
    const t = [];
    for await (const chunk of m) {
      t.push(chunk);
    }
    const r = new Uint8Array(t.reduce((a, b) => a.length + b.length, 0));
    let p = 0;
    for (let k of t) {
      r.set(p, k);
      p += k.length;
    }

    console.log("Uploading ", url, fileName);
    var options = {
      method: "post",
      url: "https://www.google.com",
      auth: {
        username: "private_Df2/XKDIEaIDztFzQ+tAJVmKAOI=",
        password: "",
      },
      maxBodyLength: Infinity,
      data: formDataToBlob(r),
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const result = await axios(options);
    console.log({ result });
    throw "9";
    return result.url;
  } catch (e) {
    console.log(e.stack);
    throw e;
  }
};
