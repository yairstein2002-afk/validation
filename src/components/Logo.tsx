import React from 'react';

interface LogoProps {
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ size = 28 }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 0 6px var(--primary-glow))' }}
      >
        {/* Outer socket box */}
        <rect x="10" y="10" width="80" height="80" rx="12" stroke="var(--primary)" strokeWidth="6" fill="rgba(6, 182, 212, 0.05)" />
        {/* Die Chiplet block */}
        <rect x="32" y="32" width="36" height="36" rx="6" fill="var(--secondary)" />
        {/* Connection traces */}
        <line x1="50" y1="16" x2="50" y2="32" stroke="var(--primary)" strokeWidth="4" />
        <line x1="50" y1="68" x2="50" y2="84" stroke="var(--primary)" strokeWidth="4" />
        <line x1="16" y1="50" x2="32" y2="50" stroke="var(--primary)" strokeWidth="4" />
        <line x1="68" y1="50" x2="84" y2="50" stroke="var(--primary)" strokeWidth="4" />
      </svg>
      
      <span
        style={{
          fontFamily: 'Outfit',
          fontWeight: 800,
          fontSize: '1rem',
          letterSpacing: '1px',
          background: 'linear-gradient(90deg, #fff, var(--text-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        VALIDATION
      </span>
    </div>
  );
};
