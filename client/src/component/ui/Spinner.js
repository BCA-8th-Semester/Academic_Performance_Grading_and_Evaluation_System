import React from 'react';

/**
 * A simple loading spinner component.
 */
const Spinner = () => (
  <div className="flex justify-center items-center p-4">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default Spinner;