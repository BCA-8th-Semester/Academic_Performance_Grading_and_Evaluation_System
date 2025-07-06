
import React from 'react';
import { Clock, CheckCircle, AlertCircle, User } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      type: 'assignment',
      title: 'Math Assignment 1 graded',
      description: '85% average score',
      time: 'June 16, 2025',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      type: 'attendance',
      title: 'Attendance tracked',
      description: 'Present: 95%',
      time: 'June 17, 2025',
      icon: User,
      color: 'text-blue-500'
    },
    {
      type: 'exam',
      title: 'Final Exam scores uploaded',
      description: 'English Assignment 2 graded',
      time: 'June 17, 2025',
      icon: AlertCircle,
      color: 'text-orange-500'
    },
    {
      type: 'attendance',
      title: 'Missed attendance',
      description: 'Absent: 5%',
      time: 'June 18, 2025',
      icon: AlertCircle,
      color: 'text-red-500'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View all</button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className={`${activity.color} mt-1`}>
              <activity.icon size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-600">{activity.description}</p>
              <div className="flex items-center mt-1">
                <Clock size={12} className="text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
