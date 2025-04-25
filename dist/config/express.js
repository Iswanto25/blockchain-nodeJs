"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const moment_1 = __importDefault(require("moment"));
const routes_1 = __importDefault(require("../routes/routes"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    const forwardedForHeader = req.headers["x-forwarded-for"];
    const forwardedFor = Array.isArray(forwardedForHeader) ? forwardedForHeader[0] : forwardedForHeader;
    const ip = forwardedFor?.split(",")[0]?.trim() || req.ip;
    const host = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const userAgent = req.headers["user-agent"] || "Unknown";
    const dateTimeNow = (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss");
    console.info("Users ip:", ip);
    console.info("Users host:", host);
    console.info("Users user-agent:", userAgent);
    console.info("Users x-forwarded-for:", forwardedFor ?? "undefined");
    console.info("Timestamp:", dateTimeNow);
    next();
});
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json({ limit: "10mb" }));
app.set("trust proxy", true);
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to the Blockchain API",
    });
});
app.use("/blockchain", routes_1.default);
app.get("/favicon.ico", (req, res) => {
    res.status(204).end(); // No Content
});
exports.default = app;
//# sourceMappingURL=express.js.map