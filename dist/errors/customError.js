"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.ValidationError = exports.CustomError = void 0
class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    // Ensure the name of this error is the name of the class
    this.name = this.constructor.name
    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor)
  }
}
exports.CustomError = CustomError
class ValidationError extends Error {
  constructor(errors) {
    super("Validasi Gagal")
    this.statusCode = 422
    this.errors = errors
    // Ensure the name of this error is the name of the class
    this.name = this.constructor.name
    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor)
  }
}
exports.ValidationError = ValidationError
//# sourceMappingURL=customError.js.map
