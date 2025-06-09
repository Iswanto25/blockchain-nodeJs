import express from "express"
import morgan from "morgan"
import moment from "moment"
import chainRoutes from "../routes/chainRoutes"
import walletRoutes from "../routes/walletRoutes"

const app = express()

moment.locale("id");
morgan.token("date", () => {
	return moment().format("DD/MMM/YYYY:HH:mm:ss ZZ");
})

app.use((req, res, next) => {
  const forwardedForHeader = req.headers["x-forwarded-for"]
  const forwardedFor = Array.isArray(forwardedForHeader) ? forwardedForHeader[0] : forwardedForHeader
  const ip = forwardedFor?.split(",")[0]?.trim() || req.ip
  const host = `${req.protocol}://${req.get("host")}${req.originalUrl}`
  const userAgent = req.headers["user-agent"] || "Unknown"
  const dateTimeNow = moment().format("YYYY-MM-DD HH:mm:ss")

  console.info("Users ip:", ip)
  console.info("Users host:", host)
  console.info("Users user-agent:", userAgent)
  console.info("Users x-forwarded-for:", forwardedFor ?? "undefined")
  console.info("Timestamp:", dateTimeNow)

  next()
})

app.use(morgan("combined"))
app.use(express.json({ limit: "10mb" }))
app.set("trust proxy", true)

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the Blockchain API",
    version: "1.0.0",
  })
})

app.get("/blockchain", (req, res) => {
  res.redirect("/")
})

app.use("/blockchain", chainRoutes )
app.use("/wallet", walletRoutes)
app.get("/favicon.ico", (req, res) => {
  res.status(204).end()
})

export default app
