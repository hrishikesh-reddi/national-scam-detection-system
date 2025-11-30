import React, { useState } from 'react';
import { Terminal, MessageSquare, Phone } from 'lucide-react';

interface InputAnalyzerProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

const SAMPLE_INPUTS = [
  {
    label: "Test Scam",
    text: "URGENT: Your Wells Fargo account has been suspended due to suspicious activity."
  }
];

const InputAnalyzer: React.FC<InputAnalyzerProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) onAnalyze(text);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-inner">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Manually paste text here..."
            className="w-full h-32 bg-slate-900/50 text-slate-200 p-4 focus:outline-none font-mono text-sm resize-none"
            disabled={isLoading}
          />
          <div className="flex justify-between items-center bg-slate-800/50 p-2 border-t border-slate-700">
             <button
                type="button"
                onClick={() => setText(SAMPLE_INPUTS[0].text)}
                className="text-[10px] text-slate-400 uppercase font-bold hover:text-white"
             >
               Load Sample
             </button>
             <button
              type="submit"
              disabled={!text.trim() || isLoading}
              className="bg-blue-600 text-white text-xs px-4 py-2 rounded-lg font-bold uppercase tracking-wider hover:bg-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Scanning...' : 'Analyze'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputAnalyzer;