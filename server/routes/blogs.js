import express from "express";
import auth from "../middleware/auth.js";
import { createBlog, getBlog, getBlogs, updateBlog,commentBlog, getBlogsBySearch } from "../controllers/blogs.js";

const router=express.Router();
router.get('/search', getBlogsBySearch);
router.post('/',auth,createBlog);
router.get('/',getBlogs);
router.get('/:id',getBlog);
router.patch('/:id',updateBlog);
router.post('/:id/commentBlog', commentBlog);



export default router