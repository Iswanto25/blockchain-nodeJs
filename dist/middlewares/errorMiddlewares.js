"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.notFoundMiddleware = exports.errorMiddleware = void 0
const errorMiddleware = function (error, req, res, next) {
  console.error(`Error: ${error.message}`)
  if (error.message === "Unauthorized") {
    res.status(401).json({
      status: 401,
      message: error.message,
    })
    return
  }
  if (error.message === "Forbidden") {
    res.status(403).json({
      status: 403,
      message: error.message,
    })
    return
  }
  res.status(500).json({
    status: 500,
    message: error.message || "Internal Server Error",
  })
}
exports.errorMiddleware = errorMiddleware
const notFoundMiddleware = (req, res) => {
  console.error(`Error: Not Found`)
  res.status(404).json({
    status: 404,
    message: "Not Found",
  })
}
exports.notFoundMiddleware = notFoundMiddleware
//# sourceMappingURL=errorMiddlewares.js.map
