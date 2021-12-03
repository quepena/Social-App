import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

const getUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        $or: [
            {
                username: {
                    $regex: req.query.keyword,
                    $options: 'i'
                }
            },
            {
                knownAs: {
                    $regex: req.query.keyword,
                    $options: 'i'
                }
            },
            {
                country: {
                    $regex: req.query.keyword,
                    $options: 'i'
                }
            },
            {
                city: {
                    $regex: req.query.keyword,
                    $options: 'i'
                }
            }
        ]
    } : {}

    const users = await User.find({ ...keyword })

    res.json(users);
})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: 'User not found' });
    }
})

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            knownAs: user.knownAs,
            username: user.username,
            nativeLanguage: user.nativeLanguage,
            isLearning: user.isLearning,
            token: generateToken(user._id),
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    };
})

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username
        user.nativeLanguage = req.body.nativeLanguage || user.nativeLanguage;
        // user.isLearning = req.body.isLearning || user.isLearning;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            knownAs: updatedUser.knownAs,
            username: updatedUser.username,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    };
})

const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        res.status(401).json({ message: 'Invalid username' });
    }
    else if (!(await user.matchPassword(password))) {
        res.status(401).json({ message: 'Invalid password' });
    }
    else if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            knownAs: user.knownAs,
            username: user.username,
            isLearning: user.isLearning,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, knownAs, nativeLanguage, isLearning, dateOfBirth, gender, country, city, introduction } = req.body;

    const userExists = await User.findOne({ username });

    if (userExists) {
        res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
        username, password, knownAs, nativeLanguage, isLearning, dateOfBirth, gender, country, city, introduction
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            password: user.password,
            knownAs: user.knownAs,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            country: user.country,
            city: user.city,
            introduction: user.introduction,
            token: generateToken(user._id),
        })
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
})

const deleteCurrentUserAccount = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ messsage: 'User removed' })
    } else {
        res.status(404).json({ message: 'User not found' });
    };
})

const followUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    if(!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("Now you're following this user")
    } else {
        res.status(403).json("You already follow this user")
    }
})

const unfollowUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    if(user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("Now you're not following this user")
    } else {
        res.status(403).json("You don't follow this user")
    }
})

export {
    getUsers,
    getUserProfile,
    getCurrentUserProfile,
    authUser,
    registerUser,
    updateCurrentUserProfile,
    deleteCurrentUserAccount,
    followUser,
    unfollowUser,
}