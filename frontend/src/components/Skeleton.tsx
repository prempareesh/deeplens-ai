import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rect'
}) => {
  const baseStyles = 'bg-white/5 animate-pulse';
  
  const variants = {
    text: 'h-4 rounded w-3/4',
    rect: 'h-10 rounded-xl w-full',
    circle: 'rounded-full w-12 h-12 flex-shrink-0'
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
    />
  );
};
