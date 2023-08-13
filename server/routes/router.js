const express = require('express');
const route = express.Router();
const usercontroller=require('../controller/usercontroller');
const articlecontroller=require('../controller/articlecontroller');
const multer= require('multer');
const path=require('path');
const loginMiddleware=require('../middleware/loginMiddleware');
const ImageUpload = require('../middleware/ImageUpload');
// multer routes

/* rs */


//Configuration for Multer
 const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/Image-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

// Multer Filter
 const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "jpg") {
    cb(null, true);
  } else if (file.mimetype.split("/")[1] === "jpeg") {
    cb(null, true);
  } else if (file.mimetype.split("/")[1] === "mp4") {
    cb(null, true);
  } else if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  }else {
    cb(new Error("Not a PDF ,jpeg,jpg,mp4 File!!"), false);
  }
};

//Calling the "multer" Function
 const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});




//API user
route.get('/api/users',usercontroller.getAlluser);
route.post("/api/users/login", usercontroller.login);
route.post("/api/users", usercontroller.signup);
route.put('/api/users/:id',usercontroller.update);
route.delete('/api/users/:id',usercontroller.delete);




//API article
route.post(
  "/api/article",
  upload.single("img"),
  ImageUpload,
  articlecontroller.createArticle
);
route.get('/api/article',articlecontroller.findArticleById);
route.put('/api/article/:id',articlecontroller.update);
route.patch('/api/articles/:id',articlecontroller.update);
route.delete('/api/article/:id',articlecontroller.delete);
route.get("/api/articleFindById/:id",articlecontroller.findByIds)




module.exports=route;
