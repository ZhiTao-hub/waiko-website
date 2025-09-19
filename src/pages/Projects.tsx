
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Building2,
    ChevronLeft,
    ChevronRight,
    Globe,
    MapPin,
    X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import MalaysiaProjectsSection from '../components/MalaysiaProjectsSection';
import PageHero from '../components/PageHero';



// Core Business Sections Data
interface ProjectItem {
  title: string;
  client: string;
  period: string;
  location: string;
  type: string;
  image: string;
  category: string;
  images?: string[];  // Optional array for multiple images
  description?: string;  // Optional detailed description
}

interface BusinessSection {
  title: string;
  subtitle: string;
  description: string;
  projects: ProjectItem[];
}

interface CoreBusinessSections {
  featuredProjects: BusinessSection;
  [key: string]: BusinessSection;
}





// International projects for compatibility
const internationalProjects: ProjectItem[] = [
  {
    title: "Tunnel Formwork (Shutter) - Ulu Jelai Hydro Electric Project",
    client: "Hydro Electric Authority",
    period: "",
    location: "Pahang, Malaysia",
    type: "Tunnel",
    image: "/313_files/project_img/Others/pahang1.jpg",
    category: "pahang",
    images: [
      "/313_files/project_img/Others/pahang1.jpg",
      "/313_files/project_img/Others/pahang2.jpg"
    ]
  },
  {
    title: "Manila North South Corridor Railway",
    client: "Sumitomo Mitsui",
    period: "2020-2024",
    location: "Philippines",
    type: "Railway",
    image: "/313_files/project_img/Malina/Malina.jpg",
    category: "philippines",
    images: [
      "/313_files/project_img/Malina/Malina.jpg",
      "/313_files/project_img/Malina/Malina1.png",
      "/313_files/project_img/Malina/Malina2.jpg",
      "/313_files/project_img/Malina/Oversea1.png"
    ]
  },
  {
    title: "Dubai Metro Expansion Project",
    client: "Dubai Roads and Transport Authority",
    period: "2021-2025",
    location: "UAE",
    type: "Railway",
    image: "/313_files/project_img/Dubai.jpg",
    category: "uae"
  },
  {
    title: "Vietnam Infrastructure Development",
    client: "Vietnam Infrastructure Authority",
    period: "2020-2024",
    location: "Vietnam",
    type: "Infrastructure",
    image: "/313_files/project_img/Viet/Viet.jpg",
    category: "vietnam",
    images: [
      "/313_files/project_img/Viet/Viet.jpg",
      "/313_files/project_img/Viet/Viet1.jpg",
      "/313_files/project_img/Viet/Viet2.jpg",
      "/313_files/project_img/Viet/Viet3.jpg"
    ]
  },
  {
    title: "Italian High-Speed Railway Infrastructure",
    client: "Ferrovie dello Stato Italiane",
    period: "2019-2023",
    location: "Italy",
    type: "Railway",
    image: "/313_files/project_img/Italy.jpg",
    category: "italy"
  },
  {
    title: "Seoul Metro Line Extension",
    client: "Seoul Metropolitan Government",
    period: "2020-2024",
    location: "South Korea",
    type: "Railway",
    image: "/313_files/project_img/Korea.jpg",
    category: "korea"
  },
  {
    title: "Myanmar Bridge Infrastructure Project",
    client: "Myanmar Infrastructure Authority",
    period: "2022-2026",
    location: "Myanmar",
    type: "Bridge",
    image: "/313_files/project_img/Mynmmar.jpg",
    category: "myanmar"
  }
];

// Singapore specific projects
const singaporeProjects: ProjectItem[] = [
  {
    title: "Current Singapore Railway Project Phase 1",
    client: "LTA Singapore",
    period: "2023-2025",
    location: "Singapore",
    type: "Railway",
    image: "/313_files/project_img/Sing/SingCurrent1.jpg",
    category: "singapore"
  },
  {
    title: "Current Singapore MRT Extension Project",
    client: "Samsung C&T Corporation",
    period: "2023-2026",
    location: "Singapore",
    type: "Railway",
    image: "/313_files/project_img/Sing/SingCurrent2.jpg",
    category: "singapore"
  },
  {
    title: "Current Singapore Bridge Infrastructure",
    client: "LTA Singapore",
    period: "2024-2027",
    location: "Singapore",
    type: "Bridge",
    image: "/313_files/project_img/Sing/SingCurrent3.jpg",
    category: "singapore"
  },
  {
    title: "Current Singapore Urban Railway Development",
    client: "Wai Fong Construction Pte Ltd",
    period: "2024-2028",
    location: "Singapore",
    type: "Railway",
    image: "/313_files/project_img/Sing/SingCurrent4.png",
    category: "singapore"
  },
  {
    title: "Thomson-East Coast Line Package TEL4",
    client: "Samsung C&T Corporation",
    period: "2018-2022",
    location: "Singapore",
    type: "Railway",
    image: "/313_files/project_img/Sing/Sing1.png",
    category: "singapore"
  },
  {
    title: "Downtown Line Extension DTL3",
    client: "LTA Singapore",
    period: "2017-2021",
    location: "Singapore",
    type: "Railway",
    image: "/313_files/project_img/Sing/Sing2.png",
    category: "singapore"
  },
  {
    title: "North-South Corridor Bridge",
    client: "LTA Singapore",
    period: "2020-2024",
    location: "Singapore",
    type: "Bridge",
    image: "/313_files/project_img/Sing/Sing3.png",
    category: "singapore"
  },
  {
    title: "Marina Coastal Expressway",
    client: "LTA Singapore",
    period: "2016-2020",
    location: "Singapore",
    type: "Tunnel",
    image: "/313_files/project_img/Sing/Sing4.png",
    category: "singapore"
  },
  {
    title: "Singapore Metro Extension Project",
    client: "LTA Singapore",
    period: "2019-2023",
    location: "Singapore",
    type: "Railway",
    image: "/313_files/project_img/Sing/Sing5.jpg",
    category: "singapore"
  },
  {
    title: "Singapore Cross-Island Infrastructure",
    client: "Samsung C&T Corporation",
    period: "2020-2024",
    location: "Singapore",
    type: "Railway",
    image: "/313_files/project_img/Sing/Sing6.png",
    category: "singapore"
  }
];

