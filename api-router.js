const router= require("express").Router();
const categoryController=require("./controllers/categoryController")
const bookController =require("./controllers/bookController")

// http://localhost/api/category
router.route("/category").get(categoryController.list).post(categoryController.create)

// http://localhost/api/category/131232136
router.route("/category/:category_id").put(categoryController.update).delete(categoryController.delete).get(categoryController.getById)

router.route("/book").get(bookController.list).post(bookController.create)
router.route("/book/:book_id").get(bookController.getById).put(bookController.update).delete(bookController.delete)

router.route("/books/:category_id").get(bookController.listByCategoryId)

module.exports=router