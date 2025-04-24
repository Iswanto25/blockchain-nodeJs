import { user } from "@prisma/client" // atau tipe user yang kamu pakai

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
