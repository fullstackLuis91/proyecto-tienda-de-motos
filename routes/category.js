const express = require("express")
const CategoryController = require("../controllers/CategoryController")
const router = express.Router()


router.post("/create",CategoryController.create)
router.post("/login",CategoryController.login)


module.exports = router