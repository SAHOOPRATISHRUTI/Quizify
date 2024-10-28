const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Messages = require('../constants/constMessage');
const TokenBlacklist =require('../models/tokenBlacklist.model')

const registerUser = async (userData) => {
    const { username, email, password } = userData;

    // Check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error(Messages.duplicateEmail); // Ensure Messages.duplicateEmail exists
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return newUser;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error(Messages.invalidEmail);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error(Messages.Password_not_correct);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_USER_SECRET, { expiresIn: "1h" });
    return { token, user };
};

const getUserProfile = async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new Error(Messages.email_not_found);
    }
    return user;
};


const updateUserProfile = async (userId, updateData) => {
    try {
        // Ensure the email is not already taken by another user
        if (updateData.email) {
            const existingUser = await User.findOne({ email: updateData.email });
            if (existingUser && existingUser._id.toString() !== userId.toString()) {
                throw new Error('Email already in use by another account');
            }
        }

        // Hash the new password if it's being updated (use bcrypt or another hashing library)
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        // Update user data in the database
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

const logOutUser=async(token)=>{
    try{
        await TokenBlacklist.create({token})
        return { message: 'Logged out successfully'}
    }
    catch(error){
        throw error;
    }
}


module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    logOutUser
};
