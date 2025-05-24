import * as bip39 from "bip39"
import { ec as EC } from "elliptic"
import * as crypto from "crypto"

const ec = new EC("secp256k1")

export type WalletKeys = {
  mnemonic: string
  privateKey: string
  publicKey: string
  address: string
}

export const walletService = {
  generateWallet: async (): Promise<WalletKeys> => {
    const mnemonic = bip39.generateMnemonic()
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
}
