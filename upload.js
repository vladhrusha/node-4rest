// const https = require("https");
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");
const { HttpRequest } = require("@aws-sdk/protocol-http");
const {
  getSignedUrl,
  S3RequestPresigner,
} = require("@aws-sdk/s3-request-presigner");
const { parseUrl } = require("@aws-sdk/url-parser");
const { formatUrl } = require("@aws-sdk/util-format-url");
const { Hash } = require("@aws-sdk/hash-node");

const createPresignedUrlWithoutClient = async ({ region, bucket, key }) => {
  const url = parseUrl(`https://s3.${region}.amazonaws.com/${bucket}/${key}`);
  const presigner = new S3RequestPresigner({
    credentials: fromIni({
      accessKeyId: "AKIAQGWHUPLHSTYNNM4F",
      secretAccessKey: "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",
    }),
    region,
    sha256: Hash.bind(null, "sha256"),
  });
  const signedUrlObject = await presigner.presign(
    new HttpRequest({ ...url, method: "PUT" }),
  );
  return formatUrl(signedUrlObject);
};

const createPresignedUrlWithClient = ({ region, bucket, key }) => {
  const client = new S3Client({
    region,
    credentials: {
      accessKeyId: "AKIAQGWHUPLHSTYNNM4F",
      secretAccessKey: "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",
    },
  });
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

// function put(url, data) {
//   return new Promise((resolve, reject) => {
//     const req = https.request(
//       url,
//       { method: "PUT", headers: { "Content-Length": new Blob([data]).size } },
//       (res) => {
//         let responseBody = "";
//         res.on("data", (chunk) => {
//           responseBody += chunk;
//         });
//         res.on("end", () => {
//           resolve(responseBody);
//         });
//       },
//     );
//     req.on("error", (err) => {
//       reject(err);
//     });
//     req.write(data);
//     req.end();
//   });
// }

// const main = async () => {
//   const REGION = "eu-north-1";
//   const BUCKET = "5.4useravatars";
//   const KEY = "undefined-avatar.jpg";

//   // 1. Use createPresignedUrl without the S3 client.
//   // 2. Use getSignedUrl in conjunction with the S3 client and GetObjectCommand.
//   try {
//     const noClientUrl = await createPresignedUrlWithoutClient({
//       region: REGION,
//       bucket: BUCKET,
//       key: KEY,
//     });

//     // const clientUrl = await createPresignedUrlWithClient({
//     //   region: REGION,
//     //   bucket: BUCKET,
//     //   key: KEY,
//     // });

//     // After you get the presigned URL, you can provide your own file
//     // data. Refer to put() above.
//     console.log("Calling PUT using presigned URL without client");
//     console.log(noClientUrl);

//     // await put(noClientUrl, "Hello World");

//     // console.log("Calling PUT using presigned URL with client");
//     // await put(clientUrl, "Hello World");

//     console.log("\nDone. Check your S3 console.");
//     return;
//   } catch (err) {
//     console.error(err);
//   }
// };

module.exports = {
  createPresignedUrlWithoutClient,
  createPresignedUrlWithClient,
  // put,
  // main,
};
