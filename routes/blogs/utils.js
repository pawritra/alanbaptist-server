const axios = require('axios');
const sharp = require('sharp');
const ftp = require("basic-ftp");
const { Readable } = require("stream");

const config = {
  host: "ftp.assets.alanvidyushbaptist.com",
  user: "u122070741.aritra",
  password: "@Asd1234",
  // secure: true,
  port: 21,
}

const uploadFile = async (fileName, imageBuffer) => {
  const client = new ftp.Client()
  try {
    await client.access(config);
    const stream = Readable.from(imageBuffer);
    await client.uploadFrom(stream, "/thumbnails/" + fileName);
    console.log("File Upload!")
  }
  catch (err) {
    console.log(err.message);
  }
  client.close()
}

const compressImage = async (url) => {
  let res;
  try{
    res = await axios.get(url.replace('https', 'http'), { responseType: 'arraybuffer' });
  } catch(err){
    throw new Error("Error Uploading Images. Please check Image URL.")
  }

  const image = Buffer.from(res.data, 'binary');
  const imageName = url.split('/')[url.split('/').length - 1];
  const compressedImageName = decodeURI(imageName.split('.').slice(0, -1).join('.') + "_thumbnail.jpg");
  const processedImageName = compressedImageName.replace(/ /g, '_');
  const compressedImageBuffer = await sharp(image).resize(500).jpeg({ mozjpeg: true }).toBuffer();

  await uploadFile(processedImageName, compressedImageBuffer);
}

module.exports = {
  uploadFile,
  compressImage
}
