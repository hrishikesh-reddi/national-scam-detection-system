import React, { useEffect, useState } from 'react';

const EVENTS = [
  "Packet 4f:1a verified secure.",
  "Port 443 handshake established.",
  "Background task: SMS filter active.",
  "Checking URL reputation database...",
  "Domain whitelist updated.",
  "Network latency: 12ms. Connection stable.",
  "Analyzing heuristic patterns in background...",
  "Incoming data stream intercepted.",
  "SSL Certificate validated: Google Trust Services.",
  "Encryption layer: AES-256 enabled.",
  "No active threats in clipboard buffer.",
  "Sentiment analysis module loaded.",
  "Cross-referencing global fraud ledger.",
  "Monitoring input channels...",
];

const LiveTrafficLog: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Add initial logs
    setLogs(EVENTS.slice(0, 5));

    const interval = setInterval(() => {
      const randomEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
      const newLog = `[${timestamp}] ${randomEvent}`;
      
      setLogs(prev => {
        const updated = [...prev, newLog];
        if (updated.length > 8) return updated.slice(updated.length - 8);
        return updated;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-950 border-t border-slate-800 p-4 font-mono text-[10px] text-slate-500 overflow-hidden">
      <div className="flex items-center gap-2 mb-2 text-slate-400 uppercase tracking-wider font-bold text-[9px]">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        System Activity Log
      </div>
      <div className="space-y-1 opacity-70">
        {logs.map((log, i) => (
          <div key={i} className="truncate border-l-2 border-slate-800 pl-2 hover:border-blue-500 hover:text-blue-400 transition-colors cursor-default">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveTrafficLog;