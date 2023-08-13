const { redirect } = require("react-router-dom");
const Article = require("../model/Article");
const fs = require("fs");
const { LocalStorage } = require("node-localstorage");
const localstorage = new LocalStorage("./public/image");

exports.createArticle = async (req, res, next) => {
  //validate requescon
  
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  //new user
  const article = new Article({
    img: localstorage.getItem("url"),
    heading: req.body.heading,
    categery: req.body.categery,
    content: req.body.content,
    likes: req.body.likes,
    comments: req.body.comments,
    views: req.body.views,
  });

  /*  console.log(fs.readFileSync(path.join(path.resolve('../'+'/set5/upload'),req.file.filename))) */
  //new user

  //save user in the database
  article
    .save(article)
    .then((data) => {
      res.redirect("http://localhost:3000/admin");
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message ||
            "Some error occurred while creating a create operation",
        });
    });
};

// find article by id
exports.findArticleById = (req, res) => {
  if (req.params.id) {
    const id = req.params.id;
    Article.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found article with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error in finding article with id" + id });
      });
  } else {
    Article.find()
      .then((article) => {
        res.send(article);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message: err.message || "Error in find all article information",
          });
      });
  }
};
//Find by Id
exports.findByIds = (req, res) => {
  const id = req.params.id;
  Article.findById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update a new idetified article by article id
exports.update = (req, res) => {
  const id = req.params.id;

  Article.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot Update article with ${id}. Maybe article not found!`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update article information" });
    });
};

// Delete a article with specified article id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Article.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "Article was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete article with id=" + id,
      });
    });
};
//Article find as categrory
exports.SearchByCategrory = (req, res) => {
  const categery = req.categery;
  Article.find({ categrory: categery })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not find aricle with this categery" + categery });
      else res.send(data);
    })
    .catch((err) => {
      res
        .staus(500)
        .send({
          message: "Error in find article with this categery" + categery,
        });
    });
};

//Search Ariticle by any text
exports.SearchByAnyText = (req, res) => {
  const text = req.text;
  Article.find({
    $or: [{ heading: text }, { content: text }, { categery: text }],
  })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Not find aricle with this text ${text}`  });
      } else {
        res.send(data);
      }
    })

    .catch((err) => {
      res
        .staus(500)
        .send({ message: "Error in find article with this text" + text });
    });
};
