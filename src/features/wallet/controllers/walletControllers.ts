import { walletService } from "../services/walletServices"
import { blockchainServices } from "../../services/blockchainServices"

export const walletController = {
  generateWallet: async (req: any, res: any) => {
    try {
      const wallet = await walletService.generateWallet()
      res.status(200).json({
        message: "Wallet generated successfully",
        data: wallet,
      })
    } catch (error: any) {
      console.error("Error generating wallet:", error)
      res.status(500).json({
        message: "Error generating wallet",
        error: error.message,
      })
    }
  },

  restoreWallet: async (req: any, res: any) => {
    const { mnemonic } = req.body

    try {
      const wallet = await walletService.restoreWallet(mnemonic)
      res.status(200).json({
        message: "Wallet restored successfully",
        data: wallet,
      })
    } catch (error: any) {
      console.error("Error restoring wallet:", error)
      res.status(500).json({
        message: "Error restoring wallet",
        error: error.message,
      })
    }
  },
  getWalletAddress: (req: any, res: any) => {
    const { publicKey } = req.body

    try {
      const address = walletService.getWalletAddress(publicKey)
      res.status(200).json({
        message: "Wallet address retrieved successfully",
        data: address,
      })
    } catch (error: any) {
      console.error("Error retrieving wallet address:", error)
      res.status(500).json({
        message: "Error retrieving wallet address",
        error: error.message,
      })
    }
  },
  getBalance: async (req: any, res: any) => {
    const { address } = req.body

    if (!address) {
      return res.status(400).json({
        message: "Address is required",
      })
    }

    try {
      const balance = blockchainServices.getBalance(address)
      res.status(200).json({
        message: "Balance retrieved successfully",
        data: { address, balance },
      })
    } catch (error: any) {
      console.error("Error retrieving balance:", error)
      res.status(500).json({
        message: "Error retrieving balance",
        error: error.message,
      })
    }
  }
}
