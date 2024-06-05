const express = require("express");
const { createBlog,getBlogs,getBlogbyId, updatedBlog, deleteBlog} = require("../controller/blogController");
const { userAuth } = require("../middleware/userAuth");
router = express.Router();

router.post("/createblog",userAuth,createBlog)
router.get("/getblogs",userAuth,getBlogs);
router.get("/getblog/:id",userAuth,getBlogbyId);
router.put("/updateblog/:id",userAuth,updatedBlog);
router.delete("/deleteblog/:id",userAuth,deleteBlog);
module.exports = router;