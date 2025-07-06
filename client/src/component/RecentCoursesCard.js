
import React from 'react';
import { User } from 'lucide-react';

const RecentCoursesCard = () => {
  const recentCourses = [
    { title: 'Operating System', subtitle: 'Best Rating', instructor: 'Jose Moui' },
    { title: 'C Programming', subtitle: 'Best Rating', instructor: 'Jose Moui' },
  ];

  return (
    <div className="col-span-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-900">Recent Courses</h3>
        <button className="text-blue-600 text-xs hover:underline">View all</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 space-y-3">
        {recentCourses.map((course, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded">
            <h4 className="font-medium text-gray-900 text-sm">{course.title}</h4>
            <p className="text-xs text-gray-600">{course.subtitle}</p>
            <div className="flex items-center mt-2">
              <User size={12} className="text-gray-400 mr-1" />
              <span className="text-xs text-gray-600">{course.instructor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCoursesCard;
