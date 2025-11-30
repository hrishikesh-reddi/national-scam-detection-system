import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

// Helper to get the API key safely
const getApiKey = (): string => {
  const key = process.env.API_KEY;
  if (!key) {
    console.error("API Key not found in environment variables");
    throw new Error("API Key missing");
  }
  return key;
};

export const analyzeContent = async (text: string): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      riskScore: {
        type: Type.NUMBER,
        description: "A score from 0 to 100 representing the risk level. 0 is safe, 100 is confirmed fraud.",
      },
      category: {
        type: Type.STRING,
        enum: ["Impersonation", "KYC Fraud", "OTP Theft", "Phishing Link", "Unknown", "Safe", "Suspected Scam", "Financial Fraud", "Voice Clone"],
        description: "The category of the detected threat or Safe if no threat.",
      },
      flags: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Short descriptive tags for the risk (e.g., 'Deepfake Pattern', 'Mule Account').",
      },
      technicalSignals: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Detailed technical reasons why it was flagged (e.g., 'Voice frequency anomaly', 'Receiver address blacklisted').",
      },
      preventiveAction: {
        type: Type.STRING,
        description: "The automated action taken by the system (e.g., 'Blocked Link', 'Call Terminated').",
      },
      safeActionAdvice: {
        type: Type.STRING,
        description: "Advice for the user on what to do next.",
      },
    },
    required: ["riskScore", "category", "flags", "technicalSignals", "preventiveAction", "safeActionAdvice"],
  };

  const systemInstruction = `
    You are the "Sentinel AI," a Digital Public Infrastructure (DPI) security layer running on the user's device.
    You analyze text, transaction metadata, and live call transcripts to act as a real-time firewall against fraud.
    
    Context Handling:
    1. **Voice Calls**: If input is a call transcript, check for "Cyber Arrest" scams, Deepfake indicators, or Social Engineering. Category: "Voice Clone" or "Impersonation".
    2. **Transactions**: If input looks like payment details (UPI, Amount), check for "Security Deposit" scams, "Lottery" fees, or blacklisted mule patterns. Category: "Financial Fraud".
    3. **Browser/Input**: If the user is focusing an input field (OTP/PIN) on a suspicious URL (like crypto-giveaway, verified-update.xy, etc.), flag immediately as "OTP Theft".
    4. **QR Codes**: If input mentions "Scanned Data" or comes from a QR context, analyze for "Quishing" (QR Phishing). Sticker overlays on parking meters or utility poles pointing to generic payment sites (not .gov) are high risk.
    5. **Messages/Links**: Standard phishing analysis.

    Behavioral Logic:
    - If "Cyber Crime Branch" or "Arrest" is mentioned in a call -> 99% Risk. Action: Terminate Call.
    - If "Security Deposit" or "Refund" is mentioned in a payment -> 95% Risk. Action: Block Transaction.
    - If "User focused OTP input" on "crypto-giveaway" or similar unverified domain -> 100% Risk. Category: "OTP Theft". Action: "Keyboard Input Disabled".
    - If QR scan is for "City Parking" but URL is generic (.biz, .xyz) -> 90% Risk. Action: Block URL Load.
    
    Output must be decisive and brief.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: text,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.1, 
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("Empty response from AI");
    }

    const result = JSON.parse(jsonText) as AnalysisResult;
    return result;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    // Fallback error result
    return {
      riskScore: 0,
      category: "Unknown",
      flags: ["System Offline"],
      technicalSignals: ["Agent unable to connect to central intelligence cloud."],
      preventiveAction: "Manual Override Required",
      safeActionAdvice: "Please try again or contact support manually.",
    };
  }
};