import * as crypto from "crypto"
import { Block as BlockchainBlock } from "../../types/blockchainTypes"

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

  // Membuat genesis block pertama
  public createGenesisBlock(): Block {
    const index = 0
    const previousHash = "0"
    const timestamp = Date.now()
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

  // Mendapatkan block terbaru
  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1]
  }

  // Menghitung hash untuk block tertentu
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

  // Mendapatkan seluruh blockchain
  public getBlockchain(): Block[] {
    return this.chain
  }

  // Menambahkan transaksi ke pendingTransactions
  public createTransaction(transaction: any): void {
    this.pendingTransactions.push(transaction)
  }

  // Fungsi mining yang akan menambahkan blok baru
  public minePendingTransactions(minerAddress: string): void {
    const block = this.mineBlock(minerAddress)
    // Berikan reward kepada miner
    this.createTransaction({
      from: null,
      to: minerAddress,
      amount: this.miningReward,
    })
  }

  // Mendapatkan block berdasarkan index tertentu
  public getBlock(index: number): Block | null {
    if (index < 0 || index >= this.chain.length) {
      return null
    }
    return this.chain[index]
  }

  // Fungsi untuk melakukan mining dan menambahkan block baru ke chain
  public mineBlock(minerAddress: string): Block {
    const newBlockIndex = this.chain.length
    const previousHash = this.getLatestBlock().hash
    const timestamp = Date.now()

    // Membuat blok baru dengan data transaksi pending
    const block = new Block(
      newBlockIndex,
      previousHash,
      timestamp,
      this.pendingTransactions,
      "", // Hash akan dihitung setelah proses mining
      0,
      this.difficulty,
      minerAddress,
    )

    // Lakukan mining untuk menemukan nonce yang valid (sesuai dengan difficulty)
    let hash = this.calculateHash(block)
    while (hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0")) {
      block.nonce++
      hash = this.calculateHash(block)
    }

    block.hash = hash
    this.chain.push(block)

    // Kosongkan transaksi yang tertunda
    this.pendingTransactions = []
    return block
  }
}
