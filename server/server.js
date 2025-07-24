// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
const ProductRouter = require('./routes/ProductRouter');


require('dotenv').config();
require('./models/db');

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Route health check
app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Mount auth routes
app.use('/academic', AuthRouter); // Routes like POST /academic/signup, /academic/login
app.use('/products', ProductRouter);
// Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
