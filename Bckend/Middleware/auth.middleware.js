const jwt = require("jsonwebtoken");
const Response = require('../helper/response');
const Messages = require('../constants/constMessage');
const authService = require('../services/auth.service');

// Middleware function to verify JWT token
const verifyUserToken = async (req, res, next) => {
    try {
        // Check if authorization header is present
        if (!req.headers.authorization) {
            return Response.failResponse(res, Messages.missingAuthHeader, 401);
        }

        let token = req.headers.authorization;

        // Check for 'Bearer' prefix and extract token
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        } else {
            return Response.failResponse(res, Messages.invalidTokenFormat, 401);
        }

        // Verify the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
        req.user = decoded; // Attach the decoded user information to the request

        // Optional: Additional user validation (like checking if user exists, active status, roles, etc.)
        // const user = await authService.findUserById(decoded.id);
        // if (!user || !user.isActive) {
        //     return Response.failResponse(res, Messages.userNotFoundOrInactive, 401);
        // }

        // Proceed to the next middleware/route handler
        next();
    } catch (error) {
        // Handle token verification errors
        console.error(error);
        return Response.failResponse(res, Messages.invalidToken, 401);
    }
};

module.exports = {
    verifyUserToken
};
