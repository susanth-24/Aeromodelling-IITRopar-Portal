import express from "express";
import { getposts, createPost, updatePost, deletePost, getPostsBySearch, getPost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getposts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);


export default router