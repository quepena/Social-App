import Post from "../models/postModel.js";
import asyncHandler from 'express-async-handler';
// import Section from "../models/sectionModel.js";
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

// const updatePost = asyncHandler(async (req, res) => {
//     const post = Post.findById(req.params.id);

//     if(post.userId === req.body.userId) {
//         await post.updateOne({ $set: req.body })
//         res.status(200).json("Your post was successfully updated!");
//     } else {
//         res.status(403).json("You can't update others' posts");
//     }
// }) 

// const deletePost = asyncHandler(async (req, res) => {
//     const post = await Post.findById(req.params.id);

//     if(post.userId === req.body.userId) {
//         await post.updateOne({ $set: req.body })
//         res.status(200).json("You successfully deleted your post");
//     } else {
//         res.status(403).json("You can't update others' posts")
//     }
// })

// const getPost = asyncHandler(async (req, res) => {
//     const post = Post.findById(req.params.id);
//     res.status(200).json(post)
// })

const timeline = asyncHandler(async (req, res) => {
    const posts = await Post.find({ userId: req.params.userId }).sort({createdAt: -1})

    res.json(posts);
})

// const likePost = asyncHandler(async (req, res) => {
//     const post = await Post.findById(req.params.id);

//     if(!post.likes.includes(req.body.userId)) {
//         await post.updateOne({ $push: { likes: req.body.userId } });
//         res.status(200).json("You liked this post")
//     } else {
//         await post.updateOne({ $pull: { likes: req.body.userId } });
//         res.status(200).json("You don't like this post anymore");
//     }
// })

export { createPost, timeline };