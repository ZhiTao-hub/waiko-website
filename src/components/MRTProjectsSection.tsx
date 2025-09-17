import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Building } from 'lucide-react';

interface MRTProject {
  id: string;
  title: string;
  line: string;
  segments: number;
  description: string;
  details: string[];
  image: string;
  status: string;
  year: string;
}

const mrtProjects: MRTProject[] = [
  {
    id: 'ssp',
    title: 'MRT 2 - SSP Line',
    line: 'Sungai Buloh-Serdang-Putrajaya Line',
    segments: 1200,
    description: 'Various packages including V201 Part 1 Segments, V201 V202 Segments, V204 Segments, V205 V206 Segments.',
    details: [
      'Advanced segmental construction',
      'High-precision manufacturing',
      'Quality assurance protocols',
      'On-time delivery commitment'
    ],
    image: '/313_files/Malaysia/M1.png',
    status: 'Completed',
    year: '2019-2022'
  },
  {
    id: 'sbk',
    title: 'MRT 1 - SBK Line',
    line: 'Sungai Buloh-Kajang Line',
    segments: 800,
    description: 'Package V7 SSP Segments, Package V4 SSP Segments, Package V202 Segments and V4 Pier Segments.',
    details: [
      'First MRT line in Malaysia',
      'Complex urban construction',
      'Innovative engineering solutions',
      'Sustainable construction practices'
    ],
    image: '/313_files/Malaysia/M2.png',
    status: 'Completed',
    year: '2016-2019'
  },
  {
    id: 'lrt3',
    title: 'LRT3 - Bandar Line',
    line: 'Bandar Utama-Klang Line',
    segments: 435,
    description: 'First phase development of new LRT line connecting Bandar Utama and Klang.',
    details: [
      'Extended connectivity network',
      'Modern transit solutions',
      'Environmental considerations',
      'Community integration focus'
    ],
    image: '/313_files/Malaysia/M3.png',
    status: 'In Progress',
    year: '2020-2024'
  },
  {
    id: 'mrt2-v602',
    title: 'MRT2 - V602',
    line: 'SSP Line Extension',
    segments: 2423,
    description: 'Major extension package for the SSP line with advanced segmental construction.',
    details: [
      'Large-scale segment production',
      'Advanced logistics coordination',
      'Quality control excellence',
      'Technical innovation implementation'
    ],
    image: '/313_files/Malaysia/M4.png',
    status: 'Completed',
    year: '2020-2023'
  },
  {
    id: 'mrt2-v604',
    title: 'MRT2 - V604',
    line: 'SSP Line Package',
    segments: 625,
    description: 'Specialized package focusing on complex urban segments with high precision requirements.',
    details: [
      'Urban construction challenges',
      'Precision engineering',
      'Minimal disruption methods',
      'Advanced safety protocols'
    ],
    image: '/313_files/Malaysia/M5.png',
    status: 'Completed',
    year: '2021-2023'
  },
  {
    id: 'mrt1-v4',
    title: 'MRT1 - V4',
    line: 'SBK Line Package',
    segments: 435,
    description: 'Critical package for the SBK line featuring innovative construction techniques.',
    details: [
      'Pioneering construction methods',
      'Complex geometric requirements',
      'High-quality finish standards',
      'Efficient project delivery'
    ],
    image: '/313_files/Malaysia/M6.png',
    status: 'Completed',
    year: '2017-2019'
  }
];

const MRTProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<MRTProject>(mrtProjects[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    const nextIndex = (currentIndex + 1) % mrtProjects.length;
    setCurrentIndex(nextIndex);
    setSelectedProject(mrtProjects[nextIndex]);
  };

  const prevProject = () => {
    const prevIndex = (currentIndex - 1 + mrtProjects.length) % mrtProjects.length;
    setCurrentIndex(prevIndex);
    setSelectedProject(mrtProjects[prevIndex]);
  };

  const selectProject = (project: MRTProject, index: number) => {
    setSelectedProject(project);
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50/50 via-white to-accent-blue/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent-blue/10 blur-3xl rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-red/10 blur-3xl rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* <h2 className="text-3xl font-orbitron font-bold text-gray-900 mb-4 relative after:block after:w-16 after:h-[3px] after:bg-gradient-to-r after:from-accent-blue after:to-accent-red after:rounded-full after:mt-1 after:mx-auto">
              MRT PROJECTS IN MALAYSIA
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              TOTAL: <span className="font-bold text-accent-blue">5,918 ERECTED</span> All Segments | <span className="font-bold text-accent-red">12,567</span> QA
            </p> */}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Project Selection & Details */}
          <div className="space-y-6">
            {/* Project Selector Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-3"
            >
              {mrtProjects.map((project, index) => (
                <motion.button
                  key={project.id}
                  onClick={() => selectProject(project, index)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedProject.id === project.id
                      ? 'border-accent-blue bg-accent-blue/10 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-accent-blue/50 hover:bg-accent-blue/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-orbitron font-bold text-sm text-gray-900">
                      {project.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{project.line}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-accent-blue">
                      {project.segments.toLocaleString()} segments
                    </span>
                    <span className="text-xs text-gray-500">{project.year}</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Selected Project Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-accent-blue/20 shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-orbitron font-bold text-gray-900 mb-2">
                      {selectedProject.title}
                    </h3>
                    <p className="text-accent-blue font-medium mb-1">{selectedProject.line}</p>
                    <p className="text-gray-600">{selectedProject.description}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-accent-blue/10 rounded-lg">
                    <Building className="w-5 h-5 text-accent-blue mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900">
                      {selectedProject.segments.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">Segments</div>
                  </div>
                  <div className="text-center p-3 bg-accent-red/10 rounded-lg">
                    <Calendar className="w-5 h-5 text-accent-red mx-auto mb-1" />
                    <div className="text-sm font-bold text-gray-900">{selectedProject.year}</div>
                    <div className="text-xs text-gray-600">Timeline</div>
                  </div>
                  <div className="text-center p-3 bg-green-100 rounded-lg">
                    <Users className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <div className="text-sm font-bold text-gray-900">{selectedProject.status}</div>
                    <div className="text-xs text-gray-600">Status</div>
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {selectedProject.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-accent-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Image Display */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl p-4 shadow-2xl border border-gray-200">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedProject.id}
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-auto rounded-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevProject}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={nextProject}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>

                {/* Project Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
                    <h4 className="font-orbitron font-bold text-lg">{selectedProject.title}</h4>
                    <p className="text-sm opacity-90">{selectedProject.segments.toLocaleString()} segments</p>
                  </div>
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {mrtProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => selectProject(mrtProjects[index], index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? 'bg-accent-blue scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MRTProjectsSection;