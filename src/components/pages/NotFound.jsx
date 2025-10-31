import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <ApperIcon name="SearchX" size={48} className="text-white" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl font-display font-bold text-gray-800">404</h1>
          <h2 className="text-2xl font-display font-semibold text-gray-700">Page Not Found</h2>
          <p className="text-gray-600">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
          >
            <ApperIcon name="Home" size={20} />
            <span>Back to Home</span>
          </Link>
          
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-all duration-200"
          >
            <ApperIcon name="ShoppingBag" size={20} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;