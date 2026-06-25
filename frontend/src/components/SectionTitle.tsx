import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  tag?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  alignment = 'left',
  tag
}) => {
  const alignments = {
    left: 'text-left',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  return (
    <div className={`flex flex-col gap-2 ${alignments[alignment]}`}>
      {tag && (
        <span className="text-xs uppercase font-heading tracking-widest text-primary-indigo font-semibold">
          {tag}
        </span>
      )}
      <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-text-secondary max-w-2xl leading-relaxed mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};
