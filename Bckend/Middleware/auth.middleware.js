const jwt = require("jsonwebtoken");
const Response = require('../helper/response');
const message = require('../constants/constMessage');
const authService = require('../services/auth.service');

// Middleware function to verify JWT token
const verifyUserToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return Response.failResponse(req, res, null, message.missingAuthHeader, 401);
        }

        let token = req.headers.authorization;
        if (token.startsWith("Bearer ")) {
            token = token.substring(7, token.length);
        } else {
            return Response.failResponse(req, res, null, message.invalidTokenFormat, 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
        req.user = decoded;

        // Additional checks if needed, like user status or role

        next();
    } catch (error) {
        return Response.failResponse(req, res, null, message.invalidToken, 401);
    }
};

module.exports = {
    verifyUserToken
};
