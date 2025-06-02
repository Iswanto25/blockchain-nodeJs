import { walletService } from "../services/walletServices"
import { blockchainServices } from "../../chain/services/blockchainServices"
import { successResponse, errorResponse } from "../../../utils/response"

export const walletController = {
  generateWallet: async (req: any, res: any) => {
    try {
      const wallet = await walletService.generateWallet()
      successResponse("Wallet generated successfully", wallet, 200, res)
    } catch (error: any) {
      console.error("Error generating wallet:", error)
      errorResponse("Error generating wallet", error, 500, res)
    }
  },

  restoreWallet: async (req: any, res: any) => {
    const { mnemonic } = req.body

    try {
      const wallet = await walletService.restoreWallet(mnemonic)
      successResponse("Wallet restored successfully", wallet, 200, res)
    } catch (error: any) {
      console.error("Error restoring wallet:", error)
      errorResponse("Error restoring wallet", error, 500, res)
    }
  },
  getWalletAddress: (req: any, res: any) => {
    const { publicKey } = req.body

    try {
      const address = walletService.getWalletAddress(publicKey)
      successResponse("Wallet address retrieved successfully", { address }, 200, res)
    } catch (error: any) {
      console.error("Error retrieving wallet address:", error)
      errorResponse("Error retrieving wallet address", error, 500, res)
    }
  },
  getBalance: async (req: any, res: any) => {
    const { address } = req.body

    if (!address) {
      errorResponse("Address is required", "Address not provided", 400, res)
    }

    try {
      const balance = blockchainServices.getBalance(address)
      successResponse("Balance retrieved successfully", { balance }, 200, res)
    } catch (error: any) {
      console.error("Error retrieving balance:", error)
      errorResponse("Error retrieving balance", error, 500, res)
    }
  },
}
