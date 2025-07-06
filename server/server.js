import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/connection.js';
import recordRoutes from './routes/record.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = await connectDB(); // Top-level await is OK in ESM

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Example: Get all records from "students" collection
app.get('/students', async (req, res) => {
  try {
    const students = await db.collection('students').find({}).toArray();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.use('/records', recordRoutes(db));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
