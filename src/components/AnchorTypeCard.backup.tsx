import React from 'react';
import { motion } from 'framer-motion';
import { Anchor } from 'lucide-react';

interface AnchorTypeCardProps {
  title: string;
  description: string;
  features: string[];
  image?: string;
  revealed?: boolean;
  onReveal?: () => void;
  onHide?: () => void;
}

const AnchorTypeCard: React.FC<AnchorTypeCardProps> = ({ 
  title, 
  description, 
  features, 
  image,
  revealed,
  onReveal,
  onHide,
}) => {
  // 3D tilt state
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Max tilt: 14deg
    const rotateY = ((x - centerX) / centerX) * 14;
    const rotateX = -((y - centerY) / centerY) * 14;
    setTilt({ x: rotateX, y: rotateY });
  };
  const handleMouseEnter = () => { if (onReveal) onReveal(); };
  const handleMouseLeave = () => { setTilt({ x: 0, y: 0 }); if (onHide) onHide(); };
  const handleTouch = () => { if (revealed) { if (onHide) onHide(); } else { if (onReveal) onReveal(); } };
  
  return (
    <motion.div
      className={`overflow-visible group cursor-pointer relative transition-all duration-500 ${revealed ? 'ring-4 ring-accent-blue' : 'opacity-80 grayscale-[0.3] hover:opacity-100 hover:grayscale-0'}`}
      style={{ 
        perspective: 900, 
        zIndex: revealed ? 20 : 1, 
        filter: revealed ? 'none' : 'blur(0px)',
      }}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: revealed ? 1.05 : 1, 
        filter: revealed ? 'none' : (revealed === undefined ? 'none' : 'blur(0.5px) grayscale(0.3)'),
      }}
      transition={{ type: 'spring', bounce: 0.45, duration: 0.9 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouch}
      tabIndex={0}
    >
      <motion.div
        className="bg-white p-6 rounded-2xl w-full"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          willChange: 'transform',
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      >
        {/* Label always visible above image */}
        <h3 className="text-lg sm:text-xl font-orbitron font-bold text-gray-900 mb-2 text-center">
          {title}
        </h3>
        {/* Image */}
        <div className="w-full flex justify-center mb-2 relative">
          {image && (
            <img
              src={image}
              alt={title}
              className="rounded-xl object-contain max-h-32 w-full bg-white"
              style={{ boxShadow: 'none', background: undefined }}
            />
          )}
        </div>
        
        {/* Info content - shown when revealed, hidden when not */}
        <motion.div
          initial={false}
          animate={revealed ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <motion.div
            className="rounded-2xl bg-black/90 px-6 py-8 mt-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-center mb-2">
              <Anchor className="w-7 h-7 text-accent-blue mr-2 opacity-80" />
              <span className="font-orbitron font-bold text-white tracking-wide text-lg sm:text-xl drop-shadow-lg">
                {title}
              </span>
            </div>
            <p className="text-white/90 mb-3 text-base sm:text-lg font-medium drop-shadow-lg">{description}</p>
            <h4 className="font-bold text-white mb-2 font-orbitron drop-shadow-lg">Key Features:</h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start text-white">
                  <span className="text-accent-blue mr-2 flex-shrink-0">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AnchorTypeCard;