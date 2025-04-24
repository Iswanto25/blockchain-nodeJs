import express from "express"
import { createGenesisBlock, getBlockchain, createTransaction, mineBlock, getPendingTransactions } from "../features/controllers/blockchainControllers"

const router = express.Router()


// Define the routes
router.get("/", getBlockchain)
router.get("/genesis", createGenesisBlock)
router.post("/transaction", createTransaction)
router.post("/mine", mineBlock)
router.get("/pending-transactions", getPendingTransactions);

export default router

