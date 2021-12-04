import Post from "../models/postModel.js";
import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";

const createPost = asyncHandler(async (req, res) => {
    const { title, contents, userId } = req.body;

    const newPost = await Post.create({
        title, contents, userId
    })

    if (newPost) {
        res.status(201).json({
            _id: newPost._id,
            title: newPost.title,
            contents: newPost.contents,
            userId: newPost.userId,
        })
    } else {
        res.status(400).json({ message: "Invalid post data" });
    }
})

const timeline = asyncHandler(async (req, res) => {
    const posts = await Post.find({ userId: req.params.userId }).sort({createdAt: -1})

    res.json(posts);
})

export { createPost, timeline };