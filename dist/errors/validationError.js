"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.handleValidationErrors = void 0
const express_validator_1 = require("express-validator")
const response_1 = require("../utils/response")
const http_status_codes_1 = require("http-status-codes")
// Generic validation error handler middleware
const handleValidationErrors = (req, res, next) => {
  const errors = (0, express_validator_1.validationResult)(req)
  if (!errors.isEmpty()) {
    const errorMessages = {}
    errors.array().forEach((err) => {
      errorMessages[err.path] = err.msg
    })
    return (0, response_1.errorResponse)("Validation failed", http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY, 500, res)
  }
  next()
}
exports.handleValidationErrors = handleValidationErrors
//# sourceMappingURL=validationError.js.map
