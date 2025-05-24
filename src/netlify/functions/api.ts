import serverless from "serverless-http"
import app from "../../config/express" // Sesuaikan path import app kamu

export const handler = serverless(app)
