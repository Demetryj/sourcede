'use clien';

import './AnimatedBorderBox.scss';

export default function AnimatedBorderBox({ children }) {
  return (
    <div className="animated-border-box">
      <div className="animated-border-box__container">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {children}
    </div>
  );
}
