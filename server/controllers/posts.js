import postMessage from "../models/postMessage.js";
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
export const getposts = async (req, res) => {
    //const { page } = req.query;
    try {
        //const LIMIT = 8;
        //const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        //const total = await postMessage.countDocuments({});
        const posts = await postMessage.find().sort({ _id: -1 })

        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await postMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new postMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save()
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });

    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const {title, description, type,imageLink ,creator,projectManager,teamMembers,tags,startDate,remark } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { title, description, type,imageLink ,creator,projectManager,teamMembers,tags,startDate,remark, _id: id };

    await postMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}
export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that Id');
    await postMessage.findByIdAndRemove(id);
    res.json({ message: 'post deleted succesfully' })
}



export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await postMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });

        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}




export default router;
