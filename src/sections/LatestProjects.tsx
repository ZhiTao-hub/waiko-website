import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInDelayed, hoverScale } from '../utils/animations';

const projects = [
  {
    title: "Manila North South Corridor Railway Project (NSCR)",
    year: "2020-2024",
    desc: "Design, Manufacture and Commission 4 sets of Launching Gantry and 12 sets of Segmental Mould including technical supervision for SBG Erection works - 14KM (4300 segments).",
    client: "Sumitomo Mitsui",
  },
  {
    title: "Jurong Region Line Package J103, Singapore",
    year: "2020-2023",
    desc: "Design, Manufacture and Supply 12 sets of Precast Segmental Mould for Jurong Region Line Package J103.",
    client: "Wai Fong Construction Pte Ltd",
  },
];

const LatestProjects: React.FC = () => (
  <section className="py-20" data-aos="fade-up">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          LATEST PROJECTS
        </h2>
        <div className="glow-divider mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {projects.map((proj, idx) => (
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
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{proj.title}</h3>
              <p className="text-gray-700 dark:text-white mb-4">{proj.year}</p>
              <p className="mb-4 text-gray-800 dark:text-white">{proj.desc}</p>
              <p className="font-medium text-gray-800 dark:text-white">Client: {proj.client}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/projects" className="glow-btn">
            View All Projects
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

export default LatestProjects;