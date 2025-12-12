import React from 'react';

interface SectionHeaderProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const SectionHeader = ({ 
  title, 
  highlight, 
  subtitle, 
  align = 'center',
  className = ''
}: SectionHeaderProps) => {
  
  // Alignment logic
  const alignmentClasses = {
    left: 'text-left mr-auto',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={`max-w-2xl mb-16 ${alignmentClasses[align]} ${className}`}>
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
        {title}{' '}
        {highlight && (
          <span className="text-primary relative inline-block">
            {highlight}
            {/* Decorative Underline */}
            <svg 
              className="absolute w-full h-3 -bottom-2 left-0 text-secondary opacity-60" 
              viewBox="0 0 100 10" 
              preserveAspectRatio="none"
            >
              <path 
                d="M0 5 Q 50 10 100 5" 
                stroke="currentColor" 
                strokeWidth="3" 
                fill="none" 
              />
            </svg>
          </span>
        )}
      </h2>
      
      {subtitle && (
        <p className="text-lg text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;