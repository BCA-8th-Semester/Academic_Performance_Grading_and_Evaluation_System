// routes/courses.js
import express from 'express';
import multer from 'multer';
import Course from '../models/Course.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// CREATE course with image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const course = new Course({
      title: req.body.title,
      instructor: req.body.instructor,
      semester: req.body.semester,
      image: req.file.filename, // store file name
    });

    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE course (optionally with new image)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    course.title = req.body.title || course.title;
    course.instructor = req.body.instructor || course.instructor;
    course.semester = req.body.semester || course.semester;

    if (req.file) {
      // Delete old image file
      const oldImagePath = path.join('uploads', course.image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      course.image = req.file.filename;
    }

    await course.save();
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE course
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    // Delete image file
    const imagePath = path.join('uploads', course.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
