// routes/AuthRouter.js

const express = require('express');
const router = express.Router();

const { signup, login } = require('../controllers/AuthController');

// Temporary stub validators (replace with real validation later)
const signupValidation = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  next();
};

const loginValidation = signupValidation; // reuse same logic for now

// Use clean route paths (no /academic here because it's mounted in server.js)
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

module.exports = router;
