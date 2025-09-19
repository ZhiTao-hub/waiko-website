import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Anchor } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface AnchorTypeCardProps {
  title: string;
  description: string;
  features: string[];
  image?: string;
  colorIndex?: number;
}

const AnchorTypeCard: React.FC<AnchorTypeCardProps> = memo(({
  title,
  description,
  features,
  image,
  colorIndex = 0
}) => {

  return (
    <motion.div
      className="bg-white/95 backdrop-blur-xl rounded-3xl border-2 border-gray-200/50 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 relative group"
      whileHover={{ y: -10, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hover background gradient - only visible on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 via-purple-500/10 to-accent-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

      {/* Enhanced corner decorations */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-accent-blue/30 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-accent-red/30 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      {/* Subtle pattern overlay - only visible on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
        <svg className="w-full h-full rounded-3xl" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id={`card-pattern-${colorIndex}`} width="15" height="15" patternUnits="userSpaceOnUse">
              <circle cx="7.5" cy="7.5" r="0.8" fill="currentColor" className="text-accent-blue" />
              <path d="M 0 7.5 L 15 7.5 M 7.5 0 L 7.5 15" stroke="currentColor" strokeWidth="0.2" className="text-accent-red" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#card-pattern-${colorIndex})`} />
        </svg>
      </div>

      {/* Always visible number badge */}
      <motion.div
        className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-accent-blue to-accent-red rounded-full shadow-lg flex items-center justify-center text-white text-sm font-bold z-20"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: colorIndex * 0.2
        }}
      >
        {colorIndex + 1}
      </motion.div>

      <div className="p-6 relative z-10">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-accent-blue mb-3 font-orbitron transition-colors duration-300">{title}</h3>
        {image && (
          <div className="mb-4 flex justify-center">
            <motion.div
              className="max-h-40 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <OptimizedImage
                src={image}
                alt={title}
                className="max-h-40 object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </motion.div>
          </div>
        )}
        <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">{description}</p>
        <div className="border-t border-gray-200/50 pt-4">
          <h4 className="font-semibold text-gray-900 group-hover:text-accent-red mb-2 font-orbitron transition-colors duration-300">Key Features:</h4>
          <ul className="space-y-2">
            {features.slice(0, 3).map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.span
                  className="text-accent-blue group-hover:text-accent-red mr-2 mt-1 transition-colors duration-300"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  •
                </motion.span>
                <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
});

AnchorTypeCard.displayName = 'AnchorTypeCard';

export default AnchorTypeCard;