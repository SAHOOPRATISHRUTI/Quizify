const failResponse = (res, message, statusCode = 400) => {
    return res.status(statusCode).send({
        error: false,
        success: false,
        message: message,
        data: null
    });
};

const successResponse = (res, data, message, statusCode = 200) => {
    return res.status(statusCode).send({
        error: false,
        success: true,
        message: message,
        data: data
    });
};

const errorResponse = (res, error, statusCode = 500) => {
    return res.status(statusCode).send({
        error: true,
        success: false,
        message: error.message || "An unexpected error occurred",
        data: null
    });
};

module.exports = {
    failResponse,
    successResponse,
    errorResponse
};
