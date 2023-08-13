const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  categery: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: String,
    default: "",
  },
  views: {
    type: Number,
    default: 0,
  },
  User: {
    type:String,
    ref:"User",
    
   
  },
});
 const Article = mongoose.model('Article',schema);
 module.exports=Article;
 /*  mongoose.Types.ObjectId */