import app from "./config/express"

const PORT = process.env.PORT || 3000

console.info(`project running on ${PORT}`)
app.listen(PORT, () => {
  console.log(`version: 1.2.0`)
  console.log(`Server is running on port ${PORT}`)
  console.info(`http://0.0.0.0:${PORT}`)
})
