import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2 } from 'lucide-react';
import { fadeInUp, fadeInDelayed, hoverScale } from '../utils/animations';

const IntroSection: React.FC = () => {
  return (
    <section className="py-20" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            INTRODUCTION OF WAIKO INTERNATIONAL
          </h2>
          <div className="glow-divider mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Malaysia HQ */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={hoverScale as any}
            className="transform-gpu"
          >
            <div className="glow-card p-6 rounded-lg">
              <MapPin className="w-8 h-8 text-accent-blue dark:text-accent-red mb-3" />
              <h3 className="text-xl font-orbitron font-bold text-gray-900 dark:text-white mb-4">
                Malaysia Headquarters
              </h3>
              <p className="mb-4 text-gray-800 dark:text-white">
                Waiko International with Head Quarter in Malaysia is a One Stop Specialist Engineering, Equipment Manufacturer and Construction company in the South East Asia Region.
              </p>
              <ul className="list-disc pl-5 space-y-2 dark:text-white">
                <li>CIDB Grade G7</li>
                <li>ISO 9001:2015 / ISO 45001:2018</li>
                <li>PLOT 9559 & 9560, JALAN JOHAN 2/6, PENGKALAN 2, 31550 PERAK, MALAYSIA</li>
              </ul>
            </div>
          </motion.div>
          {/* Singapore Branch */}
          <motion.div
            variants={fadeInDelayed(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={hoverScale as any}
            className="transform-gpu"
          >
            <div className="glow-card p-6 rounded-lg">
              <Building2 className="w-8 h-8 text-accent-blue dark:text-accent-red mb-3" />
              <h3 className="text-xl font-orbitron font-bold text-gray-900 dark:text-white mb-4">
                Singapore Branch
              </h3>
              <p className="mb-4 text-gray-800 dark:text-white">
                Waiko International Sdn. Bhd. (Singapore Branch) is a key player in the region's infrastructure development.
              </p>
              <ul className="list-disc pl-5 space-y-2 dark:text-white">
                <li>UEN: T22FC0059E</li>
                <li>BCA Registration: SPECIALIST BUILDER LICENSE – IN SITU POST TENSIONING SB(PT)</li>
                <li>16 ARUMUGAM ROAD, #05-07, LTC BUILDING D, SINGAPORE 409961</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
