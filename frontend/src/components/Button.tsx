import React, { type ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-primary-indigo hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/10 focus:ring-primary-indigo',
    secondary: 'bg-surface hover:bg-card text-white border border-border-custom focus:ring-gray-700',
    accent: 'bg-accent-cyan hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/10 focus:ring-accent-cyan',
    danger: 'bg-danger-red hover:bg-red-600 text-white shadow-lg shadow-red-500/10 focus:ring-danger-red',
    outline: 'border border-border-custom hover:bg-white/5 text-white focus:ring-white/20',
    ghost: 'hover:bg-white/5 text-text-secondary hover:text-white focus:ring-white/10'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : leftIcon ? (
        <span className="mr-2 flex items-center justify-center">{leftIcon}</span>
      ) : null}
      {children}
      {!isLoading && rightIcon ? (
        <span className="ml-2 flex items-center justify-center">{rightIcon}</span>
      ) : null}
    </button>
  );
};
