import React, { useState } from 'react';
import { User, Plus } from 'lucide-react';
import AddCourses from './Add_courses';

const RecentCoursesCard = () => {
  const [showAddCourse, setShowAddCourse] = useState(false);

  const recentCourses = [
    {
      title: 'Operating System',
      subtitle: 'Best Rating',
      instructor: 'Jose Moui',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=facearea&w=400&h=200',
    },
    {
      title: 'C Programming',
      subtitle: 'Best Rating',
      instructor: 'Jose Moui',
      image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=facearea&w=400&h=200',
    },
    {
      title: 'Database Management',
      subtitle: 'Popular',
      instructor: 'Anna Smith',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=facearea&w=400&h=200',
    },
    {
      title: 'Mathematics',
      subtitle: 'New',
      instructor: 'David Lee',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=200',
    },
  ];

  return (
    <div className="col-span-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Courses</h3>
        <button
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
          onClick={() => setShowAddCourse((prev) => !prev)}
        >
          <Plus size={16} className="mr-1" />
          Add
        </button>
      </div>
      {showAddCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <AddCourses onClose={() => setShowAddCourse(false)} />
        </div>
      )}
      <p className="text-sm text-gray-500 mb-4">Courses you have recently accessed</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentCourses.map((course, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg shadow flex flex-col items-stretch overflow-hidden hover:shadow-md transition-shadow"
            style={{ minHeight: 180 }}
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-28 object-cover"
              style={{ objectFit: 'cover' }}
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-medium text-gray-900 text-base">{course.title}</h4>
                <p className="text-xs text-gray-600 mb-2">{course.subtitle}</p>
              </div>
              <div className="flex items-center mt-auto">
                <User size={14} className="text-gray-400 mr-1" />
                <span className="text-xs text-gray-600">{course.instructor}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCoursesCard;
