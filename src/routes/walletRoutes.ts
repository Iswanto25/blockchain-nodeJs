import express from "express"
import { walletController } from "../features/wallet/controllers/walletControllers"

const router = express.Router()

// Define the routes
router.get("/generate-wallet", walletController.generateWallet)
router.post("/restore-wallet", walletController.restoreWallet)
router.post("/get-wallet-address", walletController.getWalletAddress)
router.post("/get-balance", walletController.getBalance)

export default router