// Specialized Technical Solutions data
const specializedSolutions: ProjectItem[] = [
  {
    title: "TBM Back Up Gantry and Carriage Segment",
    client: "Tunnel Construction Authority",
    period: "2022-2024",
    location: "International",
    type: "TBM Equipment",
    image: "/313_files/project_img/Others/TBM.jpg",
    category: "tbm",
    images: [
      "/313_files/project_img/Others/TBM.jpg",
      "/313_files/project_img/Others/TBM1.jpg"
    ],
    description: "Advanced tunnel boring machine backup systems and carriage segments designed for precision excavation and support in complex underground projects. Our TBM solutions ensure efficient tunneling operations with enhanced safety and productivity."
  },
  {
    title: "Refurbishment of STP Plants",
    client: "Water Treatment Authority",
    period: "2021-2023",
    location: "International",
    type: "Plant Refurbishment",
    image: "/313_files/project_img/Others/STP.jpg",
    category: "stp",
    images: [
      "/313_files/project_img/Others/STP.jpg"
    ],
    description: "Comprehensive sewage treatment plant refurbishment and modernization services to enhance efficiency and environmental compliance. We upgrade existing facilities with state-of-the-art technology for optimal performance."
  },
  {
    title: "Extension Kit for Pipe Jacking Utility TBM",
    client: "Underground Utility Corporation",
    period: "2023-2025",
    location: "International",
    type: "Pipe Jacking",
    image: "/313_files/project_img/Others/PIPE.jpg",
    category: "pipe",
    images: [
      "/313_files/project_img/Others/PIPE.jpg",
      "/313_files/project_img/Others/PIPE1.jpg"
    ],
    description: "Specialized extension kits and equipment for utility tunnel boring machines used in pipe jacking applications and underground utility installations. Our solutions enable precise utility placement with minimal surface disruption."
  },
  {
    title: "Fabrication of STOP LOG for ATB Riva SPA",
    client: "ATB Riva SPA",
    period: "2022-2024",
    location: "International",
    type: "Fabrication",
    image: "/313_files/project_img/Others/SPA.jpg",
    category: "spa",
    images: [
      "/313_files/project_img/Others/SPA.jpg",
      "/313_files/project_img/Others/SPA1.jpg",
      "/313_files/project_img/Others/SPA2.jpg",
      "/313_files/project_img/Others/SPA3.jpg"
    ],
    description: "Precision fabrication of stop log systems and hydraulic control equipment for water management and flow control applications. Our custom-engineered solutions provide reliable water level control and flow management."
  }
];

const coreBusinessSections: CoreBusinessSections = {
  featuredProjects: {
    title: "Featured Infrastructure Projects",
    subtitle: "Landmark Projects Across Southeast Asia and Beyond",
    description: "Our most significant infrastructure projects demonstrating excellence in engineering and construction across multiple countries and regions.",
    projects: [
      {
        title: "Major Infrastructure Development M1",
        client: "Government Infrastructure Authority",
        period: "2020-2024",
        location: "Malaysia",
        type: "Infrastructure",
        image: "/313_files/M4.jpg",
        category: "malaysia"
      },
      {
        title: "Cross Island Line Package CR102",
        client: "Samsung C&T Corporation",
        period: "2021-2025",
        location: "Singapore",
        type: "Railway",
        image: "/313_files/project_img/Sing/SingCurrent2.jpg",
        category: "singapore"
      },
      {
        title: "Manila North South Corridor Railway",
        client: "Sumitomo Mitsui",
        period: "2020-2024",
        location: "Philippines",
        type: "Railway",
        image: "/313_files/project_img/Malina/Malina.jpg",
        category: "philippines"
      },
      {
        title: "Dubai Metro Expansion Project",
        client: "Dubai Roads and Transport Authority",
        period: "2021-2025",
        location: "UAE",
        type: "Railway",
        image: "/313_files/project_img/Dubai.jpg",
        category: "uae"
      },
      {
        title: "Italian High-Speed Railway Infrastructure",
        client: "Ferrovie dello Stato Italiane",
        period: "2019-2023",
        location: "Italy",
        type: "Railway",
        image: "/313_files/project_img/Italy.jpg",
        category: "italy"
      },
      {
        title: "Vietnam Infrastructure Development",
        client: "Vietnam Infrastructure Authority",
        period: "2020-2024",
        location: "Vietnam",
        type: "Infrastructure",
        image: "/313_files/project_img/Viet/Viet.jpg",
        category: "vietnam"
      },
      {
        title: "Seoul Metro Line Extension",
        client: "Seoul Metropolitan Government",
        period: "2020-2024",
        location: "South Korea",
        type: "Railway",
        image: "/313_files/project_img/Korea.jpg",
        category: "korea"
      }
    ]
  }
};

// Flatten all projects for filtering
const allProjects: ProjectItem[] = [
  ...Object.values(coreBusinessSections).flatMap(section => section.projects),
  ...internationalProjects,
  ...singaporeProjects
];

