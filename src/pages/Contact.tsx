import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Copy,
  Check,
  Award,
  Target
} from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import EmailButton from '../components/EmailButton';
import PageHero from '../components/PageHero';

const cardMotion = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.1 } })
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Headquarters',
      details: 'Pusing, Perak, Malaysia',
      value: 'PLOT 9559 & 9560, JALAN JOHAN 2/6, KAWASAN PERINDUSTRIAN PENGKALAN 2, 31550 PUSING, PERAK, MALAYSIA'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: '+60 5-3652989',
      value: '+60 5-3652989'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: 'chorkk1@gmail.com',
      value: 'chorkk1@gmail.com'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Business Hours',
      details: 'Mon-Sat: 8:30am - 5:00pm',
      value: 'Mon-Sat: 8:30am - 5:00pm'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Colorful Background with Grid Design */}
      <div className="fixed inset-0 -z-50">
        {/* Multi-layered gradient background with vibrant colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 via-purple-400/35 to-red-500/40" />
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-400/30 via-transparent to-pink-400/30" />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/25 via-white/70 to-orange-400/25" />

        {/* Main Grid Pattern with Enhanced Colors */}
        <div className="absolute inset-0 opacity-35">
          <svg className="w-full h-full">
            <defs>
              <pattern id="contact-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="url(#contact-grid-gradient)" strokeWidth="1.2" />
                <circle cx="30" cy="30" r="2.5" fill="url(#contact-dot-gradient)" opacity="0.8" />
                <path d="M 15 30 L 45 30 M 30 15 L 30 45" stroke="url(#contact-cross-gradient)" strokeWidth="0.6" opacity="0.6" />
                <rect x="25" y="25" width="10" height="10" fill="none" stroke="url(#contact-rect-gradient)" strokeWidth="0.4" opacity="0.5" />
              </pattern>
              <linearGradient id="contact-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="25%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="75%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <radialGradient id="contact-dot-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#f59e0b" />
              </radialGradient>
              <linearGradient id="contact-cross-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <linearGradient id="contact-rect-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-grid-pattern)" />
          </svg>
        </div>

        {/* Secondary Colorful Grid Pattern */}
        <div className="absolute inset-0 opacity-25">
          <svg className="w-full h-full">
            <defs>
              <pattern id="contact-secondary-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="url(#secondary-gradient)" strokeWidth="0.4" />
                <circle cx="10" cy="10" r="1" fill="url(#secondary-dot)" opacity="0.6" />
                <rect x="7" y="7" width="6" height="6" fill="none" stroke="url(#secondary-rect)" strokeWidth="0.3" opacity="0.4" />
              </pattern>
              <linearGradient id="secondary-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <radialGradient id="secondary-dot" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#06b6d4" />
              </radialGradient>
              <linearGradient id="secondary-rect" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-secondary-grid)" />
          </svg>
        </div>

        {/* Tertiary Micro Pattern for Extra Depth */}
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full">
            <defs>
              <pattern id="contact-micro-grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="4" cy="4" r="0.5" fill="#8b5cf6" opacity="0.3" />
                <rect x="3" y="3" width="2" height="2" fill="none" stroke="#06b6d4" strokeWidth="0.2" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-micro-grid)" />
          </svg>
        </div>

        {/* Enhanced Colorful Animated Background Elements */}
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-cyan-400/50 to-blue-500/45 blur-3xl rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.9, 0.6],
            x: [-30, 30, -30],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-pink-500/50 to-red-500/45 blur-3xl rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.7, 1.0, 0.7],
            y: [-20, 20, -20],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/45 to-teal-500/50 blur-2xl rounded-full"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0.8, 0.5],
            x: [-25, 25, -25],
            y: [-15, 15, -15],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-purple-400/40 to-indigo-500/45 blur-3xl rounded-full"
          animate={{
            scale: [1.1, 1.5, 1.1],
            opacity: [0.4, 0.7, 0.4],
            x: [20, -20, 20],
            y: [10, -10, 10],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-gradient-to-tr from-orange-400/45 to-yellow-500/40 blur-2xl rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
            x: [-15, 15, -15],
            y: [12, -12, 12],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Colorful Floating Geometric Elements */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-8 h-8 bg-gradient-to-r from-cyan-500/50 to-blue-600/50 rotate-45 rounded-lg"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [45, 405, 45],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/5 w-10 h-10 bg-gradient-to-r from-pink-500/40 to-red-500/40 rounded-full"
          animate={{
            y: [15, -15, 15],
            x: [8, -8, 8],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-2/3 right-1/5 w-6 h-12 bg-gradient-to-b from-emerald-500/40 to-teal-600/40 rounded-full"
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/5 left-2/3 w-7 h-7 bg-gradient-to-br from-purple-500/45 to-indigo-600/45 rounded-lg rotate-12"
          animate={{
            y: [-12, 12, -12],
            x: [-8, 8, -8],
            rotate: [12, 372, 12],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/5 right-2/3 w-5 h-14 bg-gradient-to-t from-orange-500/40 to-yellow-500/40 rounded-full"
          animate={{
            scaleY: [1, 1.4, 1],
            opacity: [0.3, 0.7, 0.3],
            x: [5, -5, 5],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 right-4 left-4 sm:left-auto z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-2xl border border-green-400/30"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <Check className="w-4 h-4 sm:w-6 sm:h-6" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Message Sent!</h3>
                <p className="text-xs sm:text-sm opacity-90">We'll get back to you within 24 hours.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <PageHero
        title="CONTACT US"
        subtitle="Get in touch for project inquiries, partnerships, or support. We're here to help you."
        icon={<MessageCircle className="text-accent-blue" size={48} />}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            custom={0}
            variants={cardMotion}
            initial="hidden"
            animate="visible"
            className="space-y-6 sm:space-y-8"
          >
            <div className="bg-gradient-to-br from-white/95 to-blue-50/90 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-10 border border-blue-100/50 relative overflow-hidden">
              {/* Enhanced decorative elements */}
              <div className="absolute top-0 right-0 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-12 sm:w-20 lg:w-24 h-12 sm:h-20 lg:h-24 bg-gradient-to-tr from-purple-100/30 to-transparent rounded-tr-full"></div>

              <div className="relative z-10">
                <h2 className="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 flex items-center">
                  <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-lg lg:rounded-xl flex items-center justify-center mr-2 sm:mr-3 lg:mr-4">
                    <MessageCircle className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-white" />
                  </div>
                  <span className="text-sm sm:text-base lg:text-xl">Contact Information</span>
                </h2>

                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  {contactInfo.map((info, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * i }}
                      className="group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 hover:bg-white/90 hover:shadow-lg transition-all duration-300 border border-gray-100/50 space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                          <div className="p-2 sm:p-3 lg:p-4 rounded-md sm:rounded-lg lg:rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                            <div className="text-blue-600 group-hover:scale-110 transition-transform duration-300">
                              {React.cloneElement(info.icon, { className: "w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" })}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg">{info.title}</h3>
                            <p className="text-gray-600 text-xs sm:text-sm lg:text-sm break-words">{info.details}</p>
                          </div>
                        </div>
                        {info.title !== 'Business Hours' && (
                          <motion.button
                            onClick={() => copyToClipboard(info.value, info.title)}
                            className="text-blue-600 text-xs sm:text-sm flex items-center justify-center space-x-1 sm:space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 font-medium border border-blue-200/50 w-full sm:w-auto mt-2 sm:mt-0"
                            whileHover={{
                              scale: 1.05,
                              boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)"
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {copiedField === info.title ? (
                              <>
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 200 }}
                                >
                                  <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                                </motion.div>
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 sm:w-4 sm:h-4" /> <span>Copy</span>
                              </>
                            )}
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 mt-6 sm:mt-8 lg:mt-12 pt-4 sm:pt-6 lg:pt-8 border-t border-gray-200/50">
                  {[
                    { value: '24h', label: 'Response Time', icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mx-auto text-blue-600" />, color: 'from-blue-500 to-blue-600' },
                    { value: '100%', label: 'Satisfaction', icon: <Check className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mx-auto text-green-600" />, color: 'from-green-500 to-green-600' },
                    { value: '15+', label: 'Years Exp.', icon: <Award className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mx-auto text-purple-600" />, color: 'from-purple-500 to-purple-600' }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                      className="text-center group cursor-default"
                      whileHover={{ y: -5 }}
                    >
                      <div className="bg-white/70 rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 hover:bg-white/90 hover:shadow-lg transition-all duration-300 border border-gray-100/50">
                        <div className="mb-1 sm:mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-300">
                          {stat.icon}
                        </div>
                        <p className={`text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-0.5 sm:mb-1`}>{stat.value}</p>
                        <p className="text-xs sm:text-sm lg:text-sm text-gray-600 font-medium leading-tight">{stat.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            custom={1}
            variants={cardMotion}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-gradient-to-br from-white/95 to-purple-50/90 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-10 border border-purple-100/50 relative overflow-hidden">
              {/* Enhanced decorative elements */}
              <div className="absolute top-0 left-0 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-gradient-to-br from-purple-100/30 to-transparent rounded-br-full"></div>
              <div className="absolute bottom-0 right-0 w-12 sm:w-20 lg:w-24 h-12 sm:h-20 lg:h-24 bg-gradient-to-tl from-blue-100/30 to-transparent rounded-tl-full"></div>

              <div className="relative z-10">
                <h2 className="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 flex items-center">
                  <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3 lg:mr-4">
                    <Target className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-white" />
                  </div>
                  <span className="text-sm sm:text-base lg:text-xl">Contact Form</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
                  {[
                    { name: 'fullName', label: 'Full Name *', type: 'text', placeholder: 'Please Enter your Name' },
                    { name: 'email', label: 'Email Address *', type: 'email', placeholder: 'Please Enter your Email' },
                    { name: 'phone', label: 'Phone Number *', type: 'tel', placeholder: 'Please Enter your Phone Number' }
                  ].map((f, i) => (
                    <motion.div
                      key={f.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * i }}
                    >
                      <label htmlFor={f.name} className="block text-xs sm:text-sm lg:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">{f.label}</label>
                      <motion.input
                        type={f.type}
                        id={f.name}
                        name={f.name}
                        value={formData[f.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        required
                        placeholder={f.placeholder}
                        className="w-full px-3 sm:px-4 lg:px-5 py-3 sm:py-3.5 lg:py-4 border border-gray-200/80 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <label htmlFor="subject" className="block text-xs sm:text-sm lg:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Subject *</label>
                    <motion.select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 lg:px-5 py-3 sm:py-3.5 lg:py-4 border border-gray-200/80 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-900 text-sm sm:text-base"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="project">Project Consultation</option>
                      <option value="quote">Request Quote</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                    </motion.select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label htmlFor="message" className="block text-xs sm:text-sm lg:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Message *</label>
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Tell us about your project..."
                      className="w-full px-3 sm:px-4 lg:px-5 py-3 sm:py-3.5 lg:py-4 border border-gray-200/80 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-900 placeholder-gray-400 resize-none text-sm sm:text-base"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(147, 51, 234, 0.2)",
                      background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 sm:space-x-3 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Button glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-xl"
                      animate={{
                        opacity: isSubmitting ? [0.5, 1, 0.5] : 0,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: isSubmitting ? Infinity : 0,
                      }}
                    />

                    <div className="relative z-10 flex items-center space-x-2 sm:space-x-3">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="text-sm sm:text-base lg:text-lg">Sending...</span>
                        </>
                      ) : (
                        <>
                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                          </motion.div>
                          <span className="text-sm sm:text-base lg:text-lg">Send Message</span>
                        </>
                      )}
                    </div>
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;