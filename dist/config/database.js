"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.prismaExtend = exports.prismaClient = void 0
const client_1 = require("@prisma/client")
const logger_1 = require("../utils/logger")
const prisma = new client_1.PrismaClient()
exports.prismaClient = new client_1.PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
})
exports.prismaClient.$on("error", (e) => {
  logger_1.logger.error(e)
})
exports.prismaClient.$on("warn", (e) => {
  logger_1.logger.warn(e)
})
exports.prismaExtend = new client_1.PrismaClient().$extends({
  query: {
    user: {
      async create({ args, query }) {
        args.data.createdAt = new Date()
        args.data.updatedAt = new Date()
        return query(args)
      },
      async update({ args, query }) {
        args.data.updatedAt = new Date()
        return query(args)
      },
    },
  },
})
//# sourceMappingURL=database.js.map
