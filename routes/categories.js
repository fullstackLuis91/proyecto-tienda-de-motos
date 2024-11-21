const express = require("express")
const CategoryController = require("../controllers/CategoryController")
const router = express.Router()


router.post("/create",CategoryController.create)
router.get("/",CategoryController.getAll)
router.get("/id/:id",CategoryController.getById)
router.put("/id/:id",CategoryController.update)
router.delete("/id/:id",CategoryController.delete)
router.get("/filter",CategoryController.filterByName)


module.exports = router