const Projects: React.FC = () => {
  const [internationalImageIndex, setInternationalImageIndex] = useState(0);
  const [singaporeImageIndex, setSingaporeImageIndex] = useState(0);
  
  // Featured Infrastructure Projects popup states
  const [selectedFeaturedProject, setSelectedFeaturedProject] = useState<ProjectItem | null>(null);
  const [featuredProjectImageIndex, setFeaturedProjectImageIndex] = useState(0);
  
  // Specialized Solutions popup states
  const [selectedSolution, setSelectedSolution] = useState<ProjectItem | null>(null);
  const [solutionImageIndex, setSolutionImageIndex] = useState(0);
  const [hoveredSolution, setHoveredSolution] = useState<string | null>(null);
  
  // International Projects popup states
  const [selectedInternationalProject, setSelectedInternationalProject] = useState<ProjectItem | null>(null);
  const [internationalProjectImageIndex, setInternationalProjectImageIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 40 });
    
    // Auto-advance slideshow for International Projects
    const internationalInterval = setInterval(() => {
      setInternationalImageIndex((prev) => (prev + 1) % internationalProjects.length);
    }, 4000);
    
    // Auto-advance slideshow for Singapore Projects
    const singaporeInterval = setInterval(() => {
      setSingaporeImageIndex((prev) => (prev + 1) % singaporeProjects.length);
    }, 4000);
    
    return () => {
      clearInterval(internationalInterval);
      clearInterval(singaporeInterval);
    };
  }, []);

  // Featured Projects functions
  const openFeaturedProjectPopup = (project: ProjectItem) => {
    setSelectedFeaturedProject(project);
    setFeaturedProjectImageIndex(0);
  };

  const closeFeaturedProjectPopup = () => {
    setSelectedFeaturedProject(null);
    setFeaturedProjectImageIndex(0);
  };

  const nextFeaturedProjectImage = () => {
    if (selectedFeaturedProject && selectedFeaturedProject.images) {
      setFeaturedProjectImageIndex((prev) => (prev + 1) % selectedFeaturedProject.images!.length);
    }
  };

  const prevFeaturedProjectImage = () => {
    if (selectedFeaturedProject && selectedFeaturedProject.images) {
      setFeaturedProjectImageIndex((prev) => (prev - 1 + selectedFeaturedProject.images!.length) % selectedFeaturedProject.images!.length);
    }
  };

  // Touch event handlers for better mobile interaction
  const handleTouchStart = (e: React.TouchEvent) => {
    // Prevent default touch behavior for better mobile experience
    e.stopPropagation();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Prevent default touch behavior for better mobile experience
    e.stopPropagation();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Prevent default touch behavior for better mobile experience
    e.stopPropagation();
  };

  // Singapore Projects functions
  const openSingaporeProjectPopup = (project: ProjectItem) => {
    setSelectedInternationalProject(project);
    setInternationalProjectImageIndex(0);
  };

  const closeSingaporeProjectPopup = () => {
    setSelectedInternationalProject(null);
    setInternationalProjectImageIndex(0);
  };

  const nextSingaporeProjectImage = () => {
    if (selectedInternationalProject && selectedInternationalProject.images) {
      setInternationalProjectImageIndex((prev) => (prev + 1) % selectedInternationalProject.images!.length);
    }
  };

  const prevSingaporeProjectImage = () => {
    if (selectedInternationalProject && selectedInternationalProject.images) {
      setInternationalProjectImageIndex((prev) => (prev - 1 + selectedInternationalProject.images!.length) % selectedInternationalProject.images!.length);
    }
  };

  // Specialized Solutions functions
  const openSolutionPopup = (solution: ProjectItem) => {
    setSelectedSolution(solution);
    setSolutionImageIndex(0);
  };

  const closeSolutionPopup = () => {
    setSelectedSolution(null);
    setSolutionImageIndex(0);
  };

  const nextSolutionImage = () => {
    if (selectedSolution && selectedSolution.images) {
      setSolutionImageIndex((prev) => (prev + 1) % selectedSolution.images!.length);
    }
  };

  const prevSolutionImage = () => {
    if (selectedSolution && selectedSolution.images) {
      setSolutionImageIndex((prev) => (prev - 1 + selectedSolution.images!.length) % selectedSolution.images!.length);
    }
  };
  
  // International Projects functions
  const openInternationalProjectPopup = (project: ProjectItem) => {
    setSelectedInternationalProject(project);
    setInternationalProjectImageIndex(0);
  };

  const closeInternationalProjectPopup = () => {
    setSelectedInternationalProject(null);
    setInternationalProjectImageIndex(0);
  };

  const nextInternationalProjectImage = () => {
    if (selectedInternationalProject && selectedInternationalProject.images) {
      setInternationalProjectImageIndex((prev) => (prev + 1) % selectedInternationalProject.images!.length);
    }
  };

  const prevInternationalProjectImage = () => {
    if (selectedInternationalProject && selectedInternationalProject.images) {
      setInternationalProjectImageIndex((prev) => (prev - 1 + selectedInternationalProject.images!.length) % selectedInternationalProject.images!.length);
    }
  };



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
              <pattern id="projects-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="url(#projects-grid-gradient)" strokeWidth="1" />
                <circle cx="30" cy="30" r="2" fill="url(#projects-dot-gradient)" opacity="0.6" />
                <path d="M 15 30 L 45 30 M 30 15 L 30 45" stroke="url(#projects-cross-gradient)" strokeWidth="0.5" opacity="0.4" />
                <rect x="25" y="25" width="10" height="10" fill="none" stroke="url(#projects-rect-gradient)" strokeWidth="0.3" opacity="0.4" />
              </pattern>
              <linearGradient id="projects-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <radialGradient id="projects-dot-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#ef4444" />
              </radialGradient>
              <linearGradient id="projects-cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <linearGradient id="projects-rect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#projects-grid-pattern)" />
          </svg>
        </div>
        
        {/* Secondary Grid Pattern for Depth */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern id="projects-secondary-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3b82f6" strokeWidth="0.3" />
                <rect x="8" y="8" width="4" height="4" fill="none" stroke="#ef4444" strokeWidth="0.2" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#projects-secondary-grid)" />
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
        <PageHero 
          title="OUR PROJECTS"
          subtitle="Delivering Excellence Across Southeast Asia - From Malaysia to Singapore and Philippines"
          icon={<Building2 className="text-accent-blue" size={48} />}
        />
      </div>

      <div id="content">




        {/* Core Business Sections */}
        
        {/* Featured Infrastructure Projects Section */}
        <section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden" data-aos="fade-up">
          {/* Consistent Grid Background - Featured Projects */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-white/95 to-accent-red/10" />
            
            {/* Consistent Grid Pattern */}
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" aria-hidden="true">
                <defs>
                  <pattern id="featured-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#featured-grid-gradient)" strokeWidth="1" />
                    <circle cx="25" cy="25" r="1.5" fill="url(#featured-dot-gradient)" opacity="0.7" />
                    <path d="M 12.5 25 L 37.5 25 M 25 12.5 L 25 37.5" stroke="url(#featured-cross-gradient)" strokeWidth="0.4" opacity="0.5" />
                    <rect x="20" y="20" width="10" height="10" fill="none" stroke="url(#featured-rect-gradient)" strokeWidth="0.3" opacity="0.4" />
                  </pattern>
                  <linearGradient id="featured-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <radialGradient id="featured-dot-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </radialGradient>
                  <linearGradient id="featured-cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="featured-rect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#featured-grid-pattern)" />
              </svg>
            </div>
            
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-accent-blue/25 to-purple-500/15 blur-3xl rounded-full opacity-60" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-accent-red/25 to-pink-500/15 blur-3xl rounded-full opacity-50" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-4 heading-underline">
                  {coreBusinessSections.featuredProjects.title.toUpperCase()}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto mb-4 sm:mb-6">
                  {coreBusinessSections.featuredProjects.description}
                </p>
                <div className="bg-gradient-to-r from-accent-red to-accent-blue text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full inline-block font-orbitron font-bold text-xs sm:text-sm">
                  {coreBusinessSections.featuredProjects.projects.length} FEATURED PROJECTS • 7 COUNTRIES
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-auto">
              {/* First Row - Hero Project (Large) */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:col-span-2 md:row-span-2 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer touch-interactive"
                onClick={() => openFeaturedProjectPopup(coreBusinessSections.featuredProjects.projects[0])}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="relative h-64 sm:h-80 md:h-full overflow-hidden">
                  <img
                    src={coreBusinessSections.featuredProjects.projects[0].image}
                    alt={coreBusinessSections.featuredProjects.projects[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 right-3 sm:top-6 sm:right-6">
                    <span className="bg-accent-red text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                      {coreBusinessSections.featuredProjects.projects[0].location}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6">
                    <h3 className="text-white font-orbitron font-bold text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3">
                      {coreBusinessSections.featuredProjects.projects[0].title}
                    </h3>
                    <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-2 sm:mb-3">{coreBusinessSections.featuredProjects.projects[0].client}</p>
                    <div className="flex items-center justify-end">
                      <span className="text-white/90 text-xs sm:text-sm">{coreBusinessSections.featuredProjects.projects[0].location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Two vertical cards */}
              {coreBusinessSections.featuredProjects.projects.slice(1, 3).map((project, index) => (
                <motion.div
                  key={index + 1}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                  className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-48 sm:h-56 md:h-64 touch-interactive"
                  onClick={() => openFeaturedProjectPopup(project)}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="relative h-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                      <span className="bg-accent-blue text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                        {project.location}
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4">
                      <h3 className="text-white font-orbitron font-bold text-sm sm:text-base lg:text-lg mb-1">
                        {project.title}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm mb-1 sm:mb-2">{project.client}</p>
                      <div className="flex items-center justify-end">
                        <span className="text-white/80 text-xs sm:text-sm">{project.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Second Row - Wide card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="md:col-span-2 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => openFeaturedProjectPopup(coreBusinessSections.featuredProjects.projects[3])}
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="relative md:w-1/2 h-40 sm:h-48 md:h-auto overflow-hidden">
                    <img
                      src={coreBusinessSections.featuredProjects.projects[3].image}
                      alt={coreBusinessSections.featuredProjects.projects[3].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                  </div>
                  <div className="md:w-1/2 p-4 sm:p-6 flex flex-col justify-center">
                    <div className="mb-2 sm:mb-3">
                      <span className="bg-accent-red text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                        {coreBusinessSections.featuredProjects.projects[3].location}
                      </span>
                    </div>
                    <h3 className="text-gray-900 font-orbitron font-bold text-lg sm:text-xl mb-1 sm:mb-2">
                      {coreBusinessSections.featuredProjects.projects[3].title}
                    </h3>
                    <p className="text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base">{coreBusinessSections.featuredProjects.projects[3].client}</p>
                    <div className="flex items-center justify-end">
                      <span className="text-gray-500 text-xs sm:text-sm">{coreBusinessSections.featuredProjects.projects[3].location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Third Row - Mixed layout */}
              <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {/* Tall card */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-64 sm:h-72 md:h-80"
                  onClick={() => openFeaturedProjectPopup(coreBusinessSections.featuredProjects.projects[4])}
                >
                  <div className="relative h-full overflow-hidden">
                    <img
                      src={coreBusinessSections.featuredProjects.projects[4].image}
                      alt={coreBusinessSections.featuredProjects.projects[4].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                      <span className="bg-accent-blue text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                        {coreBusinessSections.featuredProjects.projects[4].location}
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4">
                      <h3 className="text-white font-orbitron font-bold text-sm sm:text-base lg:text-lg mb-1">
                        {coreBusinessSections.featuredProjects.projects[4].title}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm mb-1 sm:mb-2">{coreBusinessSections.featuredProjects.projects[4].client}</p>
                      <div className="flex items-center justify-end">
                        <span className="text-white/80 text-xs sm:text-sm">{coreBusinessSections.featuredProjects.projects[4].location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Two stacked horizontal cards */}
                <div className="md:col-span-2 space-y-4 sm:space-y-6">
                  {coreBusinessSections.featuredProjects.projects.slice(5, 7).map((project, index) => (
                    <motion.div
                      key={index + 5}
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: (index + 6) * 0.1 }}
                      className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-28 sm:h-32 md:h-36 touch-interactive"
                      onClick={() => openFeaturedProjectPopup(project)}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      <div className="flex flex-row h-full">
                        <div className="relative w-2/5 overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/30" />
                        </div>
                        <div className="w-3/5 p-2 sm:p-3 md:p-4 flex flex-col justify-center relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent" />
                          <div className="relative z-10">
                            <div className="mb-1 sm:mb-2">
                              <span className="bg-accent-red text-white px-2 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium">
                                {project.location}
                              </span>
                            </div>
                            <h3 className="text-gray-900 font-orbitron font-bold text-xs sm:text-sm mb-0.5 sm:mb-1">
                              {project.title}
                            </h3>
                            <p className="text-gray-600 text-xs mb-1 sm:mb-2">{project.client}</p>
                            <div className="flex items-center justify-end">
                              <span className="text-gray-500 text-xs">{project.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Malaysia Projects Section */}
        <MalaysiaProjectsSection />



        {/* Singapore Projects Section */}
        <section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden" data-aos="fade-up">
          {/* Consistent Grid Background - Singapore Projects */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-white/95 to-accent-red/10" />
            
            {/* Consistent Grid Pattern */}
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" aria-hidden="true">
                <defs>
                  <pattern id="singapore-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#singapore-grid-gradient)" strokeWidth="1" />
                    <circle cx="25" cy="25" r="1.5" fill="url(#singapore-dot-gradient)" opacity="0.7" />
                    <path d="M 12.5 25 L 37.5 25 M 25 12.5 L 25 37.5" stroke="url(#singapore-cross-gradient)" strokeWidth="0.4" opacity="0.5" />
                    <rect x="20" y="20" width="10" height="10" fill="none" stroke="url(#singapore-rect-gradient)" strokeWidth="0.3" opacity="0.4" />
                  </pattern>
                  <linearGradient id="singapore-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <radialGradient id="singapore-dot-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </radialGradient>
                  <linearGradient id="singapore-cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="singapore-rect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#singapore-grid-pattern)" />
              </svg>
            </div>
            
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-accent-blue/25 to-purple-500/15 blur-3xl rounded-full opacity-60" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-accent-red/25 to-pink-500/15 blur-3xl rounded-full opacity-50" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-4 heading-underline">
                  SINGAPORE PROJECTS
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto mb-4 sm:mb-6">
                  Advanced railway and infrastructure projects in Singapore, showcasing our expertise in complex urban construction and precision engineering solutions.
                </p>
                <div className="bg-gradient-to-r from-accent-blue to-accent-red text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full inline-block font-orbitron font-bold text-xs sm:text-sm">
                  TOTAL PROJECTS: 10
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:gap-12">
              {/* Merged Images and Description Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8"
              >
                {/* Contract Details First */}
                <div className="mb-6 sm:mb-8">
                  {/* Contract Points - Grid Layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    {/* Contract J103 */}
                    <div className="p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl border-l-4 border-blue-600">
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-2">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">J103</div>
                        <h5 className="font-semibold text-gray-900 text-xs sm:text-sm">Precast Segmental Mould</h5>
                      </div>
                      <p className="text-gray-700 text-xs leading-relaxed">Jurong Region Line Package J103, Singapore</p>
                    </div>

                    {/* Contract N112 and N111 */}
                    <div className="p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl border-l-4 border-green-600">
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-2">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xs">N112</div>
                        <h5 className="font-semibold text-gray-900 text-xs sm:text-sm">Cross Head Mould System</h5>
                      </div>
                      <p className="text-gray-700 text-xs leading-relaxed">Project North South Corridor NSC N112 and N111</p>
                    </div>

                    {/* Contract J112 */}
                    <div className="p-3 sm:p-4 bg-purple-50 rounded-lg sm:rounded-xl border-l-4 border-purple-600">
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-2">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">J112</div>
                        <h5 className="font-semibold text-gray-900 text-xs sm:text-sm">Post Tensioning Works</h5>
                      </div>
                      <p className="text-gray-700 text-xs leading-relaxed">Design and Installation for Jurong Region Line J112</p>
                    </div>
                  </div>
                </div>

                {/* Images Section */}
                <div className="mb-6 sm:mb-8">
                  <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={singaporeProjects[singaporeImageIndex]?.image}
                      alt={singaporeProjects[singaporeImageIndex]?.title}
                      className="w-full h-full object-cover transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    
                    {/* Navigation Arrows */}
                    <button
                      onClick={() => setSingaporeImageIndex((prev) => 
                        prev === 0 ? singaporeProjects.length - 1 : prev - 1
                      )}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>
                    <button
                      onClick={() => setSingaporeImageIndex((prev) => 
                        (prev + 1) % singaporeProjects.length
                      )}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/70 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                      {singaporeImageIndex + 1} / {singaporeProjects.length}
                    </div>
                  </div>
                  
                  {/* Project Navigation */}
                  <div className="flex justify-center space-x-1 sm:space-x-2 flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
                    {singaporeProjects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSingaporeImageIndex(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                          index === singaporeImageIndex 
                            ? 'bg-accent-blue' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Description Section */}
                <div>
                  {/* Bottom Grid - Technical Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Left Column */}
                    <div className="space-y-3 sm:space-y-4">
                      {/* Engineering Excellence */}
                      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                        <h4 className="font-orbitron font-bold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm">Engineering Excellence</h4>
                        <div className="grid grid-cols-2 gap-1 sm:gap-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-gray-700 text-xs">MRT Systems</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            <span className="text-gray-700 text-xs">Tunneling Solutions</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                            <span className="text-gray-700 text-xs">Railway Networks</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                            <span className="text-gray-700 text-xs">Urban Transport</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Project Scope */}
                      <div className="bg-blue-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                        <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1 sm:mb-2">Project Scope</h4>
                        <p className="text-gray-800 font-medium text-xs">Railway & MRT Systems, Post-Tensioning Works, Precast Segmental Construction</p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3 sm:space-y-4">
                      {/* Technical Solutions */}
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-orange-200">
                        <h4 className="font-orbitron font-bold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm">Technical Solutions</h4>
                        <div className="space-y-1 sm:space-y-2">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xs">1</div>
                            <span className="text-gray-700 text-xs">Precast Segmental Construction</span>
                          </div>
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xs">2</div>
                            <span className="text-gray-700 text-xs">Launching Gantry Systems</span>
                          </div>
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xs">3</div>
                            <span className="text-gray-700 text-xs">Tunnel Boring Operations</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Key Achievements */}
                      <div className="bg-green-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                        <h4 className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1 sm:mb-2">Key Achievements</h4>
                        <p className="text-gray-800 font-medium text-xs">Multiple MRT line completions, advanced tunneling solutions, and precision segmental construction.</p>
                      </div>
                    </div>
                  </div>

                  {/* Strategic Partnerships - Compact */}
                  <div className="mt-3 sm:mt-4 text-center">
                    <h4 className="font-orbitron font-bold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm">Strategic Partnerships</h4>
                    <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                      <div className="bg-white px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-sm border border-blue-200">
                        <span className="text-blue-600 font-medium text-xs">LTA Singapore</span>
                      </div>
                      <div className="bg-white px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-sm border border-purple-200">
                        <span className="text-purple-600 font-medium text-xs">Samsung C&T Corporation</span>
                      </div>
                      <div className="bg-white px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-sm border border-green-200">
                        <span className="text-green-600 font-medium text-xs">Wai Fong Construction</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* International Projects Section */}
        <section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden" data-aos="fade-up">
          {/* Consistent Grid Background - International Projects */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-white/95 to-accent-red/10" />
            
            {/* Consistent Grid Pattern */}
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" aria-hidden="true">
                <defs>
                  <pattern id="international-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#international-grid-gradient)" strokeWidth="1" />
                    <circle cx="25" cy="25" r="1.5" fill="url(#international-dot-gradient)" opacity="0.7" />
                    <path d="M 12.5 25 L 37.5 25 M 25 12.5 L 25 37.5" stroke="url(#international-cross-gradient)" strokeWidth="0.4" opacity="0.5" />
                    <rect x="20" y="20" width="10" height="10" fill="none" stroke="url(#international-rect-gradient)" strokeWidth="0.3" opacity="0.4" />
                  </pattern>
                  <linearGradient id="international-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <radialGradient id="international-dot-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </radialGradient>
                  <linearGradient id="international-cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="international-rect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#international-grid-pattern)" />
              </svg>
            </div>
            
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-accent-blue/25 to-purple-500/15 blur-3xl rounded-full opacity-60" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-accent-red/25 to-pink-500/15 blur-3xl rounded-full opacity-50" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-4 heading-underline">
                  INTERNATIONAL PROJECTS
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto mb-4 sm:mb-6">
                  Global infrastructure projects demonstrating our international expertise across multiple countries and diverse engineering challenges.
                </p>
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full inline-block font-orbitron font-bold text-xs sm:text-sm">
                  TOTAL PROJECTS: {internationalProjects.length} COUNTRIES
                </div>
              </motion.div>
            </div>

            <div className="space-y-8 sm:space-y-10 lg:space-y-12">
              {internationalProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex flex-col lg:flex-row gap-6 sm:gap-8 items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Project Image */}
                  <div className="lg:w-1/2">
                    <div className="relative group cursor-pointer" onClick={() => openInternationalProjectPopup(project)}>
                      <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl sm:rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                      <div className="relative bg-white rounded-xl sm:rounded-2xl p-1 sm:p-2 shadow-2xl">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg sm:rounded-xl group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                          <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                            {project.location}
                          </span>
                        </div>
                        {/* Click to view indicator */}
                        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/70 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Click to view image
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="lg:w-1/2 space-y-4 sm:space-y-6">
                    <div className="text-center lg:text-left">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold text-gray-900 mb-3 sm:mb-4">
                        {project.title}
                      </h3>
                      <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto lg:mx-0 mb-4 sm:mb-6"></div>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-purple-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-purple-600 uppercase tracking-wide mb-1 sm:mb-2">Client</h4>
                          <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-800">{project.client}</p>
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-purple-600 uppercase tracking-wide mb-1 sm:mb-2">Location</h4>
                          <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                            {project.location}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 sm:pt-6 border-t border-gray-200">
                        <div className="mb-3 sm:mb-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-purple-600 uppercase tracking-wide mb-1">Duration</h4>
                          <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">{project.period}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
                          <span className="text-xs sm:text-sm font-medium text-gray-600">Project #{index + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialized Technical Solutions Section */}
        <section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden" data-aos="fade-up">
          {/* Consistent Grid Background - Specialized Solutions */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-white/95 to-accent-red/10" />
            
            {/* Consistent Grid Pattern */}
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" aria-hidden="true">
                <defs>
                  <pattern id="specialized-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#specialized-grid-gradient)" strokeWidth="1" />
                    <circle cx="25" cy="25" r="1.5" fill="url(#specialized-dot-gradient)" opacity="0.7" />
                    <path d="M 12.5 25 L 37.5 25 M 25 12.5 L 25 37.5" stroke="url(#specialized-cross-gradient)" strokeWidth="0.4" opacity="0.5" />
                    <rect x="20" y="20" width="10" height="10" fill="none" stroke="url(#specialized-rect-gradient)" strokeWidth="0.3" opacity="0.4" />
                  </pattern>
                  <linearGradient id="specialized-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <radialGradient id="specialized-dot-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </radialGradient>
                  <linearGradient id="specialized-cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="specialized-rect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#specialized-grid-pattern)" />
              </svg>
            </div>
            
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-accent-blue/25 to-purple-500/15 blur-3xl rounded-full opacity-60" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-accent-red/25 to-pink-500/15 blur-3xl rounded-full opacity-50" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12 lg:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-4 heading-underline">
                  SPECIALIZED TECHNICAL SOLUTIONS
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto mb-4 sm:mb-6">
                  Advanced engineering solutions and specialized equipment for complex infrastructure projects, showcasing our technical expertise and innovation capabilities.
                </p>
                <div className="bg-gradient-to-r from-orange-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full inline-block font-orbitron font-bold text-xs sm:text-sm">
                  4 SPECIALIZED SOLUTIONS • CUTTING-EDGE TECHNOLOGY
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {specializedSolutions.map((solution, index) => (
                <motion.div
                  key={solution.category}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`group relative bg-gradient-to-br ${
                    solution.category === 'tbm' ? 'from-white to-orange-50/80 border-orange-200/50' :
                    solution.category === 'stp' ? 'from-white to-blue-50/80 border-blue-200/50' :
                    solution.category === 'pipe' ? 'from-white to-green-50/80 border-green-200/50' :
                    'from-white to-purple-50/80 border-purple-200/50'
                  } backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-[1.02] touch-interactive`}
                  onClick={() => openSolutionPopup(solution)}
                  onMouseEnter={() => setHoveredSolution(solution.category)}
                  onMouseLeave={() => setHoveredSolution(null)}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="flex flex-col">
                    <div className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden">
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/10 to-black/30" />
                      <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                        <span className={`bg-gradient-to-r ${
                          solution.category === 'tbm' ? 'from-orange-600 to-red-600' :
                          solution.category === 'stp' ? 'from-blue-600 to-cyan-600' :
                          solution.category === 'pipe' ? 'from-green-600 to-emerald-600' :
                          'from-purple-600 to-indigo-600'
                        } text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg`}>
                          {index + 1}
                        </span>
                      </div>
                      
                      {/* Click to view indicator */}
                      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/70 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click to view gallery
                      </div>
                    </div>
                    
                    <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center relative">
                      <h3 className={`text-gray-900 font-orbitron font-bold text-lg sm:text-xl mb-3 sm:mb-4 group-hover:${
                        solution.category === 'tbm' ? 'text-orange-700' :
                        solution.category === 'stp' ? 'text-blue-700' :
                        solution.category === 'pipe' ? 'text-green-700' :
                        'text-purple-700'
                      } transition-colors`}>
                        {solution.title}
                      </h3>
                      
                      {/* Short description for card */}
                      <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                        {solution.description?.split('.')[0]}.
                      </p>
                      
                      {/* Hover tooltip with full description */}
                      <AnimatePresence>
                        {hoveredSolution === solution.category && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-0 left-3 right-3 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl z-10"
                          >
                            <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Project Details</h4>
                            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                              {solution.description}
                            </p>
                            <div className="flex items-center justify-between text-xs">
                              <span className={`${
                                solution.category === 'tbm' ? 'text-orange-600' :
                                solution.category === 'stp' ? 'text-blue-600' :
                                solution.category === 'pipe' ? 'text-green-600' :
                                'text-purple-600'
                              } font-medium`}>
                                {solution.images?.length || 1} image{(solution.images?.length || 1) > 1 ? 's' : ''} available
                              </span>
                              <span className="text-gray-500">Click to view gallery</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                        <span className={`${
                          solution.category === 'tbm' ? 'text-orange-600 bg-orange-50' :
                          solution.category === 'stp' ? 'text-blue-600 bg-blue-50' :
                          solution.category === 'pipe' ? 'text-green-600 bg-green-50' :
                          'text-purple-600 bg-purple-50'
                        } font-semibold text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full`}>
                          {solution.period}
                        </span>
                        <span className="text-gray-500 text-xs bg-gray-100 px-3 py-1 sm:px-4 sm:py-2 rounded-full font-medium">
                          {solution.client}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>



        {/* Featured Projects Gallery Modal */}
        <AnimatePresence>
          {selectedFeaturedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeFeaturedProjectPopup}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-3xl shadow-2xl inline-block"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '90vw',
                  maxHeight: '90vh'
                }}
              >
                {/* Simple Close Button */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={closeFeaturedProjectPopup}
                    className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Image Display Only */}
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <img
                      src={selectedFeaturedProject.images?.[featuredProjectImageIndex] || selectedFeaturedProject.image}
                      alt=""
                      className="max-w-[90vw] max-h-[90vh] object-contain block rounded-3xl"
                    />
                  </div>
                  
                  {/* Navigation Arrows - only show if multiple images */}
                  {selectedFeaturedProject.images && selectedFeaturedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevFeaturedProjectImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextFeaturedProjectImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {selectedFeaturedProject.images && selectedFeaturedProject.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {featuredProjectImageIndex + 1} / {selectedFeaturedProject.images.length}
                    </div>
                  )}
                  
                  {/* Image thumbnails */}
                  {selectedFeaturedProject.images && selectedFeaturedProject.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      {selectedFeaturedProject.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setFeaturedProjectImageIndex(idx)}
                          className={`w-12 h-8 rounded overflow-hidden border-2 transition-all ${
                            idx === featuredProjectImageIndex ? 'border-white' : 'border-white/50'
                          }`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Specialized Solutions Gallery Modal */}
        <AnimatePresence>
          {selectedSolution && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeSolutionPopup}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-3xl shadow-2xl inline-block"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '90vw',
                  maxHeight: '90vh'
                }}
              >
                {/* Simple Close Button */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={closeSolutionPopup}
                    className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Image Display Only */}
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <img
                      src={selectedSolution.images?.[solutionImageIndex] || selectedSolution.image}
                      alt=""
                      className="max-w-[90vw] max-h-[90vh] object-contain block rounded-3xl"
                    />
                  </div>
                  
                  {/* Navigation Arrows - only show if multiple images */}
                  {selectedSolution.images && selectedSolution.images.length > 1 && (
                    <>
                      <button
                        onClick={prevSolutionImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextSolutionImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {selectedSolution.images && selectedSolution.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {solutionImageIndex + 1} / {selectedSolution.images.length}
                    </div>
                  )}
                  
                  {/* Image thumbnails */}
                  {selectedSolution.images && selectedSolution.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      {selectedSolution.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSolutionImageIndex(idx)}
                          className={`w-12 h-8 rounded overflow-hidden border-2 transition-all ${
                            idx === solutionImageIndex ? 'border-white' : 'border-white/50'
                          }`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* International Projects Gallery Modal */}
        <AnimatePresence>
          {selectedInternationalProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeInternationalProjectPopup}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-3xl shadow-2xl inline-block"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '90vw',
                  maxHeight: '90vh'
                }}
              >
                {/* Simple Close Button */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={closeInternationalProjectPopup}
                    className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Image Display Only */}
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <img
                      src={selectedInternationalProject.images?.[internationalProjectImageIndex] || selectedInternationalProject.image}
                      alt=""
                      className="max-w-[90vw] max-h-[90vh] object-contain block rounded-3xl"
                    />
                  </div>
                  
                  {/* Navigation Arrows - only show if multiple images */}
                  {selectedInternationalProject.images && selectedInternationalProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevInternationalProjectImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextInternationalProjectImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {selectedInternationalProject.images && selectedInternationalProject.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {internationalProjectImageIndex + 1} / {selectedInternationalProject.images.length}
                    </div>
                  )}
                  
                  {/* Image thumbnails */}
                  {selectedInternationalProject.images && selectedInternationalProject.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      {selectedInternationalProject.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setInternationalProjectImageIndex(idx)}
                          className={`w-12 h-8 rounded overflow-hidden border-2 transition-all ${
                            idx === internationalProjectImageIndex ? 'border-white' : 'border-white/50'
                          }`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Capabilities Summary */}
        <section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden" data-aos="fade-up">
          {/* Consistent Grid Background - Capabilities */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-white/95 to-accent-red/10" />
            
            {/* Consistent Grid Pattern */}
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" aria-hidden="true">
                <defs>
                  <pattern id="capabilities-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#capabilities-grid-gradient)" strokeWidth="1" />
                    <circle cx="25" cy="25" r="1.5" fill="url(#capabilities-dot-gradient)" opacity="0.7" />
                    <path d="M 12.5 25 L 37.5 25 M 25 12.5 L 25 37.5" stroke="url(#capabilities-cross-gradient)" strokeWidth="0.4" opacity="0.5" />
                    <rect x="20" y="20" width="10" height="10" fill="none" stroke="url(#capabilities-rect-gradient)" strokeWidth="0.3" opacity="0.4" />
                  </pattern>
                  <linearGradient id="capabilities-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <radialGradient id="capabilities-dot-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </radialGradient>
                  <linearGradient id="capabilities-cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="capabilities-rect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#capabilities-grid-pattern)" />
              </svg>
            </div>
            
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-accent-blue/25 to-purple-500/15 blur-3xl rounded-full opacity-60" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-accent-red/25 to-pink-500/15 blur-3xl rounded-full opacity-50" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-4 heading-underline">
                PROJECT CAPABILITIES
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
                Our comprehensive capabilities enable us to deliver complex infrastructure projects across multiple sectors and countries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  icon: <Building2 className="w-8 h-8 text-accent-red" />,
                  title: "Bridge Construction",
                  description: "Highway and railway bridge projects",
                  count: "3 Projects"
                },
                {
                  icon: <MapPin className="w-8 h-8 text-accent-blue" />,
                  title: "Tunnel Construction", 
                  description: "Underground tunnel and infrastructure",
                  count: "3 Projects"
                },
                {
                  icon: <Globe className="w-8 h-8 text-accent-red" />,
                  title: "Railway Systems",
                  description: "MRT and railway infrastructure projects",
                  count: "15 Projects"
                }
              ].map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg text-center hover:shadow-xl transition-all duration-300 touch-interactive"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="mb-3 sm:mb-4 flex justify-center">
                    {React.cloneElement(capability.icon, { className: "w-6 h-6 sm:w-8 sm:h-8 text-accent-red" })}
                  </div>
                  <h3 className="text-base sm:text-lg font-orbitron font-bold text-gray-900 mb-2">{capability.title}</h3>
                  <p className="text-gray-600 mb-2 sm:mb-3 text-xs sm:text-sm">{capability.description}</p>
                  <div className="text-accent-blue font-bold text-sm sm:text-base">{capability.count}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;

