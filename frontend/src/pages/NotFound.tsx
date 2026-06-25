import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, Home } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-73px)] justify-center items-center px-6 pt-[73px]">
      
      {/* Glow Blur Effect */}
      <div className="absolute w-80 h-80 rounded-full bg-primary-indigo/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <Card glow="primary" className="p-10 flex flex-col items-center gap-6 border-white/5 bg-surface/30">
          
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-danger-red/10 border border-danger-red/20 flex items-center justify-center text-danger-red animate-bounce">
            <ShieldAlert className="w-8 h-8" />
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-1.5">
            <h1 className="font-heading text-5xl font-extrabold text-white tracking-tight">404</h1>
            <h3 className="font-heading text-base font-bold text-white tracking-wide uppercase">Coordinate Integrity Failure</h3>
            <p className="text-xs text-text-secondary leading-relaxed max-w-[280px] mx-auto mt-1">
              The requested address does not exist on the DeepLens platform. The visual tokens could not be mapped.
            </p>
          </div>

          {/* Back Home Button */}
          <div className="mt-2 w-full">
            <Link to="/">
              <Button variant="primary" className="w-full" leftIcon={<Home className="w-4 h-4" />}>
                Return to Safety
              </Button>
            </Link>
          </div>

        </Card>
      </motion.div>

    </div>
  );
};
export default NotFound;
