import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Define Schema
const ChatbotQuerySchema = new mongoose.Schema({
  query: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Define Model
const ChatbotQuery = mongoose.model('ChatbotQuery', ChatbotQuerySchema);

// Endpoint to Store Query
app.post('/api/chatbot-query', async (req: Request, res: Response) => {
  const { query } = req.body;
  
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }
  
  try {
    const newQuery = new ChatbotQuery({ query });
    await newQuery.save();
    res.status(201).json({ message: "Query saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
