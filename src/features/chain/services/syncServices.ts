import axios from "axios"
import { blockchainServices } from "./blockchainServices"

export async function synchronizeChainFromPeer(peerUrl: string):  Promise<{ success: boolean, chain?: any[] }>  {
    try {
        const response = await axios.get<{ data: any[] }>(`${peerUrl}/blockchain/chain`)
        const peerChainResponse = response.data
        const peerChain = peerChainResponse.data
        console.log("Received chain from peer:", JSON.stringify(peerChain, null, 2))
        if (!peerChain || !Array.isArray(peerChain)) {
            throw new Error("Invalid chain data from peer")
        }

        if (isValidChain(peerChain) && peerChain.length > blockchainServices.getBlockchain().length) {
            blockchainServices.setBlockchain(peerChain)
            console.info("Blockchain synchronized from peer:", peerUrl)
            return { success: true, chain: peerChain }
        }else {
            console.info("Peer chain is not valid or not longer")
            return { success: false }
        }
    } catch (error) {
        console.error("Failed to synchronize chain:", error)
        return { success: false }
    }
}

function isValidChain(chain: any[]): boolean {
    if (chain.length === 0) return false

    for (let i = 1; i < chain.length; i++) {
        const currentBlock = chain[i]
        const previousBlock = chain[i - 1]

        if (currentBlock.previousHash !== previousBlock.hash) {
            return false
        }
    }
    return true
}

export function startAutoSync(peers: string[], intervalMs: number = 10000) {
    setInterval(async () => {
            for (const peer of peers) {
            await synchronizeChainFromPeer(peer)
        }
    }, intervalMs)
}
