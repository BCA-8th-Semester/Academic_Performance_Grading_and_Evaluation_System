const express = require("express");
const router = express.Router();
const User = require("../models/User");

// CREATE
router.post("/", async (req, res) => {
  const user = new User(req.body);
  const saved = await user.save();
  res.json(saved);
});

// READ
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;
