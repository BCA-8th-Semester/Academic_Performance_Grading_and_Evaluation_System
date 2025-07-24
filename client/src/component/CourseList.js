import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    // await axios.delete(`http://localhost:5000/api/courses/${id}`);
    setCourses(courses.filter(c => c._id !== id));
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map(course => (
        <div key={course._id} className="border p-4 rounded shadow bg-white">
          <h2 className="text-lg font-bold">{course.title}</h2>
          <p>{course.code}</p>
          <div className="flex justify-between mt-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => navigate(`/courses/${course._id}`)}
            >
              View
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => handleDelete(course._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
