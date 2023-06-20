// const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
// const { fromIni } = require("@aws-sdk/credential-providers");
// const { HttpRequest } = require("@aws-sdk/protocol-http");
// const {
//   getSignedUrl,
//   S3RequestPresigner,
// } = require("@aws-sdk/s3-request-presigner");
// const { parseUrl } = require("@aws-sdk/url-parser");
// const { formatUrl } = require("@aws-sdk/util-format-url");
// const { Hash } = require("@aws-sdk/hash-node");

// const createPresignedUrlWithoutClient = async ({ region, bucket, key }) => {
//   //   const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
//   const url = parseUrl(`https://s3.${region}.amazonaws.com/${bucket}/${key}`);

//   const presigner = new S3RequestPresigner({
//     credentials: fromIni(),
//     region,
//     sha256: Hash.bind(null, "sha256"),
//   });

//   const signedUrlObject = await presigner.presign(new HttpRequest(url));
//   return formatUrl(signedUrlObject);
// };

// const createPresignedUrlWithClient = ({ region, bucket, key }) => {
//   const client = new S3Client({ region });
//   const command = new GetObjectCommand({ Bucket: bucket, Key: key });
//   return getSignedUrl(client, command, { expiresIn: 3600 });
// };

// const main = async () => {
//   const REGION = "eu-north-1";
//   const BUCKET = "5.4useravatars";
//   const KEY = "undefined-avatar.jpg";

//   try {
//     const noClientUrl = await createPresignedUrlWithoutClient({
//       region: REGION,
//       bucket: BUCKET,
//       key: KEY,
//     });

//     const clientUrl = await createPresignedUrlWithClient({
//       region: REGION,
//       bucket: BUCKET,
//       key: KEY,
//     });

//     console.log("Presigned URL without client");
//     console.log(noClientUrl);
//     console.log("\n");

//     console.log("Presigned URL with client");
//     console.log(clientUrl);
//   } catch (err) {
//     console.error(err);
//   }
// };
// module.exports = {
//   createPresignedUrlWithoutClient,
//   createPresignedUrlWithClient,
//   main,
// };
