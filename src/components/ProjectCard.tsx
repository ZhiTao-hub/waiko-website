import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  client: string;
  period: string;
  description: string;
  location: string;
  type: string;
  image: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  client, 
  period, 
  description, 
  location, 
  type,
  image
}) => {
  return (
    <motion.div
      className="overflow-hidden group cursor-pointer"
      whileHover={{ scale: 1.08, y: -8 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-accent-blue/30 to-accent-red/30 flex items-center justify-center">
        {/* Project image would go here */}
        <div className="bg-gray-300/30 border-2 border-dashed rounded-t-2xl w-full h-48 flex items-center justify-center">
          <Settings className="w-10 h-10 text-accent-blue opacity-60 mr-2 animate-spin-slow" />
          <span className="text-accent-blue text-2xl font-bold opacity-40">3D</span>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg sm:text-xl font-orbitron font-bold text-gray-900 group-hover:text-accent-blue transition tracking-wide flex items-center">
            {title}
          </h3>
          <span className="bg-accent-blue/10 text-accent-blue text-xs font-medium px-2.5 py-0.5 rounded">
            {type}
          </span>
        </div>
        <p className="text-accent-blue font-medium mb-2">{period}</p>
        <p className="text-gray-700 mb-4 line-clamp-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-white/60 text-gray-800 text-xs font-medium px-2.5 py-1 rounded">
            {location}
          </span>
          <span className="bg-white/60 text-gray-800 text-xs font-medium px-2.5 py-1 rounded">
            {client}
          </span>
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectCard;
