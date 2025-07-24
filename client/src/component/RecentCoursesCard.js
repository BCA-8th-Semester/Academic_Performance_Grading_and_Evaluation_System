import React, { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { useRecentCourses } from '../hooks/useRecentCourses';
import CourseCard from './CourseCard';
import Spinner from './ui/Spinner';
import ErrorMessage from './ui/ErrorMessage';
import AddCourses from './Add_courses';

/**
 * A container component that fetches and displays a list of recent courses.
 * It handles loading, error, and empty states, and provides functionality
 * for adding, editing, and deleting courses.
 */
const RecentCoursesCard = () => {
  const [showAddCourse, setShowAddCourse] = useState(false);
  const { courses, isLoading, error, refetch } = useRecentCourses();

  // Handlers are wrapped in useCallback for performance optimization,
  // preventing re-creation on each render. This is crucial if these
  // handlers were passed to memoized children.
  const handleEdit = useCallback((courseId) => {
    // In a real app, this would likely open a form or modal for editing.
    console.log('Edit clicked for course ID:', courseId);
    // Example: navigate(`/courses/${courseId}/edit`);
  }, []);

  const handleDelete = useCallback(async (courseId) => {
    // In a real app, you would show a confirmation modal before deleting.
    console.log('Delete clicked for course ID:', courseId);
    try {
      // await axios.delete(`http://localhost:5000/api/courses/${courseId}`);
      // After successful deletion, refetch the course list to update the UI.
      refetch();
    } catch (err) {
      console.error('Failed to delete course:', err);
      // Optionally, show an error notification to the user.
    }
  }, [refetch]);

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (error) {
      return (
        <ErrorMessage
          message="Failed to load recent courses. Please try again."
          onRetry={refetch}
        />
      );
    }

    if (courses.length === 0) {
      return (
        <div className="text-center text-gray-500 p-4">
          <p>No recent courses found.</p>
          <p>Click "Add" to get started.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="col-span-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Courses</h3>
        <button
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
          onClick={() => setShowAddCourse(true)}
        >
          <Plus size={16} className="mr-1" />
          Add
        </button>
      </div>

      {showAddCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <AddCourses
            onClose={() => setShowAddCourse(false)}
            onSuccess={() => {
              setShowAddCourse(false);
              refetch();
            }}
          />
        </div>
      )}

      <p className="text-sm text-gray-500 mb-4">Courses you have recently accessed</p>
      {/* {renderContent()} */}
    </div>
  );
};

export default RecentCoursesCard;
