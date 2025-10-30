import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <ApperIcon name="AlertCircle" size={64} className="mx-auto text-error" />
        </div>
        <h1 className="text-6xl font-display font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-display font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          <ApperIcon name="Home" size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}