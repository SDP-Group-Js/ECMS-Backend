import express, { Request, Response } from "express";
import apiRouter from "./api";
require('dotenv').config();

const app = express();

// Add express.json middleware
app.use(express.json());


// Attach routes in to app
app.use("/api", apiRouter);

app.get("/", (req: Request, res: Response) => {
  return res.json({message: "Server is running in port 8080"})
})

// Login Route for JWT-based authentication
app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
});

export default app;
