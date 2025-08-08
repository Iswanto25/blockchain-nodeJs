import * as crypto from "crypto"
import { Block as BlockchainBlock } from "../../../types/blockchainTypes"

class Block implements BlockchainBlock {
  index: number
  previousHash: string
  timestamp: number
  data: any
  hash: string
  nonce: number
  difficulty?: number | undefined
  miner?: string | undefined
  signature?: string | undefined
  transactions?: any[] | undefined

  constructor(
    index: number,
    previousHash: string,
    timestamp: number,
    data: any,
    hash: string,
    nonce: number,
    difficulty?: number | undefined,
    miner?: string | undefined,
    signature?: string | undefined,
    transactions?: any[] | undefined,
  ) {
    this.index = index
    this.previousHash = previousHash
    this.timestamp = timestamp
    this.data = data
    this.hash = hash
    this.nonce = nonce
    this.difficulty = difficulty
    this.miner = miner
    this.signature = signature
    this.transactions = transactions
  }
}

export class Blockchain {
  chain: Block[]
  difficulty: number
  pendingTransactions: any[]
  miningReward: number

  constructor() {
    this.chain = [this.createGenesisBlock()]
    this.difficulty = 4
    this.pendingTransactions = []
    this.miningReward = 100
  }

  public createGenesisBlock(): Block {
    const index = 0
    const previousHash = "5db780ade7b11c93f34932c031f19443"
    const timestamp = 922374966
    const data = "Genesis Block"
    const nonce = 0
    const difficulty = this.difficulty
    const miner = "genesis"
    const transactions: any[] = []

    const hash = crypto
      .createHash("sha256")
      .update(index + previousHash + timestamp + JSON.stringify(data) + nonce)
      .digest("hex")

    return new Block(index, previousHash, timestamp, data, hash, nonce, difficulty, miner, undefined, transactions)
  }

  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1]
  }

  public calculateHash(block: Block): string {
    return crypto
      .createHash("sha256")
      .update(
        block.index +
          block.previousHash +
          block.timestamp +
          JSON.stringify(block.data) +
          block.nonce +
          block.difficulty +
          block.miner +
          block.signature +
          block.transactions,
      )
      .digest("hex")
  }

  public getBlockchain(): Block[] {
    return this.chain
  }

  public createTransaction(transaction: any): void {
    this.pendingTransactions.push(transaction)
  }

  public minePendingTransactions(minerAddress: string): void {
    console.info(`Mining pending transactions for miner: ${minerAddress}`)
    this.pendingTransactions.unshift({
      to: minerAddress,
      amount: this.miningReward,
      timestamp: Date.now(),
    })
    this.mineBlock(minerAddress)
  }

  public getBlock(index: number): Block | null {
    if (index < 0 || index >= this.chain.length) {
      return null
    }
    return this.chain[index]
  }

  public mineBlock(minerAddress: string): Block {
    const newBlockIndex = this.chain.length
    const previousHash = this.getLatestBlock().hash
    const timestamp = Date.now()

    const block = new Block(newBlockIndex, previousHash, timestamp, this.pendingTransactions, "", 0, this.difficulty, minerAddress)

    let hash = this.calculateHash(block)
    while (hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0")) {
      block.nonce++
      hash = this.calculateHash(block)
    }

    block.hash = hash
    this.chain.push(block)

    this.pendingTransactions = []
    return block
  }

  public getBalance(address: string): number {
    const chain = this.chain
    let balance = 0

    for (const block of chain) {
      const txs = Array.isArray(block.data) ? block.data : []
      for (const tx of txs) {
        if (tx.to === address) {
          balance += tx.amount
        }
        if (tx.from === address) {
          balance -= tx.amount
        }
      }
    }

    return balance
  }
}

const blockchainInstance = new Blockchain()

export const blockchainServices = {
  createGenesisBlock: () => {
    return blockchainInstance.createGenesisBlock()
  },

  getBlockchain: () => {
    return blockchainInstance.getBlockchain()
  },

  createTransaction: (transaction: any) => {
    blockchainInstance.createTransaction(transaction)
    return { status: "Transaction added", transaction }
  },

  mineBlock: (minerAddress: string) => {
    blockchainInstance.minePendingTransactions(minerAddress)
    const latestBlock = blockchainInstance.getLatestBlock()
    const { miner, ...blockWithoutMiner } = latestBlock
    return blockWithoutMiner
  },

  pendingTransactions: () => {
    return blockchainInstance.pendingTransactions
  },

  setBlockchain: (chain: Block[]) => {
    blockchainInstance.chain = chain
  },

  getBalance: (address: string) => {
    return blockchainInstance.getBalance(address)
  },
}
