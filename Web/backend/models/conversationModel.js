import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema({
    participants: {
        type: Array,
        required: true,
    }
}, {
    timestamps: true,
})

const Conversation = mongoose.model('Conversations', conversationSchema);

export default Conversation