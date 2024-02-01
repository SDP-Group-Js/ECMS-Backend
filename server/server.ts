import app from "./app"
import "dotenv"
import cors from "cors"
import express from "express"
import helmet from "helmet"

const port = process.env.PORT || 8080

// Create Server
const server = express()

// Add cors middleware
server.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    allowedHeaders: "Origin, Content-Type, Accept, Authorization"
  })
)

server.use(helmet())

// Mount app to server
server.use(app)

// Open server with port
server.listen(port, () => {
  console.log(`Listening to Port ${port}`)
})

module.exports = server
