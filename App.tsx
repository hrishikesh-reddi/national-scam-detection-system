import React, { useState, useEffect } from 'react';
import SimulatedScreen from './components/SimulatedScreen';
import AgentOverlay from './components/AgentOverlay';
import { SecurityStatus, AnalysisResult, AppContext } from './types';
import { analyzeContent } from './services/geminiService';
import { Shield } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<SecurityStatus>(SecurityStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [targetText, setTargetText] = useState<string>("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [activeContext, setActiveContext] = useState<AppContext>('messages');

  // Auto-trigger only once on load for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOverlayOpen(false); // Start closed (pill view)
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAnalyze = async (text: string, source: string = "Unknown", context: AppContext = 'messages') => {
    setTargetText(text);
    setActiveContext(context);
    setStatus(SecurityStatus.SCANNING);
    // Don't clear result immediately if we want to show persistent block state, 
    // but for a new scan we usually should. Let's clear it to trigger the "Scanning" UI.
    setResult(null); 
    setIsOverlayOpen(true); // Open full overlay

    try {
      // Simulate network delay for effect
      const data = await analyzeContent(text);
      
      setTimeout(() => {
        setResult(data);
        setStatus(SecurityStatus.COMPLETE);
      }, 1500);
    } catch (error) {
      console.error(error);
      setStatus(SecurityStatus.ERROR);
    }
  };

  const handleClose = () => {
    setIsOverlayOpen(false);
    // We do NOT clear the result immediately on close, 
    // so the "Blocked" state can persist on the simulated screen if needed.
    setTimeout(() => {
       if (status === SecurityStatus.COMPLETE) {
          setStatus(SecurityStatus.IDLE);
          // Optional: Clear result if you want the block to disappear when minimized
          // setResult(null); 
       }
    }, 500);
  };

  const handleDismiss = () => {
    setIsOverlayOpen(false);
    setTimeout(() => {
      setStatus(SecurityStatus.IDLE);
      setResult(null);
    }, 300);
  };

  const handleAction = () => {
    // Action taken (Block/Terminate)
    setIsOverlayOpen(false);
    setTimeout(() => {
      setStatus(SecurityStatus.IDLE);
      setResult(null);
      // Here we could ideally show a "Success" toast, 
      // but resetting the state effectively "stops" the simulated threat.
    }, 300);
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-0 md:p-8 font-sans selection:bg-blue-500/30">
      {/* Phone Frame Simulator */}
      <div className="relative w-full max-w-md h-[100dvh] md:h-[850px] bg-black md:rounded-[3.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] border-[6px] border-neutral-800 ring-2 ring-neutral-900/50">
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-full z-50 flex items-center justify-end px-3">
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
        </div>

        {/* DPI Security Layer Top Indicator */}
        <button 
          onClick={() => setIsOverlayOpen(true)}
          className="absolute top-12 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3 py-1.5 bg-neutral-900/90 backdrop-blur-md border border-white/10 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all group"
        >
          <Shield className="w-3 h-3 text-green-500 fill-green-500/20" />
          <span className="text-[10px] font-bold text-slate-200 tracking-wide uppercase group-hover:text-white transition-colors">DPI Security Layer</span>
        </button>

        {/* Status Bar Time (Fake) */}
        <div className="absolute top-3 left-8 text-white text-[13px] font-semibold z-40 tracking-wide">
          9:41
        </div>
        <div className="absolute top-3 right-8 flex gap-1.5 z-40">
           <div className="w-4 h-3 bg-white rounded-[2px]" />
           <div className="w-4 h-3 bg-white rounded-[2px]" />
           <div className="w-5 h-3 border border-white/30 rounded-[3px] relative">
              <div className="absolute inset-0.5 bg-white rounded-[1px]"></div>
           </div>
        </div>

        {/* The "App" Layer (Simulated OS) */}
        <div className="w-full h-full bg-slate-50 pt-12 pb-8 overflow-hidden rounded-[2.5rem]">
           <SimulatedScreen 
             onTextSelected={handleAnalyze} 
             isScanning={status === SecurityStatus.SCANNING}
             currentResult={result} 
           />
        </div>

        {/* The "Agent" Layer (Overlay) */}
        <AgentOverlay 
          isOpen={isOverlayOpen} 
          onClose={handleClose}
          status={status}
          result={result}
          targetText={targetText}
          context={activeContext}
          onManualAnalyze={(t) => handleAnalyze(t, "Manual Input", 'messages')}
          onDismiss={handleDismiss}
          onAction={handleAction}
        />

        {/* System Home Bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-1.5 bg-neutral-900/20 rounded-full z-50 backdrop-blur-sm" />
      </div>
    </div>
  );
};

export default App;