const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const category = require("./category.model");

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock:{
    type:Number,
    required:true
  },
  picture:{
    type:String,
    required:true
  },
  created:{
    type:Date,
    default:()=>{
        return new Date()
    }
  },
  categoryBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category"
  }
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
