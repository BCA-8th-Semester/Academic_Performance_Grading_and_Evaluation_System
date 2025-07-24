import React from 'react';

/**
 * A component to display a standardized error message.
 * @param {{ message: string, onRetry?: () => void }} props
 */
const ErrorMessage = ({ message, onRetry }) => (
  <div className="p-4 text-center text-red-600 bg-red-50 rounded-lg">
    <p>{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
      >
        Try Again
      </button>
    )}
  </div>
);

export default ErrorMessage;