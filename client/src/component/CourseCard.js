import React from 'react';
import { User } from 'lucide-react';
import CourseCardMenu from './CourseCardMenu';

/**
 * @typedef {import('../hooks/useRecentCourses').Course} Course
 */

/**
 * A presentational component that displays a single course card.
 * @param {{ course: Course; onEdit: (id: string) => void; onDelete: (id: string) => void; }} props
 */
const CourseCard = ({ course, onEdit, onDelete }) => {
  const { _id, title, subtitle, instructor, image } = course;

  return (
    <div className="bg-gray-50 rounded-lg shadow flex flex-col items-stretch overflow-hidden hover:shadow-md transition-shadow relative">
      <CourseCardMenu onEdit={() => onEdit(_id)} onDelete={() => onDelete(_id)} />
      <img
        src={image || 'https://placehold.co/400x200?text=No+Image'}
        alt={title}
        className="w-full h-28 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-medium text-gray-900 text-base">{title}</h4>
          {subtitle && <p className="text-xs text-gray-600 mb-2">{subtitle}</p>}
        </div>
        <div className="flex items-center mt-auto">
          <User size={14} className="text-gray-400 mr-1" />
          <span className="text-xs text-gray-600">{instructor || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CourseCard);