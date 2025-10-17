const sharp = require('sharp'); // npm install sharp

module.exports.handler = async (event) => {
  try {
    const imgBuffer = Buffer.from(event.body, 'base64');
    const resizedBuffer = await sharp(imgBuffer).resize(200, 200).toBuffer();

    return {
      statusCode: 200,
      body: resizedBuffer.toString('base64'),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
