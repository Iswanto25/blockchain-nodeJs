"use strict"
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, "__esModule", { value: true })
const express_1 = __importDefault(require("express"))
const cors_1 = __importDefault(require("cors"))
const morgan_1 = __importDefault(require("morgan"))
const dotenv_1 = __importDefault(require("dotenv"))
const errorMiddlewares_1 = require("../middlewares/errorMiddlewares")
const routesAuth_1 = __importDefault(require("../routes/routesAuth"))
const adminRoutes_1 = __importDefault(require("../routes/adminRoutes"))
const homeRoutes_1 = __importDefault(require("../routes/homeRoutes"))
dotenv_1.default.config()
const app = (0, express_1.default)()
app.use((0, morgan_1.default)("dev"))
app.use((0, cors_1.default)())
app.use(express_1.default.json({ limit: "10mb" }))
app.use("/api/simpeg/auth", routesAuth_1.default)
app.use("/api/simpeg/home", homeRoutes_1.default)
// app.use("/api/simpeg/admin", authorizeAccess, roleAccess(["ADMIN"]), adminRoutes)
app.use("/api/simpeg/admin", adminRoutes_1.default)
// Error Middleware
app.use("*", errorMiddlewares_1.notFoundMiddleware)
app.use(errorMiddlewares_1.errorMiddleware)
exports.default = app
//# sourceMappingURL=express.js.map
