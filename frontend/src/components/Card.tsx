import React, { type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: 'none' | 'primary' | 'accent';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  glow = 'none',
  hoverable = false,
  className = '',
  ...props
}) => {
  const glowStyles = {
    none: '',
    primary: 'glow-primary',
    accent: 'glow-accent'
  };

  const hoverStyles = hoverable 
    ? 'hover:translate-y-[-4px] hover:border-white/10 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300' 
    : '';

  return (
    <div
      className={`glass-card rounded-2xl p-6 relative overflow-hidden ${glowStyles[glow]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
