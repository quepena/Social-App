import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const getUsersForAdmin = asyncHandler(async (req, res) => {
    const users = await User.find({})

    res.json(users);
})

const getUserByIdForAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
})

const deleteUserForAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ messsage: 'User removed' })
    } else {
        res.status(404).json({ message: 'User not found' });
    };
})

const updateUserProfileForAdmin = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);

    if(user) {
        user.username = req.body.username || user.username
        user.nativeLanguage = req.body.nativeLanguage || user.nativeLanguage;
        user.isLearning = req.body.isLearning || user.isLearning;
        if(req.body.password) {
            user.password = req.body.password;
        }
        user.isAdmin = req.body.isAdmin;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            knownAs: updatedUser.knownAs,
            username: updatedUser.username,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404).json({message: 'User not found'});
    };
})

export {
    getUsersForAdmin,
    getUserByIdForAdmin,
    deleteUserForAdmin,
    updateUserProfileForAdmin,
}
