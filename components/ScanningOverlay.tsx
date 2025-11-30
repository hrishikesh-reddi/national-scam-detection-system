import React, { useEffect, useState } from 'react';

const LOG_MESSAGES = [
  "Initializing National Scam Database...",
  "Analyzing tone and sentiment patterns...",
  "Cross-referencing global blacklists...",
  "Checking SSL certificates and domain age...",
  "Detecting urgency keywords...",
  "Verifying OTP request legitimacy...",
  "Finalizing risk score calculation..."
];

const ScanningOverlay: React.FC = () => {
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex(prev => (prev + 1) % LOG_MESSAGES.length);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900/80 border border-blue-500/30 rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
      {/* Scan Line Animation */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)] animate-scan" />
      </div>
      
      {/* Radar Pulse */}
      <div className="relative mb-8">
         <div className="w-24 h-24 rounded-full border-4 border-blue-900 flex items-center justify-center relative">
            <div className="w-20 h-20 rounded-full border-2 border-blue-500/50 animate-pulse-fast"></div>
            <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-ping"></div>
         </div>
      </div>

      <h3 className="text-2xl font-mono text-blue-400 font-bold mb-2 tracking-widest">SYSTEM ACTIVE</h3>
      <p className="text-slate-500 font-mono text-sm mb-6">Running Cybersecurity Heuristics...</p>

      {/* Terminal Log */}
      <div className="w-full max-w-md bg-black/40 rounded p-3 font-mono text-xs text-green-500/80 h-24 overflow-hidden border border-slate-800 flex flex-col-reverse">
        {LOG_MESSAGES.slice(0, logIndex + 1).reverse().map((msg, i) => (
           <div key={i} className={`${i === 0 ? 'text-green-400 font-bold' : 'opacity-50'}`}>
             {`> ${msg}`}
           </div>
        ))}
      </div>
    </div>
  );
};

export default ScanningOverlay;
