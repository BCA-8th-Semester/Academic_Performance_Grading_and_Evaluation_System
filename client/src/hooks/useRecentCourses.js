import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * @typedef {object} Course
 * @property {string} _id
 * @property {string} title
 * @property {string} subtitle
 * @property {string} instructor
 * @property {string} image
 */

/**
 * Custom hook to fetch recent courses data.
 * It handles loading, error, and data states.
 * @returns {{courses: Course[], isLoading: boolean, error: Error | null, refetch: () => void}}
 */
export const useRecentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = () => setTrigger(t => t + 1);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // NOTE: Using a placeholder API. Replace with your actual endpoint.
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch courses:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [trigger]);

  return { courses, isLoading, error, refetch };
};