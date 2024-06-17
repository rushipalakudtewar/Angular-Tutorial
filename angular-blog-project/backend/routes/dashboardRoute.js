const express = require("express");
const { getPublishedBlogs } = require("../controller/dashboardController");
router = express.Router();

router.get('/getpublishedblogs',getPublishedBlogs);

module.exports= router;

