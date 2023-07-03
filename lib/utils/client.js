const Imagekit = require("imagekit");
const fs = require("fs");
const client = new Imagekit({
  publicKey: "public_G1mBGH4ynRy46gzsggJdCguDRZA=",
  privateKey: "private_Df2/XKDIEaIDztFzQ+tAJVmKAOI=",
  urlEndpoint: "https://ik.imagekit.io/padeusnha",
  uploadEndpoint: "http://localhost:3000",
});
(async () => {
  console.log(
    await client.upload({
      file: fs.readFileSync("./assets/splash.png"),
      fileName: "splash.png",
    })
  );
})();
"Accept",
  "application/json, text/plain, */*",
  "content-type",
  "multipart/form-data; boundary=--------------------------721647223287297010609811",
  "User-Agent",
  "axios/0.27.2",
  "Host",
  "localhost:3000",
  "Authorization",
  "Basic cHJpdmF0ZV9EZjIvWEtESUVhSUR6dEZ6USt0QUpWbUtBT0k9Og==",
  "Connection",
  "close",
  "Transfer-Encoding",
  "chunked";
