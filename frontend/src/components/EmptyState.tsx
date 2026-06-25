import React from 'react';
import { Card } from './Card';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionButton?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionButton
}) => {
  return (
    <Card className="flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto border border-white/5 bg-surface/30">
      
      {/* Icon Wrapper */}
      <div className="w-16 h-16 rounded-full bg-white/5 border border-border-custom flex items-center justify-center text-text-secondary mb-5">
        {icon}
      </div>

      <h3 className="font-heading text-lg font-bold text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed mb-6">
        {description}
      </p>

      {actionButton && (
        <div className="flex justify-center">
          {actionButton}
        </div>
      )}

    </Card>
  );
};
