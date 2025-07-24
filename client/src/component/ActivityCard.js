
import React from 'react';

const ActivityCard = () => {
  const activities = [
    { description: 'Registration', detail: 'Complete add student data...', date: 'Jun 11, 2021', time: '12:00 PM' },
    { description: 'Attendance tracked', detail: 'Attendance marked - Present', date: 'Jun 11, 2021', time: '09:00 AM' },
    { description: 'Final Exam scores', detail: 'Final Exam scores uploaded', date: 'Jun 10, 2021', time: '03:30 PM' },
    { description: 'English Assignment', detail: 'English Assignment 2 graded', date: 'Jun 10, 2021', time: '11:45 AM' },
    { description: 'Missed attendance', detail: 'Missed attendance - Absent', date: 'Jun 9, 2021', time: '02:15 PM' },
  ];

  return (
    <div className="col-span-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Activity</h3>
      <div className="space-y-3 max-h-40 overflow-y-auto">
        {activities.slice(0, 4).map((activity, index) => (
          <div key={index} className="text-xs">
            <p className="text-gray-900 font-medium">{activity.description}</p>
            <p className="text-gray-600 text-xs">{activity.detail}</p>
            <p className="text-gray-500 text-xs">{activity.date} • {activity.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;
