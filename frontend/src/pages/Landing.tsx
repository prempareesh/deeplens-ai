import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ImageIcon, 
  VideoIcon, 
  BarChart4, 
  Cpu, 
  Zap, 
  FileSpreadsheet,
  ArrowRight,
  Upload,
  BrainCircuit,
  PieChart,
  Download
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { SectionTitle } from '../components/SectionTitle';

export const Landing: React.FC = () => {
  
  // Custom variant for scroll animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const features = [
    {
      icon: <ImageIcon className="w-6 h-6 text-accent-cyan" />,
      title: "Image Detection",
      desc: "Instant pixel-level verification for profile portraits, press photos, and social media uploads."
    },
    {
      icon: <VideoIcon className="w-6 h-6 text-primary-indigo" />,
      title: "Video Detection",
      desc: "Temporal sequence analysis utilizing frame-by-frame extraction to flag visual modifications."
    },
    {
      icon: <BarChart4 className="w-6 h-6 text-success-green" />,
      title: "AI Confidence Score",
      desc: "Delivers a robust, transparent probability score representing the fake likelihood of the media."
    },
    {
      icon: <Cpu className="w-6 h-6 text-indigo-400" />,
      title: "Vision Transformer",
      desc: "Harnesses self-attention mechanisms to map dependencies across local patches and global context."
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Fast Processing",
      desc: "Engineered for sub-second evaluations, keeping your content verification flows immediate."
    },
    {
      icon: <FileSpreadsheet className="w-6 h-6 text-pink-500" />,
      title: "Download Reports",
      desc: "Export comprehensive PDF/JSON cryptographic verification reports for compliance and audits."
    }
  ];

  const steps = [
    {
      icon: <Upload className="w-6 h-6 text-accent-cyan" />,
      title: "1. Upload Media",
      desc: "Drop your image or video directly into our secure verification zone."
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-primary-indigo" />,
      title: "2. Transformer Mapping",
      desc: "Self-attention maps dissect the spatial coordinates and patches of faces."
    },
    {
      icon: <PieChart className="w-6 h-6 text-yellow-500" />,
      title: "3. Predict Integrity",
      desc: "The classification head evaluates features to determine REAL or FAKE."
    },
    {
      icon: <Download className="w-6 h-6 text-success-green" />,
      title: "4. Export Report",
      desc: "Review metadata logs and download certified verification metrics."
    }
  ];

  const stats = [
    { value: '1.2M+', label: 'Images Verified' },
    { value: '840K+', label: 'Videos Processed' },
    { value: '98.85%', label: 'Detection Accuracy' },
    { value: '1.43s', label: 'Avg Processing Time' }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-[73px]">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-73px)] flex items-center py-20 px-6 overflow-hidden">
        {/* Soft Glowing Background Blur Elements */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary-indigo/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 rounded-full bg-accent-cyan/10 blur-[100px] pointer-events-none" />
        
        {/* Particle Animation Effect */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="particle rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                bottom: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-border-custom text-xs font-semibold tracking-wide text-text-secondary select-none">
              <ShieldCheck className="w-4 h-4 text-accent-cyan" />
              <span>Next-Gen Media Verification Suite</span>
            </div>
            
            <h1 className="font-heading text-5xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight">
              See Beyond <br />the Pixels. <br className="hidden sm:inline" />
              <span className="text-primary-indigo">Detect the Truth.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl">
              DeepLens is an AI-powered SaaS platform using state-of-the-art Convolutional Vision Transformers to verify media integrity. Instantly flag deepfakes in images and videos.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-2">
              <Link to="/detect">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Start Detection
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right SVG Illustration Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center items-center select-none"
          >
            <div className="relative w-full max-w-[420px] aspect-square rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-md p-8 flex items-center justify-center glow-primary">
              <svg viewBox="0 0 100 100" className="w-full h-full text-primary-indigo/30 animate-pulse">
                {/* Outer grid */}
                <path d="M10 10 H90 V90 H10 Z" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                <path d="M30 10 V90 M50 10 V90 M70 10 V90 M10 30 H90 M10 50 H90 M10 70 H90" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1 1" />
                
                {/* Abstract neural network mapping */}
                <circle cx="50" cy="50" r="28" fill="none" stroke="#6366F1" strokeWidth="1" />
                <circle cx="50" cy="50" r="14" fill="none" stroke="#06B6D4" strokeWidth="0.8" />
                
                {/* Node coordinates */}
                <circle cx="50" cy="22" r="2" fill="#6366F1" />
                <circle cx="50" cy="78" r="2" fill="#6366F1" />
                <circle cx="22" cy="50" r="2" fill="#6366F1" />
                <circle cx="78" cy="50" r="2" fill="#6366F1" />
                <circle cx="31" cy="31" r="2" fill="#06B6D4" />
                <circle cx="69" cy="69" r="2" fill="#06B6D4" />
                <circle cx="31" cy="69" r="2" fill="#06B6D4" />
                <circle cx="69" cy="31" r="2" fill="#06B6D4" />
                
                {/* Connections */}
                <line x1="50" y1="22" x2="31" y2="31" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                <line x1="50" y1="22" x2="69" y2="31" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                <line x1="22" y1="50" x2="31" y2="31" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                <line x1="22" y1="50" x2="31" y2="69" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                <line x1="50" y1="78" x2="31" y2="69" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                <line x1="50" y1="78" x2="69" y2="69" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                <line x1="78" y1="50" x2="69" y2="31" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                <line x1="78" y1="50" x2="69" y2="69" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                
                {/* Scanning radar line */}
                <line x1="50" y1="50" x2="70" y2="30" stroke="#06B6D4" strokeWidth="1.5">
                  <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="8s" repeatCount="indefinite" />
                </line>
              </svg>
              <div className="absolute inset-x-8 bottom-8 flex flex-col gap-1 items-center bg-black/40 p-3 rounded-xl border border-white/5 backdrop-blur-md">
                <span className="text-[10px] uppercase tracking-widest text-accent-cyan font-bold font-heading">attention map</span>
                <span className="text-xs font-semibold text-white">Transformer Attention Matrix</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="py-24 px-6 border-t border-border-custom relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <SectionTitle 
            title="Premium Detection Capabilities"
            subtitle="Built on cutting-edge research, DeepLens delivers sub-second deepfake detection metrics to flag visual manipulation across images and videos."
            tag="Key Features"
            alignment="center"
          />

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feat, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card hoverable className="h-full flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-border-custom flex items-center justify-center mb-2">
                    {feat.icon}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white tracking-wide">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feat.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="py-24 px-6 border-t border-border-custom bg-surface/20 relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <SectionTitle 
            title="Standard Verification Pipeline"
            subtitle="How DeepLens analyzes visual content from entry point to detailed metadata report generation."
            tag="How It Works"
            alignment="center"
          />

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          >
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeInUp} className="relative flex flex-col items-center text-center gap-4">
                {/* Step Connector line (Desktop only) */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 border-t-2 border-dashed border-border-custom z-0" />
                )}
                
                <div className="relative z-10 w-12 h-12 rounded-full bg-background border border-border-custom flex items-center justify-center text-white mb-2 shadow-lg shadow-black">
                  {step.icon}
                </div>
                <h3 className="font-heading text-base font-bold text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-text-secondary max-w-[200px] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. STATISTICS */}
      <section className="py-20 px-6 border-t border-border-custom bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 select-none">
                <span className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-text-secondary font-medium tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-24 px-6 border-t border-border-custom bg-gradient-to-b from-surface/20 to-background overflow-hidden relative">
        {/* Glow behind card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary-indigo/5 blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Card glow="primary" className="p-12 sm:p-16 flex flex-col items-center gap-6 border-white/5 bg-surface/40 backdrop-blur-lg">
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white max-w-xl tracking-tight leading-tight">
              Ready to verify your visual media in real-time?
            </h2>
            <p className="text-sm text-text-secondary max-w-md leading-relaxed">
              Verify video sequence models or standalone images. Get instant attention maps, logits outputs, and downloadable verification logs.
            </p>
            <div className="mt-2">
              <Link to="/detect">
                <Button size="lg" variant="accent" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Launch Platform
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

    </div>
  );
};
