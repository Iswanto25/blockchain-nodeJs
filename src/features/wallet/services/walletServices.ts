import * as bip39 from "bip39"
import { ec as EC } from "elliptic"
import * as crypto from "crypto"
import { Transaction } from "../../../types/blockchainTypes"

const ec = new EC("secp256k1")

export type WalletKeys = {
  mnemonic: string
  privateKey: string
  publicKey: string
  address: string
}

function serializeTransaction(tx: Pick<Transaction, "from" | "to" | "amount" | "timestamp">): string {
  return `${tx.from}|${tx.to}|${tx.amount}|${tx.timestamp}`
}

export const walletService = {
  generateWallet: async (wordCount: number = 12): Promise<WalletKeys> => {
    const validWordCounts = [12, 15, 18, 21, 24]
    if (!validWordCounts.includes(wordCount)) {
      throw new Error(`Invalid mnemonic word count. Must be one of: ${validWordCounts.join(", ")}`)
    }
    const entropyBits = 32 * (wordCount / 3)
    const entropyBytes = entropyBits / 8
    const entropyBuffer = crypto.randomBytes(entropyBytes)
    const mnemonic = bip39.entropyToMnemonic(entropyBuffer.toString("hex"))
    const seed = await bip39.mnemonicToSeed(mnemonic)

    const keyPair = ec.keyFromPrivate(seed.toString("hex").slice(0, 64))
    const privateKey = keyPair.getPrivate("hex")
    const publicKey = keyPair.getPublic("hex")
    const address = crypto.createHash("sha256").update(publicKey).digest("hex")

    return {
      mnemonic,
      privateKey,
      publicKey,
      address,
    }
  },

  restoreWallet: async (mnemonic: string): Promise<WalletKeys> => {
    const seed = await bip39.mnemonicToSeed(mnemonic)

    const keyPair = ec.keyFromPrivate(seed.toString("hex").slice(0, 64))
    const privateKey = keyPair.getPrivate("hex")
    const publicKey = keyPair.getPublic("hex")
    const address = crypto.createHash("sha256").update(publicKey).digest("hex")

    return {
      mnemonic,
      privateKey,
      publicKey,
      address,
    }
  },

  getWalletAddress: (publicKey: string): string => {
    return crypto.createHash("sha256").update(publicKey).digest("hex")
  },

  signTransaction: (transaction: Transaction, privateKey: string): string => {
    const payload = serializeTransaction(transaction)
    const key = ec.keyFromPrivate(privateKey, "hex")
    const hash = crypto.createHash("sha256").update(payload).digest()
    return key.sign(hash).toDER("hex")
  },

  verifySignature: (transaction: Transaction): boolean => {
    if (!transaction.signature || !transaction.publicKey) return false
    const payload = serializeTransaction(transaction)
    const key = ec.keyFromPublic(transaction.publicKey, "hex")
    const hash = crypto.createHash("sha256").update(payload).digest()
    return key.verify(hash, transaction.signature)
  },
}
