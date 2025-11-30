import React, { useState } from 'react';
import { SecurityStatus, AnalysisResult, AppContext } from '../types';
import { Shield, Activity, Power, Lock, Clock, Smartphone, ChevronUp, AlertOctagon, PhoneOff, Ban, CheckCircle2, QrCode, Globe, MessageSquare, Loader2 } from 'lucide-react';
import AnalysisResultCard from './AnalysisResultCard';
import InputAnalyzer from './InputAnalyzer';

interface AgentOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  status: SecurityStatus;
  result: AnalysisResult | null;
  targetText: string;
  onManualAnalyze: (text: string) => void;
  context?: AppContext;
  onDismiss: () => void;
  onAction: () => void;
}

const AgentOverlay: React.FC<AgentOverlayProps> = ({ isOpen, onClose, status, result, targetText, onManualAnalyze, context = 'messages', onDismiss, onAction }) => {
  const [showManualInput, setShowManualInput] = useState(false);
  const [isProtected, setIsProtected] = useState(true);
  const [isActionProcessing, setIsActionProcessing] = useState(false);

  if (!isOpen) {
    return null;
  }

  const isIdle = status === SecurityStatus.IDLE && !showManualInput;
  const isHighRisk = result && result.riskScore > 50;

  // Header Color based on Context
  let ContextIcon = Shield;
  let contextTitle = "Sentinel";
  let gradientColor = "from-blue-600";
  let iconBgClass = "bg-slate-800 text-white";
  
  if (context === 'phone') {
    contextTitle = "Voice Firewall";
    ContextIcon = PhoneOff;
    gradientColor = "from-red-600";
    iconBgClass = "bg-red-500/20 text-red-400";
  } else if (context === 'wallet') {
    contextTitle = "Transaction Guard";
    ContextIcon = Lock;
    gradientColor = "from-indigo-600";
    iconBgClass = "bg-indigo-500/20 text-indigo-400";
  } else if (context === 'qr') {
    contextTitle = "QR Shield";
    ContextIcon = QrCode;
    gradientColor = "from-fuchsia-600";
    iconBgClass = "bg-fuchsia-500/20 text-fuchsia-400";
  } else if (context === 'messages') {
    contextTitle = "Message Filter";
    ContextIcon = MessageSquare;
    gradientColor = "from-blue-600";
    iconBgClass = "bg-blue-500/20 text-blue-400";
  } else if (context === 'browser') {
    contextTitle = "Web Guard";
    ContextIcon = Globe;
    gradientColor = "from-sky-600";
    iconBgClass = "bg-sky-500/20 text-sky-400";
  }

  const handleActionClick = () => {
    setIsActionProcessing(true);
    setTimeout(() => {
        onAction();
        setIsActionProcessing(false);
    }, 1500);
  };

  const getActionButton = () => {
      let label = "BLOCK THREAT";
      let Icon = Ban;
      
      switch(context) {
          case 'phone': label = "TERMINATE CALL"; Icon = PhoneOff; break;
          case 'wallet': label = "BLOCK TRANSACTION"; Icon = Lock; break;
          case 'messages': label = "BLOCK SENDER"; Icon = Ban; break;
          case 'browser': label = "BLOCK ACCESS"; Icon = AlertOctagon; break;
          case 'qr': label = "BLOCK LINK"; Icon = Ban; break;
      }

      return (
        <button 
            onClick={handleActionClick}
            disabled={isActionProcessing}
            className="w-full mt-2 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-900/40 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {isActionProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Icon className="w-4 h-4" />}
            {isActionProcessing ? "PROCESSING..." : label}
        </button>
      );
  };

  return (
    <div className={`absolute bottom-0 left-0 right-0 z-50 flex flex-col justify-end pointer-events-none`}>
       {/* High Stakes Modal Background */}
       {status !== SecurityStatus.IDLE && (
          <div className={`absolute inset-0 backdrop-blur-sm h-[1000px] -top-[500px] pointer-events-auto transition-colors duration-500 ${isHighRisk ? 'bg-red-900/20' : 'bg-black/40'}`} onClick={onClose} />
       )}

      {/* Main Sheet */}
      <div className="pointer-events-auto bg-[#0A0A0A]/95 backdrop-blur-3xl border-t border-white/10 rounded-t-[2.5rem] shadow-[0_-20px_60px_rgba(0,0,0,0.7)] pb-8 transition-all duration-500 ease-out min-h-[50vh] max-h-[85vh] flex flex-col relative overflow-hidden">
        
        {/* Contextual Gradient Glow */}
        <div className={`absolute top-0 left-0 right-0 h-40 opacity-20 bg-gradient-to-b pointer-events-none ${gradientColor} to-transparent`} />

        {/* Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-2 cursor-pointer z-10" onClick={onClose}>
           <div className="w-10 h-1 bg-white/20 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-6 pb-4 flex items-center justify-between z-10">
           <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border border-white/10 ${iconBgClass}`}>
                 <ContextIcon className="w-5 h-5" />
              </div>
              <div>
                 <h1 className="text-white font-semibold text-base">{contextTitle}</h1>
                 <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                    DPI Protocol • {isProtected ? 'Active' : 'Paused'}
                 </p>
              </div>
           </div>
           
           <button 
             onClick={() => setIsProtected(!isProtected)}
             className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${isProtected ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
           >
              <Power className="w-4 h-4" />
           </button>
        </div>

        {/* Content Area */}
        <div className="px-6 flex-1 overflow-y-auto z-10">
           
           {/* IDLE DASHBOARD */}
           {isIdle && (
              <div className="space-y-6 animate-in fade-in duration-500 pt-2">
                 {/* ID Card / Trust Score */}
                 <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-3xl border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                       <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Global Trust ID</p>
                    <h2 className="text-3xl font-bold text-white mb-4">Level 4 <span className="text-sm font-normal text-slate-500">/ 5</span></h2>
                    
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                       <div className="h-full w-[80%] bg-gradient-to-r from-blue-500 to-green-400"></div>
                    </div>
                    <div className="flex gap-4 mt-4">
                       <div className="text-[10px] text-slate-400 flex items-center gap-1"><Shield className="w-3 h-3"/> Identity Verified</div>
                       <div className="text-[10px] text-slate-400 flex items-center gap-1"><Lock className="w-3 h-3"/> Payments Secure</div>
                    </div>
                 </div>

                 {/* Recent Activity */}
                 <div>
                    <h3 className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Live Protocol Activity</h3>
                    <div className="space-y-2">
                       {[
                          { app: 'Phone', time: 'Just now', status: 'Voice Scan Active', color: 'text-blue-400' },
                          { app: 'UPI Payment', time: '2h ago', status: 'Transaction Verified', color: 'text-green-500' },
                          { app: 'Messages', time: '5h ago', status: 'Phishing Link Blocked', color: 'text-red-500' }
                       ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                                   <Activity className="w-4 h-4 text-slate-400" />
                                </div>
                                <div>
                                   <p className="text-sm text-slate-200 font-medium">{item.app}</p>
                                   <p className="text-[10px] text-slate-500">{item.time}</p>
                                </div>
                             </div>
                             <span className={`text-xs font-bold ${item.color}`}>{item.status}</span>
                          </div>
                       ))}
                    </div>
                 </div>

                 <button 
                   onClick={() => setShowManualInput(true)}
                   className="w-full py-3 rounded-xl border border-dashed border-slate-700 text-slate-400 text-xs font-bold uppercase hover:bg-slate-800/50 transition-colors"
                 >
                    + Manual Risk Check
                 </button>
              </div>
           )}

           {/* SCANNING / RESULT VIEW */}
           {!isIdle && !showManualInput && (
              <div className="pt-2">
                 {/* Context Specific Loading State */}
                 {status === SecurityStatus.SCANNING ? (
                    <div className="flex flex-col items-center justify-center py-10 space-y-6">
                       {/* Contextual Scanner Animation */}
                       <div className="relative w-24 h-24">
                          <div className={`absolute inset-0 rounded-full border-4 ${
                              context === 'phone' ? 'border-red-900' : 
                              context === 'qr' ? 'border-fuchsia-900' : 'border-slate-800'
                          }`}></div>
                          
                          <div className={`absolute inset-0 rounded-full border-4 border-t-transparent border-r-transparent border-b-transparent animate-spin ${
                             context === 'phone' ? 'border-l-red-500' : 
                             context === 'wallet' ? 'border-l-indigo-500' : 
                             context === 'qr' ? 'border-l-fuchsia-500' : 
                             context === 'browser' ? 'border-l-sky-500' : 'border-l-blue-500'
                          }`}></div>
                          
                          {context === 'phone' && (
                             <div className="absolute inset-0 flex items-center justify-center space-x-1">
                                <div className="w-1 h-3 bg-red-500 animate-[pulse_0.5s_infinite]"></div>
                                <div className="w-1 h-6 bg-red-500 animate-[pulse_0.5s_infinite_0.1s]"></div>
                                <div className="w-1 h-4 bg-red-500 animate-[pulse_0.5s_infinite_0.2s]"></div>
                             </div>
                          )}
                          {context === 'qr' && (
                             <div className="absolute inset-0 flex items-center justify-center">
                                <QrCode className="w-8 h-8 text-fuchsia-500 animate-pulse" />
                             </div>
                          )}
                          {context === 'browser' && (
                             <div className="absolute inset-0 flex items-center justify-center">
                                <Globe className="w-8 h-8 text-sky-500 animate-pulse" />
                             </div>
                          )}
                          {context === 'messages' && (
                             <div className="absolute inset-0 flex items-center justify-center">
                                <MessageSquare className="w-8 h-8 text-blue-500 animate-pulse" />
                             </div>
                          )}
                          {context === 'wallet' && (
                             <div className="absolute inset-0 flex items-center justify-center">
                                <Lock className="w-8 h-8 text-indigo-500 animate-pulse" />
                             </div>
                          )}
                       </div>
                       
                       <div className="text-center">
                          <h3 className="text-slate-200 font-medium text-lg">
                             {context === 'phone' ? 'Analyzing Voice Pattern...' : 
                              context === 'wallet' ? 'Verifying Receiver Node...' : 
                              context === 'qr' ? 'Checking Link Reputation...' : 
                              context === 'browser' ? 'Inspecting Certificate...' :
                              'Scanning Content...'}
                          </h3>
                          <p className="text-slate-500 text-xs font-mono mt-1">
                             {context === 'phone' ? 'Detecting deepfake signatures' : 
                              context === 'wallet' ? 'Checking mule account database' : 
                              context === 'qr' ? 'Detecting Quishing vectors' : 
                              context === 'browser' ? 'Analyzing page entropy' :
                              'Heuristic analysis running'}
                          </p>
                       </div>
                    </div>
                 ) : (
                    result && (
                       <div className="animate-in slide-in-from-bottom-5 duration-500 pb-8">
                          <AnalysisResultCard result={result} onDismiss={onDismiss} />
                          
                          {/* DPI 2.0 Action Buttons */}
                          {isHighRisk && getActionButton()}
                       </div>
                    )
                 )}
              </div>
           )}

           {/* MANUAL INPUT VIEW */}
           {showManualInput && (
              <div className="h-full">
                 <button 
                   onClick={() => setShowManualInput(false)}
                   className="mb-4 text-xs text-blue-400 font-medium hover:text-blue-300"
                 >
                    ← Back to Dashboard
                 </button>
                 <InputAnalyzer 
                   onAnalyze={(t) => { setShowManualInput(false); onManualAnalyze(t); }} 
                   isLoading={status === SecurityStatus.SCANNING} 
                 />
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default AgentOverlay;