const ImageKit = require("imagekit");
const fs = require("fs");
const path = require("path");
const { LocalStorage } = require("node-localstorage");
const localstorage = new LocalStorage("./public/image");

module.exports = ImageUpload = (req, res, next) => {
  var file = req.file.filename;
  let paths = file.slice(6);

  const imagef = () => {
    var imagekit = new ImageKit({
      publicKey: "public_l7WELbYilQ+zb6D8OnLswr/KfkI=",
      privateKey: "private_XeiM6u1n4i8yNKc6HT4cfFr27TI=",
      urlEndpoint: "https://ik.imagekit.io/sunny23/sunny23/",
    });
    var path = `./public/files/${paths}`;
    // For URL Generation, works for both images and videos
    var imageURL = imagekit.url({
      path: path,
      urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/endpoint/",
      transformation: [
        {
          height: "300",
          width: "400",
        },
      ],
    });

    fs.readFile(path, function (err, data) {
      if (err) throw err; // Fail if the file can't be read.
      imagekit.upload(
        {
          file: data, //required
          fileName: "sunny", //required
          tags: ["sunny", "tag2"],
        },

        function (error, result) {
          localstorage.setItem("url", result.url);
          console.log("Upload on Imagekit");
        }
      );
    });

    console.log("image uploaded");
  };
  imagef();

  next();
};
