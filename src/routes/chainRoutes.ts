import express from "express"
import { blockchainController } from "../features/controllers/blockchainControllers"

const router = express.Router()

// Define the routes
router.get("/chain", blockchainController.getBlockchain)
router.get("/genesis", blockchainController.createGenesisBlock)
router.post("/transaction", blockchainController.createTransaction)
router.post("/mine", blockchainController.mineBlock)
router.get("/pending-transactions", blockchainController.getPendingTransactions)
router.get("/sync/:port", blockchainController.synchronizeChain)

export default router
