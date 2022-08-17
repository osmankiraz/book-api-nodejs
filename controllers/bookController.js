const Book = require("../models/book.model");
const response = require("../response");
const { validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");
let bookFileName = null;

let myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/images");
  },
  filename: function (req, file, cb) {
    bookFileName = Date.now() + path.extname(file.originalname);
    cb(null, bookFileName);
  },
});
exports.upload = multer({
  storage: myStorage,
});

exports.list = (req, res) => {
  Book.find({})
    .sort({ created: -1 })
    .populate("categoryBy")
    .exec((err, books) => {
      if (err) return new response(null, err).error500(res);
      return new response(books, null).success(res);
    });
};

exports.getById = (req, res) => {
  Book.findById(req.params.book_id)
    .populate("categoryBy")
    .exec((err, book) => {
      if (err) return new response(null, err).notFound(res);
      return new response(book, null).success(res);
    });
};

exports.listByCategoryId = (req, res) => {
  const _id = req.params.category_id;

  Book.find({ categoryBy: _id })
    .populate("categoryBy")
    .exec((err, books) => {
      if (err) return new response(null, err).error500(res);
      return new response(books, null).success(res);
    });
};

exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return new response(null, errors.array()).badRequest(res);
  }

  const { title, author, price, stock, picture, categoryBy } = req.body;
  let book = new Book();
  book.title = title;
  book.author = author;
  book.price = price;
  book.stock = stock;
  book.picture = picture;
  book.categoryBy = categoryBy._id;

  book.save((err) => {
    if (err) return new response(null, err).error500(res);
    return new response(book, null).created(res);
  });
};

exports.update = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return new response(null, errors.array()).badRequest(res);
  }

  Book.findById(req.params.book_id, (err, book) => {
    if (err) return new response(null, err).error500(res);
    if (!book) return new response().notFound(res);

    const { title, author, price, stock, picture, categoryBy } = req.body;
    book.title = title;
    book.author = author;
    book.price = price;
    book.stock = stock;
    book.picture = picture;
    book.categoryBy = categoryBy._id;

    book.save((err) => {
      if (err) return new response(null, err).error500(res);
      return new response(book, null).success(res);
    });
  });
};

exports.delete = (req, res) => {
  let _id = req.params.book_id;

  Book.findOneAndDelete({ _id: _id }, (err, book) => {
    if (err) return new response(null, err).error500(res);
    if (!book) return new response().notFound(res);
    return new response(book, null).success(res);
  });
};

exports.saveImage = (req, res) => {
  try {
    res
      .status(200)
      .json({
        status: "success",
        url: `http://localhost:${process.env.port}/${bookFileName}`,
      });
  } catch (error) {
    res.status(500).send(err);
  }
};
