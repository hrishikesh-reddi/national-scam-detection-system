import React from 'react';
import { SecurityStatus, AnalysisResult } from '../types';
import { Eye, Shield, Lock, AlertTriangle, CheckCircle, Radio } from 'lucide-react';

interface SecurityAgentProps {
  status: SecurityStatus;
  result: AnalysisResult | null;
}

const SecurityAgent: React.FC<SecurityAgentProps> = ({ status, result }) => {
  // Determine state visuals
  let mainColor = 'text-blue-500';
  let glowColor = 'shadow-blue-500/50';
  let borderColor = 'border-blue-500/30';
  let statusText = 'MONITORING ACTIVE';
  let Icon = Eye;
  
  if (status === SecurityStatus.SCANNING) {
    mainColor = 'text-cyan-400';
    glowColor = 'shadow-cyan-400/80';
    borderColor = 'border-cyan-400/60';
    statusText = 'INTERCEPTING TRAFFIC...';
    Icon = Radio;
  } else if (status === SecurityStatus.COMPLETE && result) {
    if (result.riskScore > 70) {
      mainColor = 'text-red-500';
      glowColor = 'shadow-red-500/80';
      borderColor = 'border-red-500/60';
      statusText = 'THREAT DETECTED';
      Icon = AlertTriangle;
    } else if (result.riskScore > 30) {
      mainColor = 'text-amber-500';
      glowColor = 'shadow-amber-500/80';
      borderColor = 'border-amber-500/60';
      statusText = 'POTENTIAL RISK';
      Icon = Shield;
    } else {
      mainColor = 'text-emerald-500';
      glowColor = 'shadow-emerald-500/80';
      borderColor = 'border-emerald-500/60';
      statusText = 'SECURE';
      Icon = CheckCircle;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full">
      {/* The Eye / Core */}
      <div className="relative">
        {/* Outer Ring */}
        <div className={`w-40 h-40 rounded-full border-2 ${borderColor} border-dashed animate-[spin_10s_linear_infinite] flex items-center justify-center opacity-60`}></div>
        
        {/* Middle Ring */}
        <div className={`absolute top-0 left-0 w-40 h-40 rounded-full border border-slate-700 flex items-center justify-center`}>
           <div className={`w-32 h-32 rounded-full border ${borderColor} animate-[spin_5s_linear_infinite_reverse] opacity-40`}></div>
        </div>

        {/* Inner Core */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-slate-900 rounded-full border-2 ${borderColor} ${glowColor} shadow-[0_0_40px_rgba(0,0,0,0.5)] flex items-center justify-center z-10 transition-all duration-500`}>
          <Icon className={`w-8 h-8 ${mainColor} ${status === SecurityStatus.SCANNING ? 'animate-pulse' : ''}`} />
        </div>
        
        {/* Scanner Beam (Only when scanning) */}
        {status === SecurityStatus.SCANNING && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-scan opacity-50 pointer-events-none blur-sm" />
        )}
      </div>

      {/* Status Text */}
      <div className="mt-8 text-center space-y-1">
        <h2 className={`text-xl font-mono font-bold tracking-widest ${mainColor} transition-colors duration-300`}>
          {statusText}
        </h2>
        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-mono uppercase">
          <Lock className="w-3 h-3" />
          <span>Real-time Protection Layer</span>
        </div>
      </div>
      
      {/* Dynamic Stats */}
      <div className="grid grid-cols-2 gap-2 w-full mt-6 text-[10px] font-mono text-slate-400">
         <div className="bg-slate-900/50 p-2 rounded border border-slate-800 flex flex-col items-center">
            <span className="text-slate-600">UPTIME</span>
            <span className="text-blue-400">99.9%</span>
         </div>
         <div className="bg-slate-900/50 p-2 rounded border border-slate-800 flex flex-col items-center">
            <span className="text-slate-600">SCANS</span>
            <span className="text-blue-400">4,281</span>
         </div>
      </div>
    </div>
  );
};

export default SecurityAgent;