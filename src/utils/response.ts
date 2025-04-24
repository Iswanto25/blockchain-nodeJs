import { Response } from "express"

export const successResponse = (message: any, data: any, code: number, res: Response) => {
  res.status(code).json({
    status: code,
    message,
    data,
  })
}

export const errorResponse = (message: string, error: any, code: number, res: Response) => {
  res.status(code).json({
    status: code,
    message,
    error,
  })
}
export class apiError extends Error {
  statusCode: number

  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}
