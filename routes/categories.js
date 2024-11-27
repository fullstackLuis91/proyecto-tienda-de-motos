const express = require("express")
const CategoryController = require("../controllers/CategoryController")
const { authentication } = require("../middleware/authentication")
const router = express.Router()


router.post("/create",authentication, CategoryController.create)
router.get("/",CategoryController.getAll)
router.get("/id/:id",CategoryController.getById)
router.put("/id/:id",CategoryController.update)
router.delete("/id/:id",authentication, CategoryController.delete)
router.get("/filter",CategoryController.filterByName)


module.exports = router