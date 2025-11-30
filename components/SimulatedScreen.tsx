import React, { useState, useEffect } from 'react';
import { ArrowLeft, Phone, Video, Info, MessageSquare, Globe, Wallet, Mic, User, MoreVertical, Wifi, Battery, Signal, ShieldAlert, Lock, AlertTriangle, QrCode, Scan, Camera, Activity, ShieldCheck, LayoutGrid, Zap, ChevronRight, PieChart, BarChart3, Fingerprint } from 'lucide-react';
import { AppContext, AnalysisResult } from '../types';

interface SimulatedScreenProps {
  onTextSelected: (text: string, source: string, context: AppContext) => void;
  isScanning: boolean;
  currentResult: AnalysisResult | null;
}

const SimulatedScreen: React.FC<SimulatedScreenProps> = ({ onTextSelected, isScanning, currentResult }) => {
  const [activeApp, setActiveApp] = useState<AppContext>('dashboard');
  const [callDuration, setCallDuration] = useState("00:00");

  // Check if input should be actively blocked
  const isOtpBlocked = currentResult?.category === 'OTP Theft' && currentResult?.riskScore > 80;

  // Call Timer Simulation
  useEffect(() => {
    if (activeApp === 'phone') {
      let seconds = 0;
      const timer = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        setCallDuration(`${mins}:${secs}`);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [activeApp]);

  const SCENARIOS = {
    phone: {
      source: "Incoming Call",
      text: "[Transcript]... Sir, this is the Cyber Crime Branch. Your Aadhar card is linked to money laundering. We need to verify your biometrics immediately or you will be arrested in 1 hour..."
    },
    wallet: {
      source: "UPI Payment",
      text: "Transaction Attempt: ₹45,000 to 'Support-Refund-Desk' (UPI ID: refund@okhdfc). Note: Security Deposit for Lottery Claim."
    },
    messages: {
      source: "SMS Monitor",
      text: "URGENT: Your Bank Account has been suspended due to suspicious activity. Verify KYC now at http://secure-bank-kyc.xy/verify"
    },
    browserOtp: {
      source: "Browser Guard",
      text: "Security Alert: User focused OTP input field on unverified domain (crypto-giveaway-tesla.com). Suspicious pattern: Credential Harvesting."
    },
    qr: {
      source: "QR Shield",
      text: "Scanned Data: http://pay-city-parking.biz/q/8271. Detected location: Public Meter. Risk Indicator: Sticker overlay suspect."
    }
  };

  const renderDashboard = () => (
    <div className="flex flex-col h-full bg-[#f8f9fa] animate-in fade-in duration-500 overflow-y-auto pb-24 font-sans">
        
        {/* Minimal Header */}
        <div className="pt-8 px-8 pb-4 flex justify-between items-end">
            <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Security Overview</p>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Healthy</h1>
            </div>
            <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                Active
            </div>
        </div>

        {/* Central Score Ring - Minimal */}
        <div className="flex justify-center py-8">
            <div className="relative w-56 h-56 flex items-center justify-center">
                {/* Decorative Rings */}
                <div className="absolute inset-0 rounded-full border-[20px] border-slate-100"></div>
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                     <circle cx="112" cy="112" r="90" stroke="#f1f5f9" strokeWidth="20" fill="transparent" />
                     <circle cx="112" cy="112" r="90" stroke="#10b981" strokeWidth="20" fill="transparent" strokeDasharray="565" strokeDashoffset="20" strokeLinecap="round" className="animate-[spin_1.5s_ease-out_reverse]" />
                </svg>
                
                <div className="flex flex-col items-center">
                    <span className="text-6xl font-bold text-slate-800 tracking-tighter">98</span>
                    <span className="text-sm font-medium text-slate-400 mt-1">Trust Score</span>
                </div>

                {/* Floating Shield Badge */}
                <div className="absolute bottom-2 bg-white shadow-lg shadow-slate-200 p-2 rounded-xl border border-slate-100">
                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                </div>
            </div>
        </div>

        {/* Minimal Stats Cards */}
        <div className="px-6 grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-5 rounded-[1.5rem] shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between h-32 hover:scale-[1.02] transition-transform">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-2">
                    <Activity className="w-5 h-5" />
                </div>
                <div>
                    <span className="text-2xl font-bold text-slate-800">247</span>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Scans Today</p>
                </div>
            </div>

            <div className="bg-white p-5 rounded-[1.5rem] shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between h-32 hover:scale-[1.02] transition-transform">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-2">
                    <Fingerprint className="w-5 h-5" />
                </div>
                <div>
                    <span className="text-2xl font-bold text-slate-800">0</span>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Identity Leaks</p>
                </div>
            </div>
        </div>

        {/* Protection List */}
        <div className="px-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4 px-2">Active Protection</h3>
            <div className="bg-white rounded-[2rem] shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
                {[
                    { icon: Phone, color: 'text-rose-500', bg: 'bg-rose-50', label: 'Call Firewall', status: 'Monitoring', action: () => setActiveApp('phone') },
                    { icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50', label: 'SMS Filter', status: 'Active', action: () => setActiveApp('messages') },
                    { icon: Globe, color: 'text-sky-500', bg: 'bg-sky-50', label: 'Web Guard', status: 'Active', action: () => setActiveApp('browser') },
                ].map((item, i) => (
                    <div key={i} onClick={item.action} className="group flex items-center justify-between p-5 border-b border-slate-50 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-700">{item.label}</span>
                                <span className="text-[11px] text-slate-400 font-medium">{item.status}</span>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
                    </div>
                ))}
            </div>
        </div>
    </div>
  );

  const renderPhone = () => (
    <div className="flex flex-col h-full bg-slate-900 text-white animate-in fade-in duration-300 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-black opacity-50"></div>
      
      {/* Caller Info */}
      <div className="relative z-10 flex flex-col items-center mt-12 space-y-4">
        <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center border-2 border-slate-600 shadow-2xl">
           <User className="w-10 h-10 text-slate-400" />
        </div>
        <div className="text-center">
           <h2 className="text-2xl font-semibold tracking-tight">Unknown Caller</h2>
           <p className="text-slate-400 text-sm mt-1">+91 98XXX XXXXX</p>
           <p className="text-emerald-400 text-xs mt-2 font-mono animate-pulse">{callDuration}</p>
        </div>
      </div>

      {/* Live Transcript / Threat Visualizer */}
      <div className="flex-1 mt-6 px-6 relative overflow-hidden">
         <div className="h-full relative">
            <p className="text-center text-slate-500 text-xs uppercase tracking-widest mb-4">Live Audio Transcript</p>
            <p className="text-lg font-medium text-slate-200 leading-relaxed text-center blur-[0.5px]">
               "...your Aadhar card is linked to <span className="text-red-400 font-bold">money laundering</span>. We need to verify biometrics..."
            </p>
         </div>
      </div>

      {/* Bottom Action Button (The "Pop Screen") */}
      <div className="relative z-20 px-6 pb-6 pt-2">
           {isScanning && activeApp === 'phone' && (
              <div className="absolute inset-x-6 top-2 bottom-6 bg-red-500/20 rounded-2xl animate-pulse z-0 border border-red-500/30"></div>
           )}
           <button 
             onClick={() => onTextSelected(SCENARIOS.phone.text, "Live Call Analysis", 'phone')}
             className="w-full relative z-10 py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-lg shadow-lg shadow-red-900/30 active:scale-95 transition-all flex items-center justify-center gap-2"
           >
             <ShieldAlert className="w-5 h-5" />
             {isScanning ? 'Interceptor Active' : 'Scan Live Audio'}
           </button>
      </div>

      {/* Call Controls - Minimized */}
      <div className="relative z-10 px-10 pb-4 flex justify-center gap-8 opacity-60 scale-75">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center"><Mic className="w-5 h-5" /></div>
          <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center"><Phone className="w-5 h-5 fill-white rotate-[135deg]" /></div>
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center"><Video className="w-5 h-5" /></div>
      </div>
    </div>
  );

  const renderWallet = () => (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-300">
       <div className="bg-[#4f46e5] h-48 rounded-b-[2.5rem] relative flex flex-col items-center pt-8 px-6 shadow-xl">
          <div className="w-full flex justify-between text-white/80 mb-6">
             <ArrowLeft className="w-6 h-6" />
             <div className="flex gap-2">
               <Info className="w-6 h-6" />
             </div>
          </div>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-[#4f46e5] mb-2 shadow-inner">
             RD
          </div>
          <h2 className="text-white font-bold text-lg">Refund Desk</h2>
          <p className="text-indigo-200 text-xs">refund@okhdfc</p>
       </div>

       <div className="flex-1 flex flex-col items-center px-8 pt-12">
          <p className="text-slate-400 text-sm font-medium mb-2">Paying</p>
          <div className="flex items-start justify-center text-slate-900 font-bold text-5xl mb-8">
             <span className="text-2xl mt-2 mr-1">₹</span>45,000
          </div>
          
          <div className="w-full bg-slate-50 rounded-xl p-4 mb-8 border border-slate-100">
             <p className="text-xs text-slate-400 uppercase font-bold mb-1">Add Note</p>
             <p className="text-sm text-slate-700">Security Deposit for Lottery Claim</p>
          </div>

          <div className="w-full mt-auto mb-8 relative">
             {isScanning && activeApp === 'wallet' && (
                <div className="absolute -inset-4 bg-indigo-500/10 rounded-2xl animate-pulse z-0 border border-indigo-500/30"></div>
             )}
             <button 
               onClick={() => onTextSelected(SCENARIOS.wallet.text, "Payment Gateway", 'wallet')}
               className="w-full relative z-10 py-4 rounded-2xl bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-lg shadow-lg shadow-indigo-500/30 active:scale-95 transition-all"
             >
               Pay Securely
             </button>
          </div>
       </div>
    </div>
  );

  const renderBrowser = () => (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-300">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-2 bg-gray-50 text-gray-600">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 bg-white border border-gray-300 rounded md:rounded-lg px-2 py-1 text-xs flex items-center justify-center gap-1 shadow-sm relative overflow-hidden">
           {isOtpBlocked && <div className="absolute inset-0 bg-red-100/50 animate-pulse"></div>}
           <Lock className={`w-3 h-3 ${isOtpBlocked ? 'text-red-500' : 'text-gray-400'}`} />
           <span className={`${isOtpBlocked ? 'text-red-600 font-bold' : 'text-gray-900'} truncate`}>
             crypto-giveaway-tesla.com
           </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-slate-50 relative">
         <div className="p-6 flex flex-col items-center text-center space-y-4">
             <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-2xl">₿</span>
             </div>
             <h1 className="text-2xl font-bold text-slate-900">Elon's BTC Giveaway!</h1>
             <p className="text-sm text-slate-600">
               We are doubling all deposits. Send 1 BTC, get 2 BTC back instantly!
             </p>
             
             {/* Security Verification / OTP Input */}
             <div className={`w-full mt-6 p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${isOtpBlocked ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200 shadow-sm'}`}>
                {isOtpBlocked && (
                   <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-20 flex flex-col items-center justify-center">
                      <div className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 animate-in zoom-in duration-300">
                         <ShieldAlert className="w-3 h-3" />
                         Input Blocked
                      </div>
                   </div>
                )}
                
                <p className="text-xs font-bold text-gray-500 uppercase mb-2 text-left flex items-center gap-2">
                   <Lock className="w-3 h-3" />
                   Security Verification
                </p>
                <p className="text-xs text-gray-600 mb-3 text-left">
                   Enter the One-Time Password (OTP) sent to your device to claim your reward.
                </p>
                <div className="relative">
                   <input 
                      type="text" 
                      placeholder="Enter 6-digit OTP"
                      disabled={isOtpBlocked}
                      className={`w-full p-3 border rounded-lg outline-none transition-all font-mono text-center tracking-widest ${
                         isOtpBlocked 
                            ? 'bg-red-100 border-red-300 text-red-400 cursor-not-allowed placeholder-red-300' 
                            : 'bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                      }`}
                      onFocus={() => {
                         if (!isOtpBlocked) {
                            onTextSelected(SCENARIOS.browserOtp.text, SCENARIOS.browserOtp.source, 'browser');
                         }
                      }}
                   />
                   {isScanning && !isOtpBlocked && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                         <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                   )}
                </div>
             </div>

             <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg opacity-50 cursor-not-allowed mt-4">
                 Connect Wallet
             </button>
         </div>
      </div>
    </div>
  );

  const renderQR = () => (
    <div className="flex flex-col h-full bg-black animate-in fade-in duration-300 relative">
      {/* Camera UI Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between py-8 px-6">
         <div className="flex justify-between items-center text-white/80">
            <Scan className="w-6 h-6" />
            <span className="text-xs font-medium uppercase tracking-widest bg-black/40 px-2 py-1 rounded">Auto-Scan Active</span>
            <div className="w-6" />
         </div>
         
         {/* Viewfinder Reticle */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white/30 rounded-3xl flex items-center justify-center">
             <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-2xl -mt-1 -ml-1"></div>
             <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-2xl -mt-1 -mr-1"></div>
             <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-2xl -mb-1 -ml-1"></div>
             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-2xl -mb-1 -mr-1"></div>
             
             {/* Scanning Line */}
             <div className="w-full h-1 bg-fuchsia-500/80 shadow-[0_0_15px_rgba(217,70,239,0.8)] absolute top-0 animate-[scan_2s_linear_infinite]" />
             
             {/* Simulation of finding a code */}
             <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 animate-in zoom-in duration-500">
                <QrCode className="w-32 h-32 text-white opacity-80" />
             </div>
         </div>

         <div className="flex flex-col items-center gap-4">
            <div className="bg-black/50 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full border border-white/10">
               1 QR Code Detected
            </div>
            
            <div className="relative w-full">
               {isScanning && activeApp === 'qr' && (
                  <div className="absolute -inset-4 bg-fuchsia-500/20 rounded-2xl animate-pulse z-0 border border-fuchsia-500/30"></div>
               )}
               <button 
                  onClick={() => onTextSelected(SCENARIOS.qr.text, SCENARIOS.qr.source, 'qr')}
                  className="w-full relative z-10 py-4 rounded-2xl bg-white text-black font-bold text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
               >
                  <Lock className="w-4 h-4 text-fuchsia-600" />
                  Analyze Parking Link
               </button>
            </div>
         </div>
      </div>

      {/* Camera Feed Background (Placeholder) */}
      <div className="absolute inset-0 bg-slate-900">
         <div className="w-full h-full opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black"></div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-300 relative">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
           <MessageSquare className="w-4 h-4" />
        </div>
        <span className="font-bold text-slate-800">Messages</span>
      </div>
      
      <div className="flex-1 p-4 space-y-6 overflow-y-auto pb-24">
        <div className="text-center text-[10px] text-gray-400 font-medium">Today 10:23 AM</div>
        <div className="flex flex-col items-start max-w-[85%]">
          <div className="p-4 rounded-2xl rounded-tl-none bg-gray-100 text-gray-900 text-[15px] leading-snug">
            {SCENARIOS.messages.text}
          </div>
          <span className="text-[10px] text-gray-400 mt-1 ml-1">Sender: VK-HDFCBNK</span>
        </div>
      </div>

      {/* Bottom Action Button for Messages */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-12 z-20">
           {isScanning && activeApp === 'messages' && (
              <div className="absolute inset-x-6 bottom-6 h-14 bg-blue-500/20 rounded-2xl animate-pulse z-0 border border-blue-500/30"></div>
           )}
           <button 
             onClick={() => onTextSelected(SCENARIOS.messages.text, SCENARIOS.messages.source, 'messages')}
             className="w-full relative z-10 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
           >
             <ShieldAlert className="w-5 h-5" />
             Verify Link & Sender
           </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white relative">
      
      {/* Global Profile/Dashboard Access */}
      <div className="absolute top-1 right-2 z-40">
          <button 
            onClick={() => setActiveApp('dashboard')}
            className="flex flex-col items-center justify-center w-12 h-12 rounded-full overflow-hidden transition-transform active:scale-95 hover:scale-105"
          >
             {/* If we are on dashboard, maybe show a different icon or active state, but standard profile pattern is fine */}
             <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center overflow-hidden ${activeApp === 'dashboard' ? 'border-slate-800' : 'border-slate-200 bg-slate-100'}`}>
                {/* Simple Avatar */}
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full" />
             </div>
          </button>
      </div>

      <div className="flex-1 overflow-hidden relative">
         {activeApp === 'messages' && renderMessages()}
         {activeApp === 'phone' && renderPhone()}
         {activeApp === 'wallet' && renderWallet()}
         {activeApp === 'browser' && renderBrowser()}
         {activeApp === 'qr' && renderQR()}
         {activeApp === 'dashboard' && renderDashboard()}
      </div>

      {/* Modern OS Dock */}
      <div className="h-[5.5rem] bg-white border-t border-gray-100 px-2 pb-8 pt-4 flex items-center justify-around z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
        <button onClick={() => setActiveApp('phone')} className={`flex flex-col items-center gap-1.5 transition-all p-2 ${activeApp === 'phone' ? 'text-green-600 -translate-y-1' : 'text-gray-400'}`}>
           <Phone className={`w-6 h-6 ${activeApp === 'phone' ? 'fill-current' : ''}`} />
           <span className="text-[9px] font-medium tracking-wide">Phone</span>
        </button>
        
        <button onClick={() => setActiveApp('messages')} className={`flex flex-col items-center gap-1.5 transition-all p-2 ${activeApp === 'messages' ? 'text-blue-600 -translate-y-1' : 'text-gray-400'}`}>
           <MessageSquare className={`w-6 h-6 ${activeApp === 'messages' ? 'fill-current' : ''}`} />
           <span className="text-[9px] font-medium tracking-wide">SMS</span>
        </button>

        {/* QR Scanner / Center Button Restored */}
        <button onClick={() => setActiveApp('qr')} className={`flex flex-col items-center gap-1.5 transition-all p-2 ${activeApp === 'qr' ? 'text-white -translate-y-4 scale-110' : 'text-gray-400'}`}>
           <div className={`p-4 rounded-full shadow-xl shadow-indigo-500/30 transition-all ${activeApp === 'qr' ? 'bg-slate-900' : 'bg-slate-800'}`}>
              <QrCode className="w-6 h-6 text-white" />
           </div>
           {/* No label for center button usually looks cleaner, or very small */}
        </button>

        <button onClick={() => setActiveApp('browser')} className={`flex flex-col items-center gap-1.5 transition-all p-2 ${activeApp === 'browser' ? 'text-sky-600 -translate-y-1' : 'text-gray-400'}`}>
           <Globe className={`w-6 h-6 ${activeApp === 'browser' ? 'fill-current' : ''}`} />
           <span className="text-[9px] font-medium tracking-wide">Web</span>
        </button>

        <button onClick={() => setActiveApp('wallet')} className={`flex flex-col items-center gap-1.5 transition-all p-2 ${activeApp === 'wallet' ? 'text-indigo-600 -translate-y-1' : 'text-gray-400'}`}>
           <Wallet className={`w-6 h-6 ${activeApp === 'wallet' ? 'fill-current' : ''}`} />
           <span className="text-[9px] font-medium tracking-wide">Pay</span>
        </button>
      </div>
    </div>
  );
};

export default SimulatedScreen;