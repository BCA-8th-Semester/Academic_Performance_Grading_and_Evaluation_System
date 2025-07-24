import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get('')
      .then(res => setCourse(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 shadow rounded">
      <h1 className="text-2xl font-bold mb-4">{course.title} ({course.code})</h1>
      <p><strong>Credits:</strong> {course.credits}</p>
      <p><strong>Semester:</strong> {course.semester}</p>
      <p><strong>Class Load:</strong> {course.classLoad}</p>
      <p className="mt-4">{course.description}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Course Contents</h2>
      <ol className="list-decimal pl-6 space-y-2">
        {course.contents.map((content, index) => (
          <li key={index}>
            <strong>{content.title}</strong> ({content.hours} hrs): {content.details}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CourseDetail;
