const imagekit = require("@imagekit/nodejs").default;

const client = new imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile({ buffer, fileName, folder = "" }) {
  const file = await client.files.upload({
    file: await imagekit.toFile(Buffer.from(buffer)),
    fileName: fileName,
    folder,
  });
  return file;
}

module.exports = { uploadFile };
