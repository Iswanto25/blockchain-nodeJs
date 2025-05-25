import { Request, Response } from "express"
import { blockchainServices } from "../services/blockchainServices"
import { synchronizeChainFromPeer } from "../services/syncServices"
import { Transaction } from "../../types/blockchainTypes"
import { successResponse, errorResponse } from "../../utils/response"

const createGenesisBlock = (req: Request, res: Response) => {
  const response = blockchainServices.createGenesisBlock()
  if (response instanceof Error) {
    errorResponse("Failed to create genesis block", response, 500, res)
  }
  successResponse("Genesis block created successfully", response, 200, res)
}

const getBlockchain = (req: Request, res: Response) => {
  const response = blockchainServices.getBlockchain()
  if (response instanceof Error) {
    errorResponse("Failed to retrieve blockchain", response, 500, res)
  }
  successResponse("Blockchain retrieved successfully", response, 200, res)
}

const createTransaction = (req: Request, res: Response) => {
  const { from, to, amount } = req.body

  const response: Transaction = {
    from,
    to,
    amount,
    timestamp: Date.now(),
  }

  try {
    blockchainServices.createTransaction(response)
    successResponse("Transaction created successfully", response, 201, res)
  } catch (error: any) {
    console.error("Error creating transaction:", error)
    errorResponse("Error creating transaction", error, 500, res)
  }
}

const mineBlock = (req: Request, res: Response) => {
  try {
    const response = blockchainServices.mineBlock(req.body.miner)
    successResponse("Block mined successfully", response, 200, res)
  } catch (error: any) {
    console.error("Error mining block:", error)
    errorResponse("Error mining block", error, 500, res)
  }
}

const getPendingTransactions = (req: Request, res: Response) => {
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
