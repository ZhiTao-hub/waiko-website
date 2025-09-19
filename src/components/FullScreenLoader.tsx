import { motion } from 'framer-motion';
import React from 'react';

interface FullScreenLoaderProps {
  isLoading: boolean;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-accent-blue/10 via-white to-accent-red/10 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="loader-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent-blue" />
              <circle cx="5" cy="5" r="0.5" fill="currentColor" className="text-accent-blue" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loader-grid)" />
        </svg>
      </div>

      {/* Loading Content */}
      <div className="relative text-center">
        {/* Logo */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            className="mx-auto text-accent-blue"
          >
            <image href="/logo.png" x="0" y="0" width="100" height="100" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#loader-gradient)"
              strokeWidth="3"
              strokeDasharray="283"
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#ff3b3f" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Company Name */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-2xl sm:text-3xl font-orbitron font-bold tracking-tight">
            <span className="text-blue-900">WAIKO</span>{' '}
            <span className="text-red-500">INTERNATIONAL</span>
          </h1>
          <p className="text-sm font-orbitron font-medium tracking-wider mt-2">
            <span className="text-blue-700">Engineering</span>{' '}
            <span className="text-purple-600">Excellence</span>{' '}
            <span className="text-red-400">Guaranteed</span>
          </p>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-lg font-medium text-gray-700 mb-2">Initializing Page</p>
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-accent-blue rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-64 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 256 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-accent-blue to-accent-red rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FullScreenLoader;