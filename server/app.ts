import express, { Request, Response } from 'express';
import apiRouter from './api';
import authenticate from './middleware/authenticated';
require('dotenv').config();

const app = express();

// Add express.json middleware
app.use(express.json());

// Attach routes in to app
app.use('/api', apiRouter);
app.use(authenticate);

const port = process.env.PORT || 8080;
app.get('/', (req: Request, res: Response) => {
  return res.json({ message: `Server is running in port ${port}` });
});

export default app;
