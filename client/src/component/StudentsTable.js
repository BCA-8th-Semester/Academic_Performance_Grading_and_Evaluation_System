
import React from 'react';
import { MoreHorizontal, Mail, Phone } from 'lucide-react';

const StudentsTable = () => {
  const students = [
    {
      id: 1,
      name: 'Abirami Shasthin',
      class: 'BBI Sem',
      year: '2020',
      grade: 'A',
      status: 'Active'
    },
    {
      id: 2,
      name: 'John Doe',
      class: 'CS Sem',
      year: '2021',
      grade: 'B+',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Sarah Wilson',
      class: 'ENG Sem',
      year: '2022',
      grade: 'A-',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Mike Johnson',
      class: 'MATH Sem',
      year: '2020',
      grade: 'B',
      status: 'Inactive'
    },
    {
      id: 5,
      name: 'Emma Davis',
      class: 'PHY Sem',
      year: '2021',
      grade: 'A+',
      status: 'Active'
    }
  ];

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Students</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Add Student
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Class</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Year</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Grade</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {student.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{student.name}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">{student.class}</td>
                <td className="py-4 px-4 text-sm text-gray-700">{student.year}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(student.grade)}`}>
                    {student.grade}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                    {student.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-600 hover:text-blue-600 transition-colors">
                      <Mail size={16} />
                    </button>
                    <button className="p-1 text-gray-600 hover:text-green-600 transition-colors">
                      <Phone size={16} />
                    </button>
                    <button className="p-1 text-gray-600 hover:text-gray-900 transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
