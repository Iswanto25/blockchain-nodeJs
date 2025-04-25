"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blockchainControllers_1 = require("../features/controllers/blockchainControllers");
const router = express_1.default.Router();
// Define the routes
router.get("/", blockchainControllers_1.getBlockchain);
router.get("/genesis", blockchainControllers_1.createGenesisBlock);
router.post("/transaction", blockchainControllers_1.createTransaction);
router.post("/mine", blockchainControllers_1.mineBlock);
router.get("/pending-transactions", blockchainControllers_1.getPendingTransactions);
exports.default = router;
//# sourceMappingURL=routes.js.map