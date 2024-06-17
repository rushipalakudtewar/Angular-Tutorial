const express = require("express")
router = express.Router()
const {registerUser,getUser, loginUser, logout, updateDetails, updateProfileImage} = require("../controller/userController")

const { auth, isUser } = require("../middleware/auth");
const { upload2 } = require("../utils/storeFile");

router.get("/getuser",auth,isUser,getUser);
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",logout);
router.put("/updateprofile",upload2.single('profileimage'),auth,isUser,updateProfileImage)
router.put("/updatedetails",auth,isUser,updateDetails);
module.exports = router;
