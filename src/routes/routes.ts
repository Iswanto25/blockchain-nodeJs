import express from "express"
import { blockchainController } from "../features/controllers/blockchainControllers"
import { walletController } from "../features/wallet/controllers/walletControllers"

const router = express.Router()

// Define the routes
router.get("/chain", blockchainController.getBlockchain)
router.get("/genesis", blockchainController.createGenesisBlock)
router.post("/transaction", blockchainController.createTransaction)
router.post("/mine", blockchainController.mineBlock)
router.get("/pending-transactions", blockchainController.getPendingTransactions)
router.get("/sync/:port", blockchainController.synchronizeChain)

router.post("/generate-wallet", walletController.generateWallet)
router.post("/restore-wallet", walletController.restoreWallet)
router.post("/get-wallet-address", walletController.getWalletAddress)

export default router
