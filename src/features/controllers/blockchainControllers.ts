import { Request, Response } from "express"
import * as crypto from "crypto"
import { Blockchain } from "../services/blockchainServices"
import { Transaction } from "../../types/blockchainTypes"

const blockchain = new Blockchain()

export const createGenesisBlock = (req: Request, res: Response) => {
  const response = blockchain.createGenesisBlock()
  res.status(200).json({
    message: "Genesis block created successfully",
    data: response,
  })
}

export const getBlockchain = (req: Request, res: Response) => {
  const response = blockchain.getBlockchain()
  res.status(200).json({
    message: "Blockchain retrieved successfully",
    data: response,
  })
}

export const createTransaction = (req: Request, res: Response) => {
  const { from, to, amount } = req.body

  const transaction: Transaction = {
    from,
    to,
    amount,
    timestamp: Date.now(),
  }

  try {
    blockchain.createTransaction(transaction)

    res.status(200).json({
      message: "Transaction created successfully",
      data: transaction,
    })
  } catch (error: any) {
    console.error("Error creating transaction:", error)
    res.status(500).json({
      message: "Error creating transaction",
      error: error.message,
    })
  }
}

export const mineBlock = (req: Request, res: Response) => {
  const { miner } = req.body

  try {
    const newBlock = blockchain.mineBlock(miner)

    res.status(200).json({
      message: "Block mined successfully",
      data: newBlock,
    })
  } catch (error: any) {
    console.error("Error mining block:", error)
    res.status(500).json({
      message: "Error mining block",
      error: error.message,
    })
  }

}

export const getPendingTransactions = (req: Request, res: Response) => {
    const pendingTransactions = blockchain.pendingTransactions;
    
    res.status(200).json({
      message: "Pending transactions retrieved successfully",
      data: pendingTransactions,
    });
  }
  