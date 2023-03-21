import axios from "axios";

const API_URL = "/api/blogs/";

// Create new blog
const createBlog = async (blogData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, blogData, config);

  return response.data;
};

// Get user blogs
const getBlog = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get all blogs of all users
const getAllBlogs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "all", config);

  return response.data;
};

// Get a blog
const getABlog = async (blogid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + blogid, config);

  return response.data;
};

// Delete user blog
const deleteBlog = async (blogId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + blogId, config);

  return response.data;
};

const blogService = {
  createBlog,
  getBlog,
  getABlog,
  getAllBlogs,
  deleteBlog,
};

export default blogService;
