'use client';

import './AuroraBackground.scss';

export default function AuroraBackground({ className = '', children, ...props }) {
  return (
    <div className={`aurora-bg__root ${className}`} {...props}>
      <div className="aurora-bg__viewport">
        <div className={`aurora-bg__layer `} />
      </div>
      {children}
    </div>
  );
}
