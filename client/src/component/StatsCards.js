
import React from 'react';
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react';

const StatsCards = () => {
  const stats = [
    {
      title: 'Students',
      value: '120',
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Teachers',
      value: '15',
      icon: BookOpen,
      color: 'bg-green-500',
      change: '+3%'
    },
    {
      title: 'Courses',
      value: '8',
      icon: Award,
      color: 'bg-purple-500',
      change: '+5%'
    },
    {
      title: 'Performance',
      value: '95%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+8%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <div className="flex items-center mt-2">
                <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                <span className="text-gray-500 text-sm ml-1">vs last month</span>
              </div>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="text-white" size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
