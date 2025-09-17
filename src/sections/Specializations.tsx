import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, HardHat, Factory } from 'lucide-react';
import { fadeInDelayed, hoverScale } from '../utils/animations';

const Specializations: React.FC = () => {
  const specs = [
    {
      icon: <Wrench className="w-8 h-8 text-accent-blue dark:text-accent-red mb-3" />,
      title: "Design & Manufacturing",
      items: [
        "Design and Manufacture Launching Gantry & Lifter",
        "Design and Manufacture Tunnel & Bridge Formwork",
        "Manufacture and Refurbishment of Separation Plant for TBM",
        "Structural Steel Works",
      ],
    },
    {
      icon: <HardHat className="w-8 h-8 text-accent-blue dark:text-accent-red mb-3" />,
      title: "Contracting Services",
      items: [
        "Specialist Contractor for SBG Erections",
        "Design and Installer of Tensa Post Tensioning",
        "Railway Infrastructure Construction",
        "Highway Road Infrastructures",
      ],
    },
    {
      icon: <Factory className="w-8 h-8 text-accent-blue dark:text-accent-red mb-3" />,
      title: "Facilities",
      items: [
        "WAIKO WORKSHOP, IPOH",
        "Land Area 609,840 SOFT, Built Up 60%",
        "WAIKO FACTORY with Overhead 50TON Crane x 2 Units",
        "Crane Height 13.2m",
      ],
    },
  ];

  return (
    <section className="py-20 bg-white/80 dark:bg-primary-dark/80 backdrop-blur-md" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            OUR SPECIALIZATIONS
          </h2>
          <div className="glow-divider mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specs.map((spec, idx) => (
            <motion.div
              key={idx}
              variants={fadeInDelayed(idx * 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={hoverScale as any}
              className="transform-gpu"
            >
              <div className="glow-card p-6 rounded-lg">
                {spec.icon}
                <h3 className="text-xl font-orbitron font-bold text-gray-900 dark:text-white mb-4">
                  {spec.title}
                </h3>
                <ul className="space-y-2">
                  {spec.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-accent-blue dark:text-accent-red mr-2">•</span>
                      <span className="text-gray-800 dark:text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specializations;
