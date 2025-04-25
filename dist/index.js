"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./config/express"));
const PORT = process.env.PORT || 3000;
console.info(`project running on ${PORT}`);
express_1.default.listen(PORT, () => {
    console.log(`version: 1.0.0`);
    console.log(`Server is running on port ${PORT}`);
    console.info(`http://0.0.0.0:${PORT}`);
});
//# sourceMappingURL=index.js.map