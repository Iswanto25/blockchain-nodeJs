"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.errorMiddleware = void 0
const response_1 = require("../utils/response")
const library_1 = require("@prisma/client/runtime/library")
const customError_1 = require("../errors/customError")
const logger_1 = require("../utils/logger")
const errorMiddleware = async (error, req, res, next) => {
  console.error(error?.constructor?.name)
  if (error instanceof library_1.PrismaClientKnownRequestError) {
    // Handle specific Prisma error codes
    let statusCode = 500
    let message = "Database error"
    console.log(error.code)
    switch (error.code) {
      case "P2000":
        // Record not found
        statusCode = 404
        message = "Data terlalu panjang ditemukan"
        break
      case "P2001":
        // Record not found
        statusCode = 404
        message = "Data tidak ditemukan"
        break
      case "P2002":
        // Unique constraint violation
        statusCode = 409
        message = "Duplikat data ditemukan"
        break
      case "P2003":
        // Foreign key constraint violation
        statusCode = 409
        message = "Tidak dapat menghapus atau mengubah data karena data terkait sedang digunakan."
        break
      case "P2025":
        // Record to update not found
        statusCode = 404
        message = "Data yang akan diubah tidak ditemukan"
        break
      default:
        // Unknown Prisma error code
        message = error.message
        break
    }
    console.error(error)
    logger_1.logger.error(message)
    if (statusCode != 500) {
      return (0, response_1.errorResponse)("Database Error", error.message, statusCode, res)
    } else {
      return (0, response_1.errorResponse)("internal server error", error.message, statusCode, res)
    }
  }
  if (error instanceof customError_1.ValidationError) {
    return (0, response_1.errorResponse)("error", error.message, error.statusCode, error.errors)
  }
  const prismaErrors = [
    library_1.PrismaClientValidationError,
    library_1.PrismaClientInitializationError,
    library_1.PrismaClientRustPanicError,
    library_1.PrismaClientUnknownRequestError,
  ]
  if (prismaErrors.some((errType) => error instanceof errType)) {
    logger_1.logger.error(error.message)
    console.error(error.message)
    return (0, response_1.errorResponse)("Database Error", error.message, 500, res)
  }
  if (!(error instanceof customError_1.CustomError)) {
    logger_1.logger.error(error)
    console.error(error)
    console.error(error?.constructor?.name)
    return (0, response_1.errorResponse)("Database Error", error.message, 500, res)
  }
  next(error)
}
exports.errorMiddleware = errorMiddleware
//# sourceMappingURL=errorMiddleware.js.map
