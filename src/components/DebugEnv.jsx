import React from 'react';

const DebugEnv = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 1000,
      maxWidth: '300px',
      wordBreak: 'break-all'
    }}>
      <h4>Environment Debug</h4>
      <div>API Key Loaded: {import.meta.env.VITE_GEMINI_API_KEY ? '✅' : '❌'}</div>
      <div>Key Length: {import.meta.env.VITE_GEMINI_API_KEY?.length || 0} characters</div>
      <div>Environment: {import.meta.env.MODE}</div>
    </div>
  );
};

export default DebugEnv;
