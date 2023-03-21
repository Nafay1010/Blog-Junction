const asyncHandler = require("express-async-handler");

const Blog = require("../models/blogModel");
const User = require("../models/userModel");

// @desc    Get All blogs of all users
// @route   GET /api/blogs/all
// @access  Private
const getAllblogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json(blogs);
});

// @desc    Get blogs of a specific user
// @route   GET /api/blogs/:id
// @access  Private
const getblogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ user: req.user.id });

  res.status(200).json(blogs);
});

// @desc    Get a detailed blog of a user
// @route   GET /api/blogs/:id
// @access  Private
const getAblog = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ _id: req.params.id });

  res.status(200).json(blogs);
});

// @desc    Set Blog
// @route   POST /api/blogs
// @access  Private
const setBlog = asyncHandler(async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    res.status(400);
    throw new Error("Please input all the required fields");
  }

  const Blogs = await Blog.create({
    title: req.body.title,
    author: req.user.name,
    body: req.body.body,
    user: req.user.id,
  });

  res.status(200).json(Blogs);
});

// @desc    Update Blog
// @route   PUT /api/blogs/:id
// @access  Private
const updateBlog = asyncHandler(async (req, res) => {
  const blogs = await Blog.findById(req.params.id);

  if (!blogs) {
    res.status(400);
    throw new Error("Blog not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the Blog user
  if (blogs.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBlog);
});

// @desc    Delete Blog
// @route   DELETE /api/blogs/:id
// @access  Private
const deleteBlog = asyncHandler(async (req, res) => {
  const blogs = await Blog.findById(req.params.id);

  if (!blogs) {
    res.status(400);
    throw new Error("Blog not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the Blog user
  if (blogs.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Blog.findByIdAndDelete(blogs);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getAllblogs,
  getblogs,
  getAblog,
  setBlog,
  updateBlog,
  deleteBlog,
};
