const express = require("express")
const UserController = require("../controllers/UserController")
const { authentication } = require("../middleware/authentication")
const router = express.Router()


router.post("/create",UserController.create)
router.post("/login",UserController.login)
router.post("/logout",authentication, UserController.logout)
router.get("/getinfo",authentication, UserController.getUserInfoLogged)



module.exports = router