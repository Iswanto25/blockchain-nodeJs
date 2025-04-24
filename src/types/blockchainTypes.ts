export interface Block {
  index: number
  previousHash: string
  timestamp: number
  data: any
  hash: string
  nonce: number
  difficulty?: number
  miner?: string
  signature?: string
  transactions?: Transaction[]
}

export interface Transaction {
  from: string
  to: string
  amount: number
  timestamp: number
  signature?: string
}
