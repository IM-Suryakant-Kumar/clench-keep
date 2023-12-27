import { log } from "console";
import express from "express";

const app = express()

const PORT: number = parseInt(process.env.PORT, 10) || 4000
const start = async () => {
  try {
    app.listen(PORT, () => log(`Server is listening on port ${PORT}...`))
  } catch (error) {
    log(error)
  }
}

start()