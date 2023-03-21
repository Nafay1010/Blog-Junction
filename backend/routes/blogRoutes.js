const express = require("express");
const router = express.Router();
const {
  getAllblogs,
  getblogs,
  getAblog,
  setBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getblogs).post(protect, setBlog);
router.route("/all").get(protect, getAllblogs);
router
  .route("/:id")
  .delete(protect, deleteBlog)
  .put(protect, updateBlog)
  .get(protect, getAblog);

module.exports = router;
