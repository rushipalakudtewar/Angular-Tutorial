const express = require("express");
const { createBlog,getBlogs,getBlogbyId, updatedBlog, deleteBlog} = require("../controller/blogController");
const { auth, isUser } = require("../middleware/auth");
router = express.Router();
const { upload1} = require("../utils/storeFile")

router.post("/createblog",upload1.single('blogimage'),auth,isUser,createBlog)
router.get("/getblogs",auth,isUser,getBlogs);
router.get("/getblog/:id",auth,isUser,getBlogbyId);
router.put("/updateblog/:id",upload1.single('blogimage'),auth,isUser,updatedBlog);
router.delete("/deleteblog/:id",auth,isUser,deleteBlog);
module.exports = router;