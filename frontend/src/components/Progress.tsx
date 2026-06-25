import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: 'primary' | 'accent' | 'success' | 'danger';
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  label,
  showValue = false,
  color = 'primary'
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colors = {
    primary: 'bg-primary-indigo shadow-indigo-500/10',
    accent: 'bg-accent-cyan shadow-cyan-500/10',
    success: 'bg-success-green shadow-green-500/10',
    danger: 'bg-danger-red shadow-red-500/10'
  };

  return (
    <div className="w-full flex flex-col gap-1.5">
      {/* Label and Percentage */}
      { (label || showValue) && (
        <div className="flex justify-between items-center text-xs font-semibold text-text-secondary select-none">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      
      {/* Progress Track */}
      <div className="w-full h-2 bg-white/5 border border-border-custom rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${colors[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
