"use strict"
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, "__esModule", { value: true })
exports.logger = void 0
const winston_1 = __importDefault(require("winston"))
const { combine, timestamp, json } = winston_1.default.format
const errorFilter = winston_1.default.format((info, opts) => {
  return info.level === "error" ? info : false
})
const infoFilter = winston_1.default.format((info, opts) => {
  return info.level === "info" ? info : false
})
exports.logger = winston_1.default.createLogger({
  format: combine(timestamp(), json()),
  transports: [
    new winston_1.default.transports.Console({
      level: "error",
      format: combine(errorFilter(), winston_1.default.format.colorize()),
    }),
    new winston_1.default.transports.Console({
      level: "info",
      format: combine(infoFilter(), winston_1.default.format.colorize()),
    }),
    new winston_1.default.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: combine(infoFilter(), winston_1.default.format.colorize()),
    }),
    new winston_1.default.transports.File({
      filename: "logs/info.log",
      level: "info",
      format: combine(infoFilter(), winston_1.default.format.colorize()),
    }),
  ],
})
//# sourceMappingURL=logger.js.map
