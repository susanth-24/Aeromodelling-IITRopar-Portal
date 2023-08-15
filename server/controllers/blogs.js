import express from 'express';
import mongoose from 'mongoose';
import blogMessage from '../models/blog.js';

const router = express.Router();

export const getBlogs=async(req,res)=>{
    try {
        const blogs = await blogMessage.find().sort({ _id: -1 })
        console.log("h")
        res.json({ data: blogs });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getBlog=async(req,res)=>{
    const {id}=req.params;
    try {
        const blog=await blogMessage.findById(id);
        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

export const createBlog = async (req, res) => {
    const blog = req.body;
    const newBlog = new blogMessage({ ...blog, creator: req.userId, createdAt: new Date().toISOString() });
    console.log(newBlog);
    try {
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(410).json({ message: error.message });
    }
};

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content, creator,tags,link } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedBlog = { creator, title, content,tags,link , _id: id };

    await blogMessage.findByIdAndUpdate(id, updatedBlog, { new: true });

    res.json(updatedBlog);
}

export const commentBlog = async (req, res) => {
    const { id } = req.params;
    const { commenter, comment } = req.body;

    try {
        const blog = await blogMessage.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const newComment = { commenter, comment, timeAt: new Date().toISOString() };
        blog.comments.push(newComment);

        const updatedBlog = await blogMessage.findByIdAndUpdate(id, blog, { new: true });

        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: 'Commenting on post failed' });
    }
};

export const getBlogsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const blogs = await blogMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
        
        res.json({ data: blogs });
    } catch (error) {

        res.status(404).json({ message: error });
    }
}
