import React, { useEffect, useState, useMemo } from 'react';
import AnchorTypeCard from '../components/AnchorTypeCard';
import MRTProjectsSection from '../components/MRTProjectsSection';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '../components/OptimizedImage';
import OptimizedMotion from '../components/OptimizedMotion';
import useOptimizedAOS from '../hooks/useOptimizedAOS';
import { preloadCriticalResources } from '../utils/performance';
import PageHero from '../components/PageHero';
import { Target } from 'lucide-react';
import ReactDOM from 'react-dom';

// Add this component before the main PostTensioning component
const MobileExcellenceCard = () => {
  return (
    <div className="lg:hidden bg-white/95 backdrop-blur-xl rounded-2xl border-2 border-accent-blue/30 shadow-lg p-6 my-8">
      <h3 className="text-xl font-orbitron font-bold text-gray-900 mb-4 text-center">
        Global Excellence
      </h3>

      <div className="space-y-4">
        <div className="flex items-start">
          <div className="bg-accent-blue/10 p-2 rounded-lg mr-3 flex-shrink-0">
            <span className="text-xl">🌍</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Worldwide Deployment</h4>
            <p className="text-sm text-gray-600 mt-1">
              Post-tensioning systems employed across five continents in bridges,
              buildings, and specialized structures.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-accent-blue/10 p-2 rounded-lg mr-3 flex-shrink-0">
            <span className="text-xl">✅</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Technical Standards</h4>
            <p className="text-sm text-gray-600 mt-1">
              Full compliance with European Technical Approval (ETA) and
              comprehensive CE markings.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-accent-blue/10 p-2 rounded-lg mr-3 flex-shrink-0">
            <span className="text-xl">🔧</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Advanced Systems</h4>
            <p className="text-sm text-gray-600 mt-1">
              Multi-strand tendon systems with comprehensive anchorage solutions
              for diverse applications.
            </p>
          </div>
        </div>
      </div>


    </div>
  );
};


const fadeInUp = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.4
    }
  },
};

const equipmentList: { label: string; images: string[]; modalImages?: string[] }[] = [
  { label: 'Stressing Jacks', images: ['/images/post-tensioning/equipment/Jack/Eq_11.4.png'], modalImages: ['/images/post-tensioning/equipment/Jack/Eq_11.1.png', '/images/post-tensioning/equipment/Jack/Eq_11.2.png', '/images/post-tensioning/equipment/Jack/Eq_11.3.png', '/images/post-tensioning/equipment/Jack/Eq_11.4.png'] },
  { label: 'Hydraulic Pumps', images: ['/images/post-tensioning/equipment/Pumps/Eq_12.2.png'], modalImages: ['/images/post-tensioning/equipment/Pumps/Eq_12.1.png', '/images/post-tensioning/equipment/Pumps/Eq_12.2.png', '/images/post-tensioning/equipment/Pumps/Eq_12.3.png', '/images/post-tensioning/equipment/Pumps/Eq_12.4.png'] },
  { label: 'Strand Pushing Machines', images: ['/images/post-tensioning/equipment/Pushing/Eq_13.1.png'], modalImages: ['/images/post-tensioning/equipment/Pushing/Eq_13.1.png', '/images/post-tensioning/equipment/Pushing/Eq_13.2.png'] },
  { label: 'Grouting Machines', images: ['/images/post-tensioning/equipment/Grouting/Eq_14.1.png'], modalImages: ['/images/post-tensioning/equipment/Grouting/Eq_14.1.png', '/images/post-tensioning/equipment/Grouting/Eq_14.2.png'] },
];

const PostTensioning: React.FC = () => {
  // Anchor types data
  const anchorTypes = [
    {
      id: 1,
      title: "Internal MTAI Live Anchorage",
      description: "The live anchorage MTAI is the most used and widely spread type of anchorage, whose compact geometry and reduced deviation angle provide a competitive advantage in all projects applications.",
      features: [
        "Compact geometry",
        "Reduced deviation angle",
        "High performance standards",
        "Ease of installation"
      ],
      image: "/images/post-tensioning/Anchors/Anchors_1.png"
    },
    {
      id: 2,
      title: "MTG Coupler Anchorage",
      description: "MTG system is the type of anchorage suitable for the coupling of tendons. It is fully integrated with the MTAI system.",
      features: [
        "Suitable for tendon coupling",
        "Fully integrated with MTAI system",
        "Allows installation of secondary tendon after primary"
      ],
      image: "/images/post-tensioning/Anchors/Anchors_2.png"
    },
    {
      id: 3,
      title: "MTAID Electrically Insulated Anchorage",
      description: "Designed to meet the demand for a total and permanent protection of post tensioning tendons from corrosive agents.",
      features: [
        "Total protection from corrosive agents",
        "Permanent solution",
        "Ideal for harsh environments"
      ],
      image: "/images/post-tensioning/Anchors/Anchors_3.png"
    },
    {
      id: 4,
      title: "External MTAIE Anchorage",
      description: "This anchorage can be used in external tendons and comes in different versions depending on the project features.",
      features: [
        "Fully dismountable version available",
        "Restressable for unbonded systems",
        "Not exchangeable for bonded systems"
      ],
      image: "/images/post-tensioning/Anchors/Anchors_4.png"
    },
    {
      id: 5,
      title: "Internal MTAIM Dead Anchorage",
      description: "Used for the point in which is not possible to stress directly or wedge-in the strands in the anchorages.",
      features: [
        "For horizontal cables",
        "Used when direct stressing isn't possible",
        "Specialized solution"
      ],
      image: "/images/post-tensioning/Anchors/Anchors_5.png"
    },
    {
      id: 6,
      title: "Internal MTDB Dead Anchorage",
      description: "Used for vertical cables in which threading and stressing shall be done from the top side with no access to the bottom anchorages.",
      features: [
        "For vertical cables",
        "Top-side threading and stressing",
        "No bottom access required"
      ],
      image: "/images/post-tensioning/Anchors/Anchors_6.png"
    },
    {
      id: 7,
      title: "Flat Slab PTS/PTSE PT Anchorage",
      description: "Bonded and Un-Bonded Post tensioning system for flat slabs or thin walls to be used with both metal and plastic ducts.",
      features: [
        "For flat slabs and thin walls",
        "Works with metal and plastic ducts",
        "Bonded and Un-Bonded options"
      ],
      image: "/images/post-tensioning/Anchors/Anchors_7.png"
    },
    {
      id: 8,
      title: "MTAI System in Cryogenic Applications",
      description: "Successfully tested at cryogenic conditions (-196°C) for use in LNG tanks and special structures.",
      features: [
        "Certified for -196°C conditions",
        "Ideal for LNG tanks",
        "Third-party tested and approved"
      ],
      image: "/images/post-tensioning/Anchors/Anchors_8.png"
    }
  ];

  // Use optimized AOS
  useOptimizedAOS({ duration: 600, once: true, offset: 40 });

  // Preload critical images
  const criticalImages = useMemo(() => [
    "/images/post-tensioning/post_Intro.jpg",
    "/images/post-tensioning/post_intro2.jpg",
    "/images/post-tensioning/Anchors/Anchors_1.png"
  ], []);

  useEffect(() => {
    preloadCriticalResources(criticalImages);
  }, [criticalImages]);

  const [selectedEquipment, setSelectedEquipment] = useState<{ label: string; modalImages?: string[] } | null>(null);
  const timelineEvents = [
    { year: '1964', text: 'Post-tensioning is at the beginning of its history and its application is still experimental. Tensacciai undergoes a phase of remarkable growth in Italy.' },
    { year: '1970', text: 'A programme of technological renewal begins with the adoption of the steel strand.' },
    { year: '1980', text: 'Tensacciai develops new tensioning systems and equipment in the field of ground anchors, combining innovation with versatility and ease of use.' },
    { year: '1990–2000', text: 'Tensacciai develops the sizes’ range of its post-tensioning products together with technical solutions. First Italian and French approvals on PT systems.' },
    { year: '2008', text: 'Tensacciai obtains ETA 08/0012 for multi‑strand MTAI PT system family.' },
    { year: '2011', text: 'TENSA obtains ETA 11/0017 for monostrand 1C15 PT system and extends ETA 08/0012 to external PT system application.' },
    { year: '2013–2015', text: 'Wide testing campaign on Tensacciai PT system in North America in accordance with AASHTO and PTI requirements.' },
    { year: '2015', text: 'TENSA obtains ETA 15/0023 for PTSE slab, 1MT single strand, CU single strand coupler PT systems.' },
    { year: '2016', text: 'Tensacciai extends ETA 08/0012 to couplers MTG and cryogenic applications.' },
    { year: '2017', text: 'New improvement in anchorage interaxis and edge distances.' },
    { year: '2018', text: 'Tensa AMTS Post‑tensioning system approved by FDOT.' },
  ];
  return (
    <div className="relative">
      {/* Enhanced Background with Blue & Red Gradients */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-accent-blue/20 via-white to-accent-red/20"></div>

      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 -z-40">
        {/* Enhanced Grid Pattern with Blue & Red */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern id="posttensioning-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="url(#posttensioning-grid-gradient)" strokeWidth="1" />
                <circle cx="30" cy="30" r="2" fill="url(#posttensioning-dot-gradient)" opacity="0.6" />
                <path d="M 15 30 L 45 30 M 30 15 L 30 45" stroke="url(#posttensioning-cross-gradient)" strokeWidth="0.5" opacity="0.4" />
                <rect x="25" y="25" width="10" height="10" fill="none" stroke="url(#posttensioning-rect-gradient)" strokeWidth="0.3" opacity="0.4" />
              </pattern>
              <linearGradient id="posttensioning-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <radialGradient id="posttensioning-dot-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#ef4444" />
              </radialGradient>
              <linearGradient id="posttensioning-cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <linearGradient id="posttensioning-rect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#posttensioning-grid-pattern)" />
          </svg>
        </div>

        {/* Secondary Grid Pattern for Depth */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern id="posttensioning-secondary-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3b82f6" strokeWidth="0.3" />
                <rect x="8" y="8" width="4" height="4" fill="none" stroke="#ef4444" strokeWidth="0.2" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#posttensioning-secondary-grid)" />
          </svg>
        </div>

        {/* Static Animated Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-accent-blue/30 to-purple-500/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-accent-red/30 to-pink-500/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-accent-blue/20 to-accent-red/20 rounded-full blur-2xl opacity-40" />

        {/* Static Floating Geometric Elements */}
        <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-gradient-to-r from-accent-blue/40 to-accent-red/40 rotate-45 opacity-30" />
        <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-gradient-to-r from-accent-red/40 to-accent-blue/40 rounded-full opacity-25" />
        <div className="absolute top-2/3 left-1/5 w-4 h-16 bg-gradient-to-b from-accent-blue/30 to-transparent rounded-full opacity-20" />
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-10">
        {/* Full Page Hero */}
        <PageHero
          title="POST-TENSIONING SOLUTIONS"
          subtitle="Advanced post-tensioning technology for concrete, composite and steel structures"
          icon={<Target className="text-accent-blue" size={72} />}
        />
      </div>

      {/* Main Content */}
      <div id="content">

        {/* ANCHORAGE DESCRIPTION */}
        <section className="py-20 relative overflow-hidden" data-aos="fade-up">
          {/* Consistent Grid Background - Anchorage */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-white/95 to-accent-red/10" />

            {/* Consistent Grid Pattern */}
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" aria-hidden="true">
                <defs>
                  <pattern id="anchorage-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#anchorage-grid-gradient)" strokeWidth="1" />
                    <circle cx="25" cy="25" r="1.5" fill="url(#anchorage-dot-gradient)" opacity="0.7" />
                    <path d="M 12.5 25 L 37.5 25 M 25 12.5 L 25 37.5" stroke="url(#anchorage-cross-gradient)" strokeWidth="0.4" opacity="0.5" />
                    <rect x="20" y="20" width="10" height="10" fill="none" stroke="url(#anchorage-rect-gradient)" strokeWidth="0.3" opacity="0.4" />
                  </pattern>
                  <linearGradient id="anchorage-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <radialGradient id="anchorage-dot-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </radialGradient>
                  <linearGradient id="anchorage-cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="anchorage-rect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#anchorage-grid-pattern)" />
              </svg>
            </div>

            <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-accent-blue/25 to-purple-500/15 blur-3xl rounded-full opacity-60" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-accent-red/25 to-pink-500/15 blur-3xl rounded-full opacity-50" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Enhanced Section Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <svg className="w-8 h-8 text-accent-blue mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  <h2 className="text-4xl font-orbitron font-bold text-gray-900 relative heading-underline">
                    TECHNICAL CAPABILITY
                  </h2>
                </div>
                <motion.p
                  className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  TENSA started to develop its own post-tensioning technology in the early years and has
                  <span className="font-semibold text-accent-blue">since become a global leader</span> in the field.
                </motion.p>
              </motion.div>
            </div>

            {/* Optimized Main Content Layout */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
              {/* Enhanced Left: Technical Info Card */}
              <motion.div
                className="flex-1 bg-white/95 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-3xl border-2 border-accent-blue/30 shadow-2xl relative overflow-hidden group"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)"
                }}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                {/* Enhanced decorative elements */}
                <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-accent-blue rounded-tl-3xl opacity-60 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-20 h-20 border-r-4 border-t-4 border-accent-red rounded-tr-3xl opacity-60 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 border-l-4 border-b-4 border-accent-red rounded-bl-3xl opacity-60 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-accent-blue rounded-br-3xl opacity-60 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300"></div>

                {/* Enhanced pattern overlay */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 group-active:opacity-10 transition-opacity duration-300">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="card-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1" fill="currentColor" className="text-accent-blue" />
                        <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="currentColor" strokeWidth="0.2" className="text-accent-blue" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#card-pattern)" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <motion.h3
                    className="text-2xl font-orbitron font-bold text-gray-900 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <span className="bg-gradient-to-r from-accent-blue to-accent-red bg-clip-text text-transparent">
                      System Capabilities
                    </span>
                  </motion.h3>
                  <motion.p
                    className="text-lg mb-8 text-gray-700 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Our post-tensioning system is suitable for <span className="font-semibold text-accent-blue">concrete, composite and steel structures</span>,
                    with a wide range of different systems available including stay cables.
                  </motion.p>

                  {/* Enhanced bullet points with better animations */}
                  <ul className="space-y-5">
                    {[
                      {
                        text: 'Global deployment across five continents in diverse applications',
                        icon: '🌍'
                      },
                      {
                        text: 'Multi-strand tendon systems with comprehensive anchorage solutions',
                        icon: '🔗'
                      },
                      {
                        text: 'Full compliance with European Technical Approval (ETA) and CE markings',
                        icon: '✅'
                      },
                      {
                        text: 'Advanced electrically insulated tendon technology for specialized applications',
                        icon: '⚡'
                      }
                    ].map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                        className="flex items-start gap-4 group/item hover:bg-accent-blue/5 rounded-xl p-3 transition-colors duration-300"
                      >
                        <span className="relative flex h-6 w-6 mt-1 flex-shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-30 group-hover/item:opacity-60"></span>
                          <span className="relative inline-flex rounded-full h-6 w-6 bg-gradient-to-r from-accent-blue to-accent-red items-center justify-center text-xs">
                            {item.icon}
                          </span>
                        </span>
                        <span className="text-gray-700 leading-relaxed font-medium group-hover/item:text-gray-900 transition-colors duration-300">
                          {item.text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* New: Stats section */}
                  <motion.div
                    className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <div className="text-center p-4 bg-accent-blue/10 rounded-xl">
                      <div className="text-2xl font-bold text-accent-blue">50+</div>
                      <div className="text-sm text-gray-600">Countries</div>
                    </div>
                    <div className="text-center p-4 bg-accent-red/10 rounded-xl">
                      <div className="text-2xl font-bold text-accent-red">25+</div>
                      <div className="text-sm text-gray-600">Years Experience</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Right: Interactive Image Gallery */}
              <motion.div
                className="flex-1 relative"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {(() => {
                  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
                  const [isHovered, setIsHovered] = React.useState(false);
                  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateY = ((x - centerX) / centerX) * 12;
                    const rotateX = -((y - centerY) / centerY) * 12;
                    setTilt({ x: rotateX, y: rotateY });
                  };
                  const handleMouseLeave = () => {
                    setTilt({ x: 0, y: 0 });
                    setIsHovered(false);
                  };
                  const handleMouseEnter = () => setIsHovered(true);

                  return (
                    <motion.div
                      className="relative w-full group"
                      style={{ perspective: 1500 }}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      onMouseEnter={handleMouseEnter}
                    >
                      {/* Main image container with enhanced effects */}
                      <motion.div
                        className="relative overflow-hidden rounded-3xl shadow-2xl"
                        animate={{
                          scale: isHovered ? 1.05 : 1,
                          rotateX: tilt.x,
                          rotateY: tilt.y,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        style={{ willChange: 'transform' }}
                      >
                        <img
                          src="/images/post-tensioning/post_Intro.jpg"
                          alt="Post Tensioning Technology"
                          className="w-full h-auto transition-all duration-700"
                        />

                        {/* Enhanced overlay effects */}
                        <div className={`absolute inset-0 bg-gradient-to-tr from-accent-blue/20 via-transparent to-accent-red/20 
                        opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500`} />

                        {/* Info overlay on hover */}
                        <motion.div
                          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"
                          initial={false}
                          animate={{ opacity: isHovered ? 1 : 0 }}
                        >
                          <div className="text-center text-white p-6">
                            <h4 className="text-2xl font-orbitron font-bold mb-2">Advanced Technology</h4>
                            <p className="text-lg opacity-90">State-of-the-art post-tensioning solutions</p>
                            <div className="mt-4 inline-flex items-center text-accent-blue">
                              <span className="mr-2">✨</span>
                              <span>Hover to explore</span>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Enhanced floating elements with better positioning */}
                      <motion.div
                        className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-accent-blue to-purple-600 rounded-full opacity-80 shadow-xl"
                        animate={{
                          y: [-8, 8, -8],
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.div
                        className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-r from-accent-red to-pink-600 rounded-full opacity-80 shadow-xl"
                        animate={{
                          y: [8, -8, 8],
                          scale: [1, 1.3, 1],
                          rotate: [0, -180, -360],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />

                      {/* Technical badges */}
                      <motion.div
                        className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <span className="text-sm font-semibold text-accent-blue">CE Certified</span>
                      </motion.div>

                      <motion.div
                        className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                      >
                        <span className="text-sm font-semibold text-accent-red">ETA Approved</span>
                      </motion.div>
                    </motion.div>
                  );
                })()}
              </motion.div>
            </div>

            {/* Enhanced Global Excellence Section - Inline Toggle */}
            <motion.div
              className="relative w-full mt-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {(() => {
                const [showDetails, setShowDetails] = React.useState(false);

                return (
                  <>
                    {/* Ambient glow effect */}
                    <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20 bg-gradient-to-r from-accent-blue/30 to-accent-red/30"></div>

                    {/* Main container with premium design */}
                    <motion.div
                      className="relative bg-white/95 backdrop-blur-xl rounded-3xl border-2 border-accent-blue/30 shadow-2xl overflow-hidden"
                      animate={{
                        height: showDetails ? "auto" : "auto"
                      }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      {/* Decorative corner elements */}
                      <div className="absolute top-0 left-0 w-24 h-24 border-l-4 border-t-4 border-accent-blue rounded-tl-3xl opacity-60"></div>
                      <div className="absolute top-0 right-0 w-24 h-24 border-r-4 border-t-4 border-accent-red rounded-tr-3xl opacity-60"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 border-l-4 border-b-4 border-accent-red rounded-bl-3xl opacity-60"></div>
                      <div className="absolute bottom-0 right-0 w-24 h-24 border-r-4 border-b-4 border-accent-blue rounded-br-3xl opacity-60"></div>

                      {/* Pattern overlay */}
                      <div className="absolute inset-0 opacity-5">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <defs>
                            <pattern id="excellence-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                              <circle cx="10" cy="10" r="1" fill="currentColor" className="text-accent-blue" />
                              <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="currentColor" strokeWidth="0.2" className="text-accent-blue" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#excellence-pattern)" />
                        </svg>
                      </div>

                      {/* Header */}
                      <div className="relative z-10 text-center p-4 sm:p-6 border-b border-accent-blue/20">
                        <motion.h3
                          className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold bg-gradient-to-r from-accent-blue via-purple-600 to-accent-red bg-clip-text text-transparent mb-3"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                        >
                          Global Excellence
                        </motion.h3>
                        <motion.div
                          className="w-20 h-1 bg-gradient-to-r from-accent-blue to-accent-red rounded-full mx-auto mb-3"
                          initial={{ width: 0 }}
                          whileInView={{ width: "5rem" }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                        />
                        <motion.p
                          className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >
                          Worldwide deployment of advanced post-tensioning solutions
                        </motion.p>
                      </div>

                      {/* Main Content Area */}
                      <div className="relative">
                        {/* Background Image */}
                        <motion.div
                          className="relative overflow-hidden"
                          animate={{
                            height: showDetails ? "200px" : "280px"
                          }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <motion.img
                            src="/images/post-tensioning/post_intro2.jpg"
                            alt="Post Tensioning Project - Global Excellence"
                            className="w-full h-full object-cover"
                            animate={{
                              scale: showDetails ? 1.1 : 1,
                              opacity: showDetails ? 0.3 : 1
                            }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          />

                          {/* Gradient overlay */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                            animate={{
                              opacity: showDetails ? 0.8 : 0.4
                            }}
                            transition={{ duration: 0.6 }}
                          />

                          {/* Corner accents on image */}
                          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/80 rounded-tl-lg"></div>
                          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/80 rounded-br-lg"></div>

                          {/* Floating badge */}
                          <motion.div
                            className="absolute top-4 right-4 bg-gradient-to-r from-accent-blue to-accent-red text-white px-3 py-1 rounded-full font-orbitron font-bold text-xs shadow-lg"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            animate={{
                              opacity: showDetails ? 0.7 : 1
                            }}
                          >
                            GLOBAL
                          </motion.div>

                          {/* View Details Button - Only show when details are hidden */}
                          <AnimatePresence>
                            {!showDetails && (
                              <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <motion.button
                                  className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 font-orbitron font-bold py-3 px-6 rounded-full shadow-2xl border-2 border-accent-blue/30 hover:border-accent-blue/60 transition-all duration-300"
                                  whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 15px 30px rgba(0,0,0,0.2)"
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => setShowDetails(true)}
                                >
                                  <span className="flex items-center gap-2">
                                    <span>View Details</span>
                                    <motion.span
                                      animate={{ x: [0, 3, 0] }}
                                      transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                      →
                                    </motion.span>
                                  </span>
                                </motion.button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        {/* Details Section - Shows when toggled */}
                        <AnimatePresence>
                          {showDetails && (
                            <motion.div
                              className="relative z-20 p-4 sm:p-6 bg-white/95 backdrop-blur-sm"
                              initial={{ opacity: 0, y: 20, height: 0 }}
                              animate={{ opacity: 1, y: 0, height: "auto" }}
                              exit={{ opacity: 0, y: -20, height: 0 }}
                              transition={{ duration: 0.6, ease: "easeInOut" }}
                            >
                              {/* Close button */}
                              <div className="flex justify-between items-center mb-4">
                                <h4 className="text-lg font-orbitron font-bold text-gray-900">Excellence Details</h4>
                                <button
                                  className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                                  onClick={() => setShowDetails(false)}
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>

                              {/* 4 Details Grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {[
                                  {
                                    title: "Worldwide Deployment",
                                    description: "Post-tensioning systems employed across five continents in bridges, buildings, and specialized structures.",
                                    icon: "🌍",
                                    gradient: "from-blue-500/10 to-cyan-500/10",
                                    borderColor: "border-blue-200"
                                  },
                                  {
                                    title: "Technical Standards",
                                    description: "Full compliance with European Technical Approval (ETA) and comprehensive CE markings.",
                                    icon: "✅",
                                    gradient: "from-green-500/10 to-emerald-500/10",
                                    borderColor: "border-green-200"
                                  },
                                  {
                                    title: "Advanced Systems",
                                    description: "Multi-strand tendon systems with comprehensive anchorage solutions for diverse applications.",
                                    icon: "🔗",
                                    gradient: "from-purple-500/10 to-violet-500/10",
                                    borderColor: "border-purple-200"
                                  },
                                  {
                                    title: "Innovation Leader",
                                    description: "Pioneering electrically insulated tendon technology for specialized engineering projects.",
                                    icon: "⚡",
                                    gradient: "from-orange-500/10 to-red-500/10",
                                    borderColor: "border-orange-200"
                                  }
                                ].map((item, idx) => (
                                  <motion.div
                                    key={idx}
                                    className={`bg-gradient-to-br ${item.gradient} backdrop-blur-sm rounded-lg border ${item.borderColor} shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 p-4`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    whileHover={{
                                      y: -3,
                                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                                    }}
                                  >
                                    <div className="flex items-start gap-3">
                                      <motion.span
                                        className="text-xl flex-shrink-0 mt-0.5"
                                        animate={{
                                          scale: [1, 1.1, 1],
                                        }}
                                        transition={{
                                          duration: 2,
                                          repeat: Infinity,
                                          delay: idx * 0.5
                                        }}
                                      >
                                        {item.icon}
                                      </motion.span>
                                      <div className="flex-1 min-w-0">
                                        <h5 className="font-orbitron font-bold text-gray-900 text-sm mb-2 leading-tight">{item.title}</h5>
                                        <p className="text-xs text-gray-700 leading-relaxed">{item.description}</p>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </>
                );
              })()}
            </motion.div>
          </div>
        </section>

        {/* History Timeline */}
        <section className="py-16 relative bg-white overflow-hidden" data-aos="fade-up">
          {/* animated background accents */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <motion.div
              className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-accent-blue/10 blur-3xl"
              initial={{ opacity: 0, scale: 0.8, x: -40, y: -40 }}
              whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
            <motion.div
              className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-accent-red/10 blur-3xl"
              initial={{ opacity: 0, scale: 0.8, x: 40, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
            {/* subtle grid */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="hist-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hist-grid)" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent-blue mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <h2 className="text-3xl font-orbitron font-bold text-gray-900 heading-underline">POST-TENSIONING HISTORY</h2>
              </div>
            </div>

            {/* Desktop Timeline - Horizontal Alternating Layout */}
            <div className="relative">
              {/* center animated line */}
              <motion.div
                className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 rounded-full bg-gradient-to-b from-accent-blue via-purple-400 to-accent-red"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                style={{ transformOrigin: 'top' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              />

              <div className="space-y-10">
                {timelineEvents.map((e, idx) => (
                  <motion.div
                    key={idx}
                    className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                  >
                    {/* dot with pulse */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2">
                      <span className="relative flex h-7 w-7">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-accent-blue/30 animate-ping" />
                        <span className="relative inline-flex rounded-full h-7 w-7 bg-white border-4 border-accent-blue shadow" />
                      </span>
                    </div>

                    {/* left / right alternation */}
                    {idx % 2 === 0 ? (
                      <div className="pl-12 md:pr-10 md:pl-0 md:text-right">
                        <div className="bg-white/80 backdrop-blur rounded-2xl border border-accent-blue/20 shadow p-4 sm:p-6">
                          <h3 className="text-lg sm:text-xl font-orbitron font-bold text-gray-900">{e.year}</h3>
                          <p className="text-gray-700 mt-1 text-sm sm:text-base">{e.text}</p>
                        </div>
                      </div>
                    ) : <div className="hidden md:block" />}

                    {idx % 2 === 0 ? (
                      <div className="hidden md:block" />
                    ) : (
                      <div className="pl-12 md:pl-10">
                        <div className="bg-white/80 backdrop-blur rounded-2xl border border-accent-red/20 shadow p-4 sm:p-6">
                          <h3 className="text-lg sm:text-xl font-orbitron font-bold text-gray-900">{e.year}</h3>
                          <p className="text-gray-700 mt-1 text-sm sm:text-base">{e.text}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>



        {/* ANCHORAGE DESCRIPTION */}
        <section className="py-16 bg-gray-50 relative overflow-hidden" data-aos="fade-up">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent-blue mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <h2 className="text-3xl font-orbitron font-bold text-gray-900 heading-underline">ANCHORAGE DESCRIPTION</h2>
              </div>
            </div>

            {/* Creative Layout with Featured Image at Top */}
            <div className="space-y-8">
              {/* Featured Main Image - Top Position */}
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <div className="relative group max-w-4xl w-full">
                  <div className="bg-glass p-8 rounded-3xl border-2 border-accent-blue/30 backdrop-blur-md shadow-2xl overflow-hidden">
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-accent-blue rounded-tl-3xl opacity-60"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 border-r-4 border-t-4 border-accent-red rounded-tr-3xl opacity-60"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 border-l-4 border-b-4 border-accent-red rounded-bl-3xl opacity-60"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-accent-blue rounded-br-3xl opacity-60"></div>

                    {/* Main featured image */}
                    <motion.div
                      className="relative flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <img
                        src="/313_files/Eq_10.jpg"
                        alt="Main Anchorage Description"
                        className="max-h-96 w-full object-contain rounded-2xl shadow-lg group-hover:shadow-2xl group-active:shadow-2xl transition-all duration-500"
                      />

                      {/* Floating badge */}
                      <div className="absolute -top-4 -right-4 bg-gradient-to-r from-accent-blue to-accent-red text-white px-4 py-2 rounded-full font-orbitron font-bold text-sm shadow-lg">
                        FEATURED
                      </div>
                    </motion.div>
                  </div>

                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 to-accent-red/5 rounded-3xl blur-xl -z-10 group-hover:from-accent-blue/10 group-hover:to-accent-red/10 group-active:from-accent-blue/10 group-active:to-accent-red/10 transition-all duration-500"></div>
                </div>
              </motion.div>

              {/* Supporting Images - Bottom Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                {/* Second Image */}
                <motion.div
                  className="relative group"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="bg-glass p-4 sm:p-6 rounded-2xl border border-accent-blue/20 backdrop-blur-md shadow-xl h-full">
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-blue/20 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative flex items-center justify-center h-full">
                      <img
                        src="/313_files/Eq_10.1.png"
                        alt="Anchorage Description Detail 1"
                        className="max-h-48 sm:max-h-72 w-full object-contain rounded-xl group-hover:scale-105 group-active:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Hover overlay with info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-accent-blue/90 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-500 rounded-2xl flex items-end justify-center p-4 sm:p-6">
                      <div className="text-white text-center">
                        <h3 className="font-orbitron font-bold text-base sm:text-lg mb-2">Technical Detail</h3>
                        <p className="text-xs sm:text-sm opacity-90">Anchorage Component Analysis</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Third Image */}
                <motion.div
                  className="relative group"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="bg-glass p-6 rounded-2xl border border-accent-red/20 backdrop-blur-md shadow-xl h-full">
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-accent-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative flex items-center justify-center h-full">
                      <img
                        src="/313_files/Eq_10.2.png"
                        alt="Anchorage Description Detail 2"
                        className="max-h-48 sm:max-h-72 w-full object-contain rounded-xl group-hover:scale-105 group-active:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Hover overlay with info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-accent-red/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl flex items-end justify-center p-4 sm:p-6">
                      <div className="text-white text-center">
                        <h3 className="font-orbitron font-bold text-base sm:text-lg mb-2">Specification</h3>
                        <p className="text-xs sm:text-sm opacity-90">Detailed Configuration</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Optional: Connection lines for visual flow */}
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-accent-blue to-accent-red opacity-30"></div>
                <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent"></div>
                <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-l from-transparent via-accent-red/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Anchor Types */}
        <section className="py-20 relative overflow-hidden" data-aos="fade-up">
          {/* Refined Background Design */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />

            {/* Subtle animated gradient orbs */}
            <motion.div
              className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-accent-blue/12 to-purple-500/8 blur-3xl rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [-20, 20, -20],
                y: [-15, 15, -15],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-accent-red/12 to-pink-500/8 blur-3xl rounded-full"
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.4, 0.6, 0.4],
                x: [15, -15, 15],
                y: [10, -10, 10],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Refined technical grid pattern */}
            <div className="absolute inset-0 opacity-[0.04]">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="anchor-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 25 0 L 0 0 0 25" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent-blue" />
                    <circle cx="12.5" cy="12.5" r="1" fill="currentColor" className="text-accent-blue" />
                    <path d="M 6 12.5 L 19 12.5 M 12.5 6 L 12.5 19" stroke="currentColor" strokeWidth="0.2" className="text-accent-blue" />
                    <rect x="9" y="9" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="0.15" className="text-accent-red" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#anchor-grid)" />
              </svg>
            </div>

            {/* Minimal floating elements */}
            <motion.div
              className="absolute top-1/4 right-1/5 w-6 h-6 bg-gradient-to-r from-accent-blue/25 to-cyan-400/25 rounded-full"
              animate={{
                y: [-15, 15, -15],
                x: [-8, 8, -8],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/5 w-8 h-8 bg-gradient-to-r from-accent-red/25 to-pink-400/25 rotate-45"
              animate={{
                rotate: [45, 405, 45],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Enhanced Section Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    className="relative mr-4"
                    whileHover={{ scale: 1.1, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-red rounded-full blur-md opacity-25"></div>
                    <svg className="relative w-8 h-8 text-accent-blue" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  <h2 className="text-3xl font-orbitron font-bold text-gray-900 heading-underline">ANCHOR TYPES</h2>

                </div>
                <motion.p
                  className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Our comprehensive post-tensioning system is engineered for{' '}
                  <span className="font-bold bg-gradient-to-r from-accent-blue to-accent-red bg-clip-text text-transparent">
                    concrete, composite and steel structures
                  </span>,
                  featuring an extensive range of specialized systems including advanced stay cable solutions.
                </motion.p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {anchorTypes.map((anchor, index) => (
                <AnchorTypeCard
                  key={anchor.id}
                  title={anchor.title}
                  description={anchor.description}
                  features={anchor.features}
                  image={anchor.image}
                  colorIndex={index}
                />
              ))}
            </div>

            {/* Bottom Summary Badge */}
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="inline-flex items-center gap-4 bg-white/70 backdrop-blur-sm rounded-full px-8 py-4 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300">
                <motion.div
                  className="w-3 h-3 bg-gradient-to-r from-accent-blue to-accent-red rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-gray-700 font-medium">8 Specialized Anchor Systems Available</span>
                <motion.div
                  className="w-3 h-3 bg-gradient-to-r from-accent-red to-accent-blue rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Equipment */}
        <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden" data-aos="fade-up">
          {/* Enhanced Background Design */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            {/* Animated gradient orbs */}
            <motion.div
              className="absolute -top-24 -left-24 w-72 h-72 bg-gradient-to-br from-accent-blue/15 to-accent-blue/5 blur-3xl rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [-30, 30, -30],
                y: [-15, 15, -15],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-accent-red/15 to-accent-red/5 blur-3xl rounded-full"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4],
                x: [25, -25, 25],
                y: [20, -20, 20],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Technical grid pattern */}
            <div className="absolute inset-0 opacity-[0.04]">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="intro-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 25 0 L 0 0 0 25" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-accent-blue" />
                    <circle cx="12.5" cy="12.5" r="1.5" fill="currentColor" className="text-accent-blue" />
                    <rect x="10" y="10" width="5" height="5" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-accent-blue" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#intro-grid)" />
              </svg>
            </div>

            {/* Floating geometric elements */}
            <motion.div
              className="absolute top-1/3 right-1/4 w-6 h-6 bg-accent-blue/20 rounded-full"
              animate={{
                y: [-15, 15, -15],
                x: [-8, 8, -8],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/5 w-8 h-8 bg-accent-red/20 rotate-45"
              animate={{
                rotate: [45, 405, 45],
                scale: [1, 1.2, 1],
                y: [-10, 10, -10],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-r from-accent-blue/30 to-accent-red/30 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.3 }}
              viewport={{ once: true }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Enhanced Section Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <svg className="w-8 h-8 text-accent-blue mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  <h2 className="text-4xl font-orbitron font-bold text-gray-900 relative heading-underline">
                    EQUIPMENT
                  </h2>
                </div>
                <motion.p
                  className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Our post-tensioning system is suitable for <span className="font-semibold text-accent-blue">concrete, composite and steel structures</span>,
                  with a wide range of different systems available including stay cables.
                </motion.p>
              </motion.div>
            </div>

            {/* Equipment Container with Premium Frame Design */}
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border-2 border-accent-blue/30 shadow-2xl p-8 mb-16">
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-24 h-24 border-l-4 border-t-4 border-accent-blue rounded-tl-3xl opacity-80"></div>
              <div className="absolute top-0 right-0 w-24 h-24 border-r-4 border-t-4 border-accent-red rounded-tr-3xl opacity-80"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 border-l-4 border-b-4 border-accent-red rounded-bl-3xl opacity-80"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 border-r-4 border-b-4 border-accent-blue rounded-br-3xl opacity-80"></div>

              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="equipment-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1" fill="currentColor" className="text-accent-blue" />
                      <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="currentColor" strokeWidth="0.2" className="text-accent-blue" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#equipment-pattern)" />
                </svg>
              </div>

              {/* Content inside the container */}
              <div className="relative z-10">
                {/* Simplified Equipment Grid - Only Main Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {equipmentList.map((equipment, index) => (
                    <motion.div
                      key={equipment.label}
                      className={`bg-white/95 backdrop-blur-xl rounded-3xl border-2 border-accent-blue/30 shadow-2xl relative overflow-hidden group cursor-pointer ${(index + 1) % 2 === 0 ? 'md:translate-y-5' : ''
                        } ${(index + 1) % 3 === 0 ? 'md:-translate-y-2.5' : ''}`}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)"
                      }}
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      onClick={() => setSelectedEquipment(equipment)}
                    >
                      {/* Enhanced decorative elements */}
                      <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-accent-blue rounded-tl-3xl opacity-60 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300"></div>
                      <div className="absolute top-0 right-0 w-20 h-20 border-r-4 border-t-4 border-accent-red rounded-tr-3xl opacity-60 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300"></div>
                      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-4 border-b-4 border-accent-red rounded-bl-3xl opacity-60 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300"></div>
                      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-accent-blue rounded-br-3xl opacity-60 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300"></div>

                      {/* Enhanced pattern overlay */}
                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 group-active:opacity-10 transition-opacity duration-300">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <defs>
                            <pattern id="card-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                              <circle cx="10" cy="10" r="1" fill="currentColor" className="text-accent-blue" />
                              <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="currentColor" strokeWidth="0.2" className="text-accent-blue" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#card-pattern)" />
                        </svg>
                      </div>

                      {/* Top accent bar */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue to-accent-red opacity-70"></div>

                      <div className="relative z-10">
                        {/* Only Main Image with hover button */}
                        <div className="relative rounded-2xl overflow-hidden shadow-lg">
                          <img
                            src={equipment.images[0]}
                            alt={`${equipment.label} - Main View`}
                            className="w-full h-64 object-contain bg-white transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Hover button overlay */}
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                              <p className="text-gray-800 font-medium">Click to view more images</p>
                            </div>
                          </div>
                        </div>

                        {/* Equipment label */}
                        <div className="p-3 sm:p-4">
                          <h3 className="text-base sm:text-lg font-orbitron font-bold text-gray-900 text-center">
                            <span className="bg-gradient-to-r from-accent-blue to-accent-red bg-clip-text text-transparent">
                              {equipment.label}
                            </span>
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment Modal Popup */}
        <AnimatePresence>
          {selectedEquipment && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEquipment(null)}
            >
              <motion.div
                className="relative bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl mx-4"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-24 h-24 border-l-4 border-t-4 border-accent-blue rounded-tl-3xl opacity-80"></div>
                <div className="absolute top-0 right-0 w-24 h-24 border-r-4 border-t-4 border-accent-red rounded-tr-3xl opacity-80"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 border-l-4 border-b-4 border-accent-red rounded-bl-3xl opacity-80"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 border-r-4 border-b-4 border-accent-blue rounded-br-3xl opacity-80"></div>

                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-5">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="modal-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1" fill="currentColor" className="text-accent-blue" />
                        <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="currentColor" strokeWidth="0.2" className="text-accent-blue" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#modal-pattern)" />
                  </svg>
                </div>

                <div className="sticky top-0 bg-white/95 backdrop-blur-sm p-4 sm:p-6 border-b-2 border-accent-blue/20 rounded-t-2xl sm:rounded-t-3xl">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold text-gray-900">
                      <span className="bg-gradient-to-r from-accent-blue to-accent-red bg-clip-text text-transparent">
                        {selectedEquipment.label}
                      </span>
                    </h3>
                    <button
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                      onClick={() => setSelectedEquipment(null)}
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {selectedEquipment.modalImages?.map((image, index) => (
                      <motion.div
                        key={index}
                        className="rounded-2xl overflow-hidden shadow-lg relative group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        {/* Image border effect */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-accent-blue/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <img
                          src={image}
                          alt={`${selectedEquipment.label} - View ${index + 1}`}
                          className="w-full h-48 sm:h-56 lg:h-64 object-contain bg-white rounded-2xl"
                        />

                        {/* Image number badge */}
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-accent-blue to-accent-red text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* POST-TENSIONING TESTING */}
        <section className="py-16 relative bg-gradient-to-br from-white via-blue-50 to-purple-50 overflow-hidden" data-aos="fade-up">
          {/* Enhanced Background Design */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            {/* Animated gradient orbs */}
            <motion.div
              className="absolute -top-24 -left-24 w-72 h-72 bg-gradient-to-br from-accent-blue/12 to-accent-blue/4 blur-3xl rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [-30, 30, -30],
                y: [-15, 15, -15],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-accent-red/12 to-accent-red/4 blur-3xl rounded-full"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4],
                x: [25, -25, 25],
                y: [20, -20, 20],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Technical grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">

                <defs>
                  <pattern id="test-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 25 0 L 0 0 0 25" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent-blue" />
                    <circle cx="12.5" cy="12.5" r="1.5" fill="currentColor" className="text-accent-blue" />
                    <path d="M 5 12.5 L 20 12.5 M 12.5 5 L 12.5 20" stroke="currentColor" strokeWidth="0.3" className="text-accent-blue" />
                    <rect x="8" y="8" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-accent-blue" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#test-grid)" />
              </svg>
            </div>

            {/* Floating geometric elements */}
            <motion.div
              className="absolute top-1/4 left-1/6 w-5 h-5 bg-accent-blue/25 rounded-full"
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/5 w-7 h-7 bg-accent-red/25 rotate-45"
              animate={{
                rotate: [45, 405, 45],
                scale: [1, 1.3, 1],
                y: [-15, 15, -15],
              }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-accent-red/20 rotate-45"
              animate={{
                rotate: [45, 405, 45],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent-blue mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <h2 className="text-3xl font-orbitron font-bold text-gray-900">POST‑TENSIONING TESTING</h2>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-blue to-accent-red mx-auto rounded-full mb-6"></div>
              <motion.p
                className="text-gray-700 text-lg max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="font-orbitron font-bold text-accent-blue">TENSA PT systems</span> are rigorously tested in AASHTO qualified laboratories, complying with{' '}
                <span className="font-semibold">AASHTO LRFD</span>, <span className="font-semibold">PTI/ASBI M50</span> 'Guide specification for grouted post-tensioning', and{' '}
                <span className="font-semibold">State DoTs Specifications</span>, ensuring full compliance with Technical Specifications.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
              {(() => {
                const thumbs = [
                  '/313_files/PT_test.jpg',
                  '/313_files/PT_test1.jpg',
                  '/313_files/PT_test2.jpg',
                ];
                const [activeIdx, setActiveIdx] = useState(0);
                return <>
                  {/* Left: active image */}
                  <motion.div
                    className="relative rounded-2xl border border-gray-200 shadow-xl overflow-hidden bg-white"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                  >
                    <img src={thumbs[activeIdx]} alt="Testing preview" className="w-full h-[280px] sm:h-[350px] lg:h-[420px] object-contain" />
                    {/* corner accents */}
                    <div className="absolute top-3 left-3 w-7 h-7 border-l-4 border-t-4 border-accent-blue rounded-tl-md" />
                    <div className="absolute bottom-3 right-3 w-7 h-7 border-r-4 border-b-4 border-accent-red rounded-br-md" />
                  </motion.div>

                  {/* Right: info + thumbnails */}
                  <motion.div
                    className="bg-white/90 backdrop-blur-sm rounded-2xl border border-accent-blue/20 shadow-lg p-5 sm:p-7"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    <h3 className="text-lg sm:text-xl font-orbitron font-bold text-gray-900 mb-4">Scope & Standards</h3>
                    <ul className="space-y-4">
                      {[
                        'Efficiency performance (ultimate breaking load)',
                        'Load transfer performance (to concrete)',
                        'Fatigue performance (cyclic loading)'
                      ].map((t, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-3.5 w-3.5 rounded-full bg-accent-blue shadow" />
                          <span className="text-gray-700">{t}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 rounded-xl bg-gradient-to-r from-accent-blue/10 to-accent-red/10 border border-accent-blue/20 p-4">
                      <p className="text-gray-800 text-sm">
                        <span className="font-orbitron font-bold">Compliance:</span> All tests carried out on <span className="font-semibold">TENSA PT systems</span> were performed in accordance to <span className="font-semibold">EN13391</span> and <span className="font-semibold">ETAG 013</span> in third party international worldwide known laboratories.
                      </p>
                    </div>
                    {/* Thumbnails */}
                    <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4">
                      {thumbs.map((src, idx) => {
                        const isActive = activeIdx === idx;
                        return (
                          <button
                            key={src}
                            type="button"
                            onClick={() => setActiveIdx(idx)}
                            className={`rounded-xl border p-3 bg-white flex items-center justify-center transition-all ${isActive ? 'border-accent-blue shadow-lg' : 'border-gray-200 hover:shadow'} `}
                            aria-label={`Show test image ${idx + 1}`}
                          >
                            <img src={src} alt={`thumb-${idx + 1}`} className="h-12 sm:h-16 lg:h-20 object-contain" />
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </>;
              })()}
            </div>

            {/* Integrated Logos Section */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Background pattern overlay */}
              <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="logo-grid" width="15" height="15" patternUnits="userSpaceOnUse">
                      <circle cx="7.5" cy="7.5" r="0.8" fill="currentColor" className="text-accent-blue" />
                      <path d="M 0 7.5 L 15 7.5 M 7.5 0 L 7.5 15" stroke="currentColor" strokeWidth="0.2" className="text-accent-blue" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#logo-grid)" />
                </svg>
              </div>

              <div className="relative z-10">


                {/* Logos Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
                  {/* PT Testing Logo */}
                  <motion.div
                    className="group flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-sm p-2 sm:p-4 h-16 sm:h-20 lg:h-24 hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <img
                      src="/313_files/PT_testingLogo.jpg"
                      alt="Post-Tensioning Testing"
                      className="max-h-10 sm:max-h-12 lg:max-h-16 w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>

                  {/* PT History Logo */}
                  <motion.div
                    className="group flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-sm p-2 sm:p-4 h-16 sm:h-20 lg:h-24 hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <img
                      src="/313_files/PT_Hist.jpg"
                      alt="Post-Tensioning History"
                      className="max-h-10 sm:max-h-12 lg:max-h-16 w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>

                  {/* PT Testing Logo 1 */}
                  <motion.div
                    className="group flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-sm p-2 sm:p-4 h-16 sm:h-20 lg:h-24 hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <img
                      src="/313_files/PT_testingLogo1.png"
                      alt="Testing Logo 1"
                      className="max-h-10 sm:max-h-12 lg:max-h-16 w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>

                  {/* PT Testing Logo 2 */}
                  <motion.div
                    className="group flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-sm p-2 sm:p-4 h-16 sm:h-20 lg:h-24 hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <img
                      src="/313_files/PT_testingLogo2.png"
                      alt="Testing Logo 2"
                      className="max-h-10 sm:max-h-12 lg:max-h-16 w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>

                  {/* PT Test Logo */}
                  <motion.div
                    className="group flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-sm p-2 sm:p-4 h-16 sm:h-20 lg:h-24 hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <img
                      src="/313_files/PT_testLogo.png"
                      alt="Test Logo"
                      className="max-h-10 sm:max-h-12 lg:max-h-16 w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>

                  {/* PT Test Logo 1 */}
                  <motion.div
                    className="group flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-sm p-2 sm:p-4 h-16 sm:h-20 lg:h-24 hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <img
                      src="/313_files/PT_testLogo1.png"
                      alt="Test Logo 1"
                      className="max-h-10 sm:max-h-12 lg:max-h-16 w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PostTensioning;