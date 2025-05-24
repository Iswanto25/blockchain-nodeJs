"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blockchainControllers_1 = require("../features/controllers/blockchainControllers");
const walletControllers_1 = require("../features/wallet/controllers/walletControllers");
const router = express_1.default.Router();
// Define the routes
router.get("/chain", blockchainControllers_1.blockchainController.getBlockchain);
router.get("/genesis", blockchainControllers_1.blockchainController.createGenesisBlock);
router.post("/transaction", blockchainControllers_1.blockchainController.createTransaction);
router.post("/mine", blockchainControllers_1.blockchainController.mineBlock);
router.get("/pending-transactions", blockchainControllers_1.blockchainController.getPendingTransactions);
router.post("/generate-wallet", walletControllers_1.walletController.generateWallet);
router.post("/restore-wallet", walletControllers_1.walletController.restoreWallet);
router.post("/get-wallet-address", walletControllers_1.walletController.getWalletAddress);
exports.default = router;
//# sourceMappingURL=routes.js.map