// src/components/EngineeringBg.tsx
import React from 'react';
import { motion } from 'framer-motion';

const beams = [
  { height: 20, y: '15%', delay: 0 },
  { height: 25, y: '40%', delay: 1 },
  { height: 18, y: '65%', delay: 2 },
  { height: 22, y: '85%', delay: 3 },
];

const EngineeringBg: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 w-full h-full z-0 select-none overflow-hidden bg-white">
    {beams.map((beam, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          top: beam.y,
          height: beam.height,
          width: '100%',
          background: 'linear-gradient(90deg, #9ca3af, #6b7280, #374151)',
          borderTop: '1px solid #d1d5db',
          borderBottom: '1px solid #d1d5db',
          boxShadow: '0 0 10px rgba(0,0,0,0.4)',
          opacity: 0.85,
        }}
        initial={{ x: '-110%', opacity: 0 }}
        animate={{ x: '110%', opacity: 1 }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 12,
          delay: beam.delay,
          ease: [0.4, 0, 0.2, 1],
        }}
      />
    ))}
  </div>
);

export default EngineeringBg;
