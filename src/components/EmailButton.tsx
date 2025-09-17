import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

interface EmailButtonProps {
  email?: string;
  subject?: string;
  body?: string;
}

const EmailButton: React.FC<EmailButtonProps> = ({ 
  email = 'chorkk1@gmail.com',
  subject = 'Inquiry from Waiko International Website',
  body = 'Hello,\n\nI would like to get in touch with Waiko International.\n\nBest regards,'
}) => {
  const openEmail = () => {
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  return (
    <motion.button
      initial={{ boxShadow: '0 0 0 0 rgba(59,130,246,0.7)' }}
      animate={{
        boxShadow: [
          '0 0 0 0 rgba(59,130,246,0.7)',
          '0 0 0 10px rgba(59,130,246,0)',
          '0 0 0 0 rgba(59,130,246,0.7)'
        ]
      }}
      transition={{ duration: 1.5, repeat: Infinity }}
      whileHover={{ scale: 1.15, boxShadow: '0 0 24px 8px rgba(59,130,246,0.5)' }}
      whileTap={{ scale: 0.95 }}
      onClick={openEmail}
      className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden group"
      title="Send us an email"
    >
      <Mail className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform" />
    </motion.button>
  );
};

export default EmailButton; 