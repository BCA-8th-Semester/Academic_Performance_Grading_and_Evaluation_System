import express from "express";
import nodemailer from "nodemailer";
import Invitation from "../models/Invitation.js";
const { sendInvitationEmail } = require('../emailService');

const router = express.Router();

// Simple email format validation
function isValidEmail(email) {
  // Basic regex for demonstration; consider using a library for production
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// POST /api/invite
router.post('/send-invite', async (req, res) => {
  const { toEmail } = req.body;
  const result = await sendInvitationEmail(
    toEmail,
    "You're Invited!",
    `<p>Hello!</p><p>Please join our platform by clicking <a href="http://yourfrontend.com/join">here</a>.</p>`
  );
  if (result.success) {
    res.json({ status: 'sent', messageId: result.messageId });
  } else {
    res.status(500).json({ status: 'failed', error: result.error });
  }
});

export default router;