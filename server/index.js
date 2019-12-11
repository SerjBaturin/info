const express = require("express")
const app = express()
const PORT = 3000
const cors = require("cors")

app.use(cors())

app.get("/random", (req, res) => {
  res.send([
    { number: Math.random().toFixed(1) * 50 },
    { number: Math.random().toFixed(1) * 100 },
    { number: Math.random().toFixed(1) * 30 },
    { number: Math.random().toFixed(1) * 100 },
    { number: Math.random().toFixed(1) * 40 },
    { number: Math.random().toFixed(1) * 30 },
    { number: Math.random().toFixed(1) * 100 },
    { number: Math.random().toFixed(1) * 40 },
    { number: Math.random().toFixed(1) * 100 },
    { number: Math.random().toFixed(1) * 70 }
  ])
})

app.listen(PORT, () => {
  console.log("OK ====> ", process.pid, PORT)
})
