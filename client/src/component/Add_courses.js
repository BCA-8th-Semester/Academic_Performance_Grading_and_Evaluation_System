import React, { useState } from "react";
import { X, UploadCloud } from "lucide-react";
import axios from "axios";
import Spinner from "./ui/Spinner";
import ErrorMessage from "./ui/ErrorMessage";

/**
 * AddCourses component for adding a new course.
 * @param {{
 *   onClose: () => void,
 *   onSuccess?: () => void
 * }} props
 */
const AddCourses = ({ onClose, onSuccess }) => {
  const [courseName, setCourseName] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [assignBoard, setAssignBoard] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setCourseName('');
    setInstructorName('');
    setAssignBoard('');
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('title', courseName);
    formData.append('instructor', instructorName);
    formData.append('semester', assignBoard);
    formData.append('image', selectedFile);

    try {
      await axios.post('http://localhost:5000/api/courses', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      resetForm();
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
      <button
        type="button"
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors"
        onClick={onClose}
        aria-label="Close"
        tabIndex={0}
      >
        <X size={24} />
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Course</h2>
      {error && (
        <div className="mb-4">
          <ErrorMessage message={error} />
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
        <div>
          <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-1">
            Course Name
          </label>
          <input
            id="courseName"
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="instructorName" className="block text-sm font-medium text-gray-700 mb-1">
            Instructor Name
          </label>
          <input
            id="instructorName"
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter instructor name"
            value={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="assignBoard" className="block text-sm font-medium text-gray-700 mb-1">
            Assign Board / Semester
          </label>
          <input
            id="assignBoard"
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter board or semester"
            value={assignBoard}
            onChange={(e) => setAssignBoard(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="courseImage" className="block text-sm font-medium text-gray-700 mb-1">
            Course Image
          </label>
          <div className="flex items-center gap-3">
            <label
              htmlFor="courseImage"
              className="flex items-center px-4 py-2 bg-blue-50 border border-blue-300 rounded-md cursor-pointer hover:bg-blue-100 transition-colors"
            >
              <UploadCloud className="mr-2 text-blue-500" size={20} />
              <span className="text-blue-700 font-medium">
                {selectedFile ? "Change Image" : "Upload Image"}
              </span>
              <input
                id="courseImage"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
                required
                disabled={loading}
              />
            </label>
            {selectedFile && (
              <span className="text-xs text-gray-600 truncate max-w-[120px]">{selectedFile.name}</span>
            )}
          </div>
          {previewUrl && (
            <div className="mt-2">
              <img
                src={previewUrl}
                alt="Preview"
                className="h-20 w-20 object-cover rounded border"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:opacity-60"
          disabled={loading}
        >
          {loading && <Spinner size={20} />}
          {loading ? "Adding..." : "Add Course"}
        </button>
      </form>
    </div>
  );
};

export default AddCourses;