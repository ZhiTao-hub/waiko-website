import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

interface CertificateCardProps {
  title: string;
  issuer: string;
  description: string;
  date: string;
  certificateNumber: string;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ 
  title, 
  issuer, 
  description, 
  date, 
  certificateNumber 
}) => {
  return (
    <motion.div
      className="overflow-hidden group cursor-pointer bg-white"
      whileHover={{ scale: 1.08, y: -8 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-center mb-2">
          <Award className="w-7 h-7 text-accent-blue mr-2 opacity-80" />
          <h3 className="text-lg sm:text-xl font-orbitron font-bold text-gray-900 group-hover:text-accent-blue transition tracking-wide">
            {title}
          </h3>
        </div>
        <p className="text-accent-blue font-medium mb-3">{issuer}</p>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-accent-blue/20">
          <div>
            <p className="text-sm text-gray-600">Certificate No.</p>
            <p className="font-medium">{certificateNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Valid</p>
            <p className="font-medium">{date}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;
