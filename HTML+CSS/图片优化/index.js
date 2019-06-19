const imagemin = require("imagemin");
const PNGImages = "images/*.png";
const JPGImages = "images/*.jpg";
const gifImages = "images/*.gif";
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminWebp = require("imagemin-webp");
const output = "build/images";
const optimiseJPEGImages = () =>
  imagemin([JPGImages], output, {
    plugins: [
      imageminMozjpeg({
        quality: 70
      })
    ]
  });
optimiseJPEGImages().catch(error => console.log(error));
const optimisePNGImages = () =>
  imagemin([PNGImages], output, {
    plugins: [imageminPngquant({
      quality: "20"
    })]
  });
optimiseJPEGImages()
  .then(() => optimisePNGImages())
  .catch(error => console.log(error));

const convertPNGToWebp = () =>
  imagemin([PNGImages], output, {
    use: [
      imageminWebp({
        quality: 85
      })
    ]
  });
const convertJPGToWebp = () =>
  imagemin([JPGImages], output, {
    use: [
      imageminWebp({
        quality: 75
      })
    ]
  });
optimiseJPEGImages()
  .then(() => optimisePNGImages())
  .then(() => convertPNGToWebp())
  .then(() => convertJPGToWebp())
  .catch(error => console.log(error));