import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    contents: {
        type: String,
        trim: true,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },
    numberOfComments: {
        type: Number,
        required: true,
        default: 0,
    },
    likes: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
}, {
    timestamps: true
})

const Post = mongoose.model('Posts', postSchema);

export default Post;