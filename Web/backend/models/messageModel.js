import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true,
    },
    contents: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    read: {
        type: Date
    }
}, {
    timestamps: true,
})

const Message = mongoose.model('Messages', messageSchema);

export default Message