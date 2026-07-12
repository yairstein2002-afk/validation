import React from 'react';

interface LogoProps {
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ size = 32 }) => {
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
        {/* Silicon Die Outline */}
        <rect x="15" y="15" width="70" height="70" rx="10" stroke="var(--primary)" strokeWidth="3" fill="rgba(6, 182, 212, 0.05)" />
        {/* Core Block */}
        <rect x="30" y="30" width="40" height="40" rx="6" stroke="var(--secondary)" strokeWidth="3" fill="rgba(59, 130, 246, 0.1)" />
        {/* Interconnect Bus Lines (Ring Bus / Traces) */}
        <line x1="50" y1="15" x2="50" y2="85" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="15" y1="50" x2="85" y2="50" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 4" />
        {/* Gold CPU Pins */}
        <rect x="5" y="45" width="10" height="10" rx="2" fill="var(--primary)" />
        <rect x="85" y="45" width="10" height="10" rx="2" fill="var(--primary)" />
        <rect x="45" y="5" width="10" height="10" rx="2" fill="var(--primary)" />
        <rect x="45" y="85" width="10" height="10" rx="2" fill="var(--primary)" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', letterSpacing: '0.05em' }}>
          VALIDATION
        </span>
        <span style={{ fontSize: '0.62rem', fontWeight: 600, color: 'var(--primary)', letterSpacing: '0.15em' }}>
          ACADEMY
        </span>
      </div>
    </div>
  );
};
