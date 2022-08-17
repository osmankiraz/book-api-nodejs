const router = require("express").Router();
const categoryController = require("./controllers/categoryController");
const bookController = require("./controllers/bookController");
const { check } = require("express-validator");

// http://localhost/api/category
router
  .route("/category")
  .get(categoryController.list)
  .post(
    [check("name").notEmpty().withMessage("name must be required")],
    categoryController.create
  );

// http://localhost/api/category/131232136
router
  .route("/category/:category_id")
  .put(
    [check("name").notEmpty().withMessage("name must be required")],
    categoryController.update
  )
  .delete(categoryController.delete)
  .get(categoryController.getById);

const bookValidation = new Array(
  check("title").notEmpty().withMessage("title must be required"),
  check("author").notEmpty().withMessage("author must be required"),
  check("price")
    .notEmpty()
    .withMessage("price must be required")
    .isNumeric()
    .withMessage("price must be number"),
  check("stock")
    .notEmpty()
    .withMessage("stock must be required")
    .isInt()
    .withMessage("stock must be integer"),
  check("picture").notEmpty().withMessage("picture must be required"),
  check("categoryBy").notEmpty().withMessage("categoryBy must be required")
);

router
  .route("/book")
  .get(bookController.list)
  .post([bookValidation], bookController.create);
router
  .route("/book/:book_id")
  .get(bookController.getById)
  .put([bookValidation], bookController.update)
  .delete(bookController.delete);

router.route("/books/:category_id").get(bookController.listByCategoryId);

router
  .route("/book/saveImage")
  .post(bookController.upload.single("picture"), bookController.saveImage);

module.exports = router;
