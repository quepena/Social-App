import Message from "../models/messageModel.js";
import asyncHandler from 'express-async-handler';

const createMessage = asyncHandler(async(req, res) => {
    const { conversationId, sender, contents } = req.body;

    const newMessage = await Message.create({
        conversationId, sender, contents
    })

    if(newMessage) {
        res.status(201).json({
            _id: newMessage._id,
            conversationId: newMessage.conversationId,
            sender: newMessage.sender,
            contents: newMessage.contents,
        })
    } else {
        res.status(400).json({message: "Invalid message data"});
    }
})

const getMessages = asyncHandler(async(req, res) => {
    const messages = await Message.find({})

    res.json(messages);
})

const getMessageByConversation = asyncHandler(async (req, res) => {
    const message = await Message.find({
        conversationId: req.params.conversation
    })

    res.json(message);
})

export { getMessages, createMessage, getMessageByConversation };