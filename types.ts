export interface AnalysisResult {
  riskScore: number;
  category: 'Impersonation' | 'KYC Fraud' | 'OTP Theft' | 'Phishing Link' | 'Unknown' | 'Safe' | 'Suspected Scam' | 'Financial Fraud' | 'Voice Clone';
  flags: string[];
  preventiveAction: string;
  safeActionAdvice: string;
  technicalSignals: string[]; // For "Why It Was Flagged"
}

export interface HistoryItem extends AnalysisResult {
  id: string;
  timestamp: Date;
  snippet: string;
}

export enum SecurityStatus {
  IDLE = 'idle',
  SCANNING = 'scanning',
  COMPLETE = 'complete',
  ERROR = 'error',
}

export type AppContext = 'messages' | 'browser' | 'phone' | 'wallet' | 'qr' | 'dashboard';