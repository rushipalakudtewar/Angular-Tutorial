const express = require("express")
router = express.Router()
const {registerUser,getUser, loginUser} = require("../controller/userController")
const {userAuth} = require('../middleware/userAuth');

router.get("/getuser",userAuth,getUser);
router.post("/register",registerUser);
router.post("/login",loginUser);

module.exports = router;
