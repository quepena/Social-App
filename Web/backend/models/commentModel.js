import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    replies: [{
        type: String
    }],
    contents: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
}, {
    timestamps: true
})

const Comment = mongoose.model('Comments', commentSchema);

export default Comment;