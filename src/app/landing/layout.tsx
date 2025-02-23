import React from 'react';

const LandingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="Landing-layout">
      {children}
    </div>
  );
};

export default LandingLayout; 