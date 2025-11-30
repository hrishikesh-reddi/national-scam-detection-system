import React from 'react';
import { AnalysisResult } from '../types';
import { ShieldAlert, ShieldCheck, Shield, ChevronRight } from 'lucide-react';

interface AnalysisResultCardProps {
  result: AnalysisResult;
  isCompact?: boolean;
  onDismiss: () => void;
}

const AnalysisResultCard: React.FC<AnalysisResultCardProps> = ({ result, onDismiss }) => {
  const isHighRisk = result.riskScore > 50;
  
  // Minimal color palette
  const accentColor = isHighRisk ? 'text-red-500' : 'text-emerald-500';
  const bgColor = isHighRisk ? 'bg-red-500/10' : 'bg-emerald-500/10';
  const borderColor = isHighRisk ? 'border-red-500/20' : 'border-emerald-500/20';
  const Icon = isHighRisk ? ShieldAlert : ShieldCheck;

  return (
    <div className="w-full animate-in slide-in-from-bottom-2 duration-500">
      
      {/* Primary Verdict Card */}
      <div className={`rounded-2xl border ${borderColor} ${bgColor} p-5 backdrop-blur-sm mb-4`}>
         <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
               <div className={`p-2 rounded-full bg-white/10 ${accentColor}`}>
                  <Icon className="w-6 h-6" />
               </div>
               <div>
                  <h2 className={`text-lg font-semibold ${accentColor} tracking-tight`}>
                     {result.category}
                  </h2>
                  <p className="text-xs text-slate-400 font-medium opacity-80">
                     Risk Score: {result.riskScore}%
                  </p>
               </div>
            </div>
            <span className={`px-2 py-1 rounded text-[10px] font-mono uppercase font-bold border ${borderColor} ${accentColor}`}>
               {isHighRisk ? 'BLOCKED' : 'VERIFIED'}
            </span>
         </div>
      </div>

      {/* Action & Reasoning - Minimal List */}
      <div className="space-y-3">
         <div className="bg-slate-800/40 rounded-xl p-4 border border-white/5">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1 block">System Action</span>
            <p className="text-sm text-slate-200 font-medium">
               {result.preventiveAction}
            </p>
         </div>
         
         <div className="bg-slate-800/40 rounded-xl p-4 border border-white/5 group cursor-pointer transition-colors hover:bg-slate-800/60">
            <div className="flex items-center justify-between mb-1">
               <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Detection Reason</span>
               <ChevronRight className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
               {result.technicalSignals[0]}
            </p>
         </div>
      </div>

      {/* Primary Button */}
      {isHighRisk && (
        <button 
          onClick={onDismiss}
          className="w-full mt-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm border border-slate-700 active:scale-95 transition-all"
        >
           Dismiss Threat
        </button>
      )}
    </div>
  );
};

export default AnalysisResultCard;