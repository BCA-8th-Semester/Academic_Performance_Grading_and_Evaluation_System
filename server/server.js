import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/connection.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = await connectDB();

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Example: Use db for routes
// app.get('/users', async (req, res) => {
//   const users = await db.collection('users').find().toArray();
//   res.json(users);
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
