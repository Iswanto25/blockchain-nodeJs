"use strict"
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, "__esModule", { value: true })
exports.UnauthenticatedError = void 0
const http_status_codes_1 = require("http-status-codes")
const custom_api_error_1 = __importDefault(require("./custom-api-error"))
class UnauthenticatedError extends custom_api_error_1.default {
  constructor(message) {
    super(message, http_status_codes_1.StatusCodes.UNAUTHORIZED)
  }
}
exports.UnauthenticatedError = UnauthenticatedError
//# sourceMappingURL=unauthenticated.js.map
