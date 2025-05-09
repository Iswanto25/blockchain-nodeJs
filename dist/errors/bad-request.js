"use strict"
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, "__esModule", { value: true })
const http_status_codes_1 = require("http-status-codes")
const custom_api_error_1 = __importDefault(require("./custom-api-error"))
class BadRequest extends custom_api_error_1.default {
  constructor(message) {
    super(message, http_status_codes_1.StatusCodes.BAD_REQUEST)
  }
}
exports.default = BadRequest
//# sourceMappingURL=bad-request.js.map
