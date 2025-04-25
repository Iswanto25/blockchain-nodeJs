"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiError = exports.errorResponse = exports.successResponse = void 0;
const successResponse = (message, data, code, res) => {
    res.status(code).json({
        status: code,
        message,
        data,
    });
};
exports.successResponse = successResponse;
const errorResponse = (message, error, code, res) => {
    res.status(code).json({
        status: code,
        message,
        error,
    });
};
exports.errorResponse = errorResponse;
class apiError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.apiError = apiError;
//# sourceMappingURL=response.js.map