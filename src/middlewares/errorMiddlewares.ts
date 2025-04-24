import { ErrorRequestHandler, RequestHandler } from "express"

export const errorMiddleware: ErrorRequestHandler = function (error, req, res, next): void {
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

export const notFoundMiddleware: RequestHandler = (req, res) => {
  console.error(`Error: Not Found`)
  res.status(404).json({
    status: 404,
    message: "Not Found",
  })
}
