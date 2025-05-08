import express from "express"
import { createGenesisBlock, getBlockchain, createTransaction, mineBlock, getPendingTransactions } from "../features/controllers/blockchainControllers"
import { walletController } from "../features/wallet/controllers/walletControllers"

const router = express.Router()


// Define the routes
router.get("/", getBlockchain)
router.get("/genesis", createGenesisBlock)
router.post("/transaction", createTransaction)
router.post("/mine", mineBlock)
router.get("/pending-transactions", getPendingTransactions);

router.post("/generate-wallet", walletController.generateWallet)
router.post("/restore-wallet", walletController.restoreWallet)
router.post("/get-wallet-address", walletController.getWalletAddress)

export default router

