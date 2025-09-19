import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 z-[9999] min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative text-center max-w-2xl mx-auto">
        {/* Error Icon */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <AlertTriangle className="w-24 h-24 text-red-500 mx-auto" />
        </motion.div>

        {/* Error Code */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-6xl sm:text-8xl font-orbitron font-bold text-gray-800 mb-2">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-blue to-accent-red rounded-full mx-auto" />
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-gray-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        {/* Company Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <svg
              width="40"
              height="40"
              viewBox="0 0 100 100"
              className="text-accent-blue"
            >
              <image href="/logo.png" x="0" y="0" width="100" height="100" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#error-gradient)"
                strokeWidth="3"
              />
              <defs>
                <linearGradient id="error-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="50%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#ff3b3f" />
                </linearGradient>
              </defs>
            </svg>
            <div>
              <div className="font-orbitron font-bold text-lg">
                <span className="text-blue-900">WAIKO</span>{' '}
                <span className="text-red-500">INTERNATIONAL</span>
              </div>
              <div className="text-xs font-orbitron font-medium tracking-wider">
                <span className="text-blue-700">Engineering</span>{' '}
                <span className="text-purple-600">Excellence</span>{' '}
                <span className="text-red-400">Guaranteed</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-blue to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Home size={20} />
            Go Home
          </Link>

          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <RefreshCw size={20} />
            Refresh
          </button>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-sm text-gray-500"
        >
          <p>If you continue to experience issues, please contact our support team.</p>
          <Link 
            to="/contact" 
            className="text-accent-blue hover:text-blue-700 font-medium underline mt-2 inline-block"
          >
            Contact Support
          </Link>
        </motion.div>

        {/* Development Info - Only visible in dev mode */}
        {import.meta.env.DEV && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8 text-xs text-gray-400 bg-gray-100 p-3 rounded-lg"
          >
            <p className="font-mono">Development Mode - Error Page Active</p>
            <p>Error testing buttons are available in the bottom corners</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;