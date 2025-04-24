import express from "express"
import morgan from "morgan"
import routes from "../routes/routes"


const app = express()

app.use(morgan("dev"))
app.use(express.json({ limit: "10mb" }))
app.set('trust proxy', true);


app.use("/blockchain", routes)

export default app

