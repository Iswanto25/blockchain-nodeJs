import { Request, Response } from "express"
import { blockchainServices } from "../services/blockchainServices"
import { walletService } from "../../wallet/services/walletServices"
import { synchronizeChainFromPeer } from "../services/syncServices"
import { Transaction } from "../../../types/blockchainTypes"
import { successResponse, errorResponse } from "../../../utils/response"

const createGenesisBlock = async (req: Request, res: Response) => {
  const response = blockchainServices.createGenesisBlock()
  if (response instanceof Error) {
    errorResponse("Failed to create genesis block", response, 500, res)
  }
  successResponse("Genesis block created successfully", response, 200, res)
}

const getBlockchain = async (req: Request, res: Response) => {
  const response = blockchainServices.getBlockchain()
  if (response instanceof Error) {
    errorResponse("Failed to retrieve blockchain", response, 500, res)
  }
  successResponse("Blockchain retrieved successfully", response, 200, res)
}

const createTransaction = async (req: Request, res: Response) => {
  const { mnemonic, from, to, amount } = req.body
  if (!mnemonic || !from || !to || !amount) {
    return errorResponse("Missing required fields: mnemonic, from, to, amount", null, 400, res)
  }

  const {privateKey, publicKey, address} = await walletService.restoreWallet(mnemonic)

  const response: Transaction = {
    from,
    to,
    amount,
    timestamp: Date.now(),
    publicKey,
  }

  if (from !== address) {
    return errorResponse("Transaction 'from' address does not match restored wallet address", null, 400, res)
  }

  response.signature = walletService.signTransaction(response, privateKey)

  if (!walletService.verifySignature(response)) {
    return errorResponse("Invalid transaction signature", null, 400, res)
  }

  try {
    blockchainServices.createTransaction(response)
    successResponse("Transaction created successfully", response, 201, res)
  } catch (error: any) {
    console.error("Error creating transaction:", error)
    errorResponse("Error creating transaction", error, 500, res)
  }
}

const mineBlock = async (req: Request, res: Response) => {
  try {
    const response = blockchainServices.mineBlock(req.body.miner)
    successResponse("Block mined successfully", response, 200, res)
  } catch (error: any) {
    console.error("Error mining block:", error)
    errorResponse("Error mining block", error, 500, res)
  }
}

const getPendingTransactions = async (req: Request, res: Response) => {
  try {
    const pendingTransactions = blockchainServices.pendingTransactions()
    successResponse("Pending transactions retrieved successfully", pendingTransactions, 200, res)
  } catch (error) {
    errorResponse("Failed to retrieve pending transactions", error, 500, res)
  }
}

const synchronizeChain = async (req: Request, res: Response) => {
  try {
    const port = req.params.port
    if (!port) {
      return errorResponse("Peer URL is required", null, 400, res)
    }
    console.info(`Synchronizing blockchain from peer at port: ${port}`)
    const peerUrl = `http://localhost:${port}`
    const response = await synchronizeChainFromPeer(peerUrl)
    if (response) {
      successResponse("Blockchain synchronized from peer successfully", response.chain, 200, res)
    } else {
      errorResponse("Failed to synchronize blockchain from peer", null, 400, res)
    }
  } catch (error) {
    console.error("Error synchronizing blockchain:", error)
    errorResponse("Error synchronizing blockchain", error, 500, res)
  }
}

export const blockchainController = {
  createGenesisBlock,
  getBlockchain,
  createTransaction,
  mineBlock,
  getPendingTransactions,
  synchronizeChain,
}
