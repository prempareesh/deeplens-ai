import React from 'react';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'white';
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary'
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colors = {
    primary: 'text-primary-indigo',
    accent: 'text-accent-cyan',
    white: 'text-white'
  };

  return (
    <div className="flex items-center justify-center">
      <Loader2 className={`animate-spin ${sizes[size]} ${colors[color]}`} />
    </div>
  );
};
