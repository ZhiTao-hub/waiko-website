import React from 'react';
import { motion } from 'framer-motion';
import { Anchor } from 'lucide-react';

interface AnchorTypeCardProps {
  title: string;
  description: string;
  features: string[];
  image?: string;
}

const AnchorTypeCard: React.FC<AnchorTypeCardProps> = ({ 
  title, 
  description, 
  features, 
  image
}) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        {image && (
          <div className="mb-4 flex justify-center">
            <img 
              src={image} 
              alt={title} 
              className="max-h-40 object-contain rounded-lg"
            />
          </div>
        )}
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
          <ul className="space-y-1">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default AnchorTypeCard;