import React, { useState } from "react";
import { X } from "lucide-react";

const AddCourses = ({ onClose }) => {
  const [courseName, setCourseName] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [board, setBoard] = useState("");
  const [courseImage, setCourseImage] = useState(null);

  const handleImageChange = (e) => {
    setCourseImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send data to backend
    const formData = new FormData();
    formData.append("courseName", courseName);
    formData.append("instructorName", instructorName);
    formData.append("board", board);
    if (courseImage) {
      formData.append("courseImage", courseImage);
    }
    // Example: axios.post('/api/courses', formData)
    alert("Course added successfully!");
    setCourseName("");
    setInstructorName("");
    setBoard("");
    setCourseImage(null);
    if (onClose) onClose();
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
      {/* Cross (X) button at the top right */}
      <button
        type="button"
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={24} />
      </button>
      <h2 className="text-xl font-semibold mb-6 text-center">Add Course</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Course Name:
          </label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Instructor Name:
          </label>
          <input
            type="text"
            value={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Assign Board:</label>
          <input
            type="text"
            value={board}
            onChange={(e) => setBoard(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Course Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourses;