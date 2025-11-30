

````markdown
# 🛡️ National Scam Detection System  
### _Real-time AI Security Agent for Scam Call, Smishing, Phishing & UPI Fraud Prevention_

![banner](./assets/banner.png)

<p align="center">
  <img src="https://img.shields.io/badge/Status-Working%20Demo-blue" />
  <img src="https://img.shields.io/badge/Framework-React%20%2B%20TypeScript-green" />
  <img src="https://img.shields.io/badge/AI-Gemini%202.0-orange" />
  <img src="https://img.shields.io/badge/Domain-Cybersecurity-red" />
</p>

---

## 🚀 Overview

This project is a **working demo prototype** of India’s next-generation  
**DPI 2.0 Cyber-Protection Layer** — a real-time AI agent that sits on top of a phone OS and protects citizens from:

- 📞 Scam calls  
- 💬 Smishing (SMS fraud)  
- 🌐 Phishing websites  
- 💸 Fraudulent UPI transactions  
- 🔳 QR-code fraud attacks  

This prototype is built using **React + Gemini**, simulating how a **national-level AI safety layer** could function on citizens’ devices.

---

## 🧩 Why This Matters

India loses **₹1.25 lakh crore/year** to digital fraud.  
Scammers now use:

- AI-generated voices  
- Fake UPI pages  
- Convincing SMS spoofing  
- Malicious QR codes  

A **device-level AI agent** that monitors suspicious activity in real time can dramatically reduce these losses.

---

# 🎥 Demo (AI Studio App)

👉 Live Demo: **https://ai.studio/apps/drive/1LOJ8_LFFsj53p2gi4kE1sIPhhPOhhxqt**

*(Note: This is only a **simulation**, not system-level access.)*

---

# 🛡️ System Features (Prototype)

### **1. Scam Call Detection**
- Analyses call transcript in real-time  
- Flags urgent-payment/social-engineering phrases  
- Provides probability score of scam  

### **2. SMS Fraud/Smishing Detection**
- Scans suspicious SMS patterns  
- Detects bank-related fraud messages  
- Alerts user before opening risky links

### **3. Phishing URL Scanner**
- Evaluates URL using:
  - Gemini model  
  - Heuristic patterns  
  - Known scam domains  
- Returns “Safe / Suspicious / Dangerous”

### **4. UPI Fraud Prevention**
- Detects:
  - Payment redirection  
  - Fake payment confirmations  
  - Mismatched UPI IDs  
- Alerts user before payment

### **5. QR Code Attack Prevention**
- Decodes QR payload  
- Checks malicious deep-links  
- Prevents remote-payment triggering exploits

---

# 🏗️ Architecture (Simplified)

```mermaid
flowchart TD
    UserDevice((User Phone)) --> AgentLayer
    AgentLayer --> EventCapture
    EventCapture --> GeminiAI
    GeminiAI --> RiskAnalyzer
    RiskAnalyzer --> UI
    UI --> User
````

**Agent Layer (Prototype)**
✔ Built in React
✔ Simulated OS-level data
✔ AI-driven risk detection

---

# ⚙️ Tech Stack

| Layer     | Technology              |
| --------- | ----------------------- |
| Frontend  | React, Vite, TypeScript |
| AI Models | Gemini 2.0 Flash        |
| Styling   | Tailwind CSS            |
| Build     | Vite                    |
| Hosting   | AI Studio (Demo)        |

---

# 🧪 Installation (Local Setup)

## 1️⃣ Prerequisites

* Node.js (LTS recommended)
* A **Gemini API Key**

## 2️⃣ Install

```bash
npm install
```

## 3️⃣ Add your Gemini key

Create `.env.local`

```
GEMINI_API_KEY=your_key_here
```

## 4️⃣ Run

```bash
npm run dev
```

---

# 🔧 Folder Structure

```
.
├── components/
│   ├── ScamCallDetector.tsx
│   ├── SmsAnalyzer.tsx
│   ├── UrlScanner.tsx
│   ├── UpiFraudGuard.tsx
│   └── QrScanner.tsx
│
├── services/
│   ├── aiService.ts
│   └── validators.ts
│
├── App.tsx
├── index.html
├── index.tsx
└── package.json
```

---

# 🔬 How the Real-Time System Would Be Built (Production-Level Vision)

The current project is a **demo**, but a real implementation needs:

### **1. OS-Level Integration (Android/iOS APIs)**

* Access to phone calls (read-only transcript)
* SMS interception permissions
* Notification listeners
* Accessibility services for UPI apps
* QR code scanner API
* Browser monitoring API

### **2. Government Backed DPI Integration**

* NPCI + MeitY
* Fraud intelligence shared across states
* Real-time blacklist database
* Automated reporting system

### **3. Edge AI Deployment**

* Model runs on-device
* Ultra-low latency
* No cloud dependency for fraud detection

### **4. Secure Sandboxed Environment**

* Zero private data stored
* End-to-end encryption
* Local-only inference

### **5. Telecom + Bank Integration**

* Scam call numbers auto-reported
* Suspicious UPI handles validated
* Phishing URLs published in national feed

---

# 🛠️ Roadmap

### **MVP v1.0 (Current Demo)**

* UI simulation
* AI analysis screens
* Input-based fraud scanning

### **v2.0**

* Live SMS listener
* Real-time call transcript analysis
* UPI verification module

### **v3.0**

* Browser extension + URL interceptor
* QR security engine
* Secure notification listener

### **v4.0**

* On-device LLM (Gemini Nano)
* Telecom + UPI integration
* India-scale deployment architecture

---

# 📄 License

MIT License

---
