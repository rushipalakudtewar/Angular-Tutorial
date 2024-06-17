const express = require("express");
const { getAllUsers, getAdmin, getAllBlogs, deleteUser,deleteBlogAdmin, setPublish, getCount } = require("../controller/adminController");
const { isAdmin, auth } = require("../middleware/auth");
router = express.Router();


router.get("/getallusers",auth,isAdmin,getAllUsers);
router.get("/getcounts",auth,isAdmin,getCount);
router.delete("/deleteuser/:id",auth,isAdmin,deleteUser);
router.get("/getallblogs",auth,isAdmin,getAllBlogs);
router.delete("/deleteblogbyadmin/:id",auth,isAdmin,deleteBlogAdmin);
router.get("/getadmin",auth,isAdmin,getAdmin);
router.put("/updatepublish/:id",auth,isAdmin,setPublish);

// router.post("/registeradmin",registerAdmin);
// router.post("/loginadmin",loginAdmin);
// router.post("/logoutadmin",logoutAdmin);

module.exports = router;