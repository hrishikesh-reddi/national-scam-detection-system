import React from 'react';

interface RiskGaugeProps {
  score: number;
}

const RiskGauge: React.FC<RiskGaugeProps> = ({ score }) => {
  // Normalize score to 0-100 just in case
  const normalizedScore = Math.min(Math.max(score, 0), 100);
  
  // Calculate color
  let color = '#10b981'; // Green
  if (normalizedScore > 30) color = '#f59e0b'; // Amber
  if (normalizedScore > 70) color = '#ef4444'; // Red

  // SVG calculations for a semi-circle gauge
  const radius = 80;
  const stroke = 15;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  
  // We want a semi-circle (50% of circumference)
  // But mapped to the score.
  // Full semi-circle offset would cover the top half.
  // Actually, easiest way for a simple arc:
  // StrokeDashoffset = circumference - (percent / 100) * circumference
  // But we want only 180 degrees.
  // Let's use a simpler approach: Recharts or just clean CSS conic-gradient.
  
  // Let's try a CSS conic gradient approach for simplicity and perfect responsiveness
  const getGradient = () => {
    return `conic-gradient(
      ${color} ${normalizedScore * 1.8}deg, 
      #334155 ${normalizedScore * 1.8}deg 180deg, 
      transparent 180deg
    )`;
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Gauge Background/Fill Container */}
      <div className="relative w-48 h-24 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-48 h-48 rounded-full border-[16px] border-slate-700 box-border"
          style={{ transform: 'rotate(-90deg)' }} 
        />
        <div 
          className="absolute top-0 left-0 w-48 h-48 rounded-full transition-all duration-1000 ease-out"
          style={{ 
            background: getGradient(),
            borderRadius: '50%',
            mask: 'radial-gradient(transparent 55%, black 56%)',
            WebkitMask: 'radial-gradient(transparent 55%, black 56%)',
            transform: 'rotate(-90deg)'
          }}
        />
      </div>
      
      {/* Score Text */}
      <div className="absolute top-14 flex flex-col items-center">
        <span className={`text-4xl font-bold font-mono`} style={{ color }}>
          {normalizedScore}%
        </span>
        <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Risk Score</span>
      </div>
    </div>
  );
};

export default RiskGauge;
