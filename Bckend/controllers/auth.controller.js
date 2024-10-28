const authService = require('../services/auth.service');
const Response = require('../helper/response');
const Messages = require('../constants/constMessage');

const register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        return Response.successResponse(res, user, Messages.createdSucess);
    } catch (error) {
        console.log(error);
        return Response.errorResponse(res, error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);
        return Response.successResponse(res, result, Messages.profileLogin_sucessfully);
    } catch (error) {
        console.log(error);
        return Response.errorResponse(res, error);
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await authService.getUserProfile(req.user.id);
        return Response.successResponse(res, user, Messages.profileFetch_sucessfully);
    } catch (error) {
        console.log(error);
        return Response.errorResponse(res, error);
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user.id contains the authenticated user ID
        const updateData = req.body;

        // Call the service to update the profile
        const updatedUser = await authService.updateUserProfile(userId, updateData);
        return Response.successResponse(res, updatedUser, Messages.profileUpdateSuccess);
    } catch (error) {
        console.error(error);
        return Response.errorResponse(req, res, error);
    }
};

const logout = async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]; // Extract the token from Bearer token header

        // Call the service to log out the user
        await authService.logOutUser(token);
        return Response.successResponse(res, null, Messages.logoutSuccess);
    } catch (error) {
        console.error(error);
        return Response.errorResponse(req, res, error);
    }
};

module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    logout
};
