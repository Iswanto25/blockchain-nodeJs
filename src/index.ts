import app from "./config/express"
import { startAutoSync } from "./features/services/syncServices"

const PORT = process.env.PORT || 3000

console.info(`project running on ${PORT}`)
app.listen(PORT, () => {
  // const peerPorts = ["3000"].filter((p) => p !== String(PORT))
  // const peers = peerPorts.map((port) => `http://localhost:${port}`)
  // startAutoSync(peers, 10000)
  console.info(`version: 1.0.0`)
  console.info(`Server is running on port ${PORT}`)
  console.info(`http://0.0.0.0:${PORT}`)
})
