# Vision Guidance 🎯

> A Next.js + shadcn/ui interface for building and managing AI-powered Vision Agents — powered by the [GetStream Vision Agents](https://github.com/GetStream/Vision-Agents) SDK.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-white)](https://ui.shadcn.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Overview

**Vision Guidance** is a production-ready Next.js application that provides a beautiful web interface for interacting with AI-powered Vision Agents. It connects to the [Stream Vision Agents](https://github.com/GetStream/Vision-Agents) Python SDK to enable real-time video analysis, object detection, and multi-modal AI coaching directly in the browser.

### What are Vision Agents?

Vision Agents are multi-modal AI agents that watch, listen, and understand video in real-time. They combine:

- 🎥 **Real-time video processing** via WebRTC
- 🤖 **LLM integration** (Gemini, GPT-4, Claude, AWS Bedrock)
- 👁️ **Computer vision models** (YOLO, Roboflow, Moondream)
- 🔊 **Speech-to-text / text-to-speech** pipelines
- ⚡ **Sub-100ms latency** using Stream's edge network

---

## 🚀 Features

| Feature | Description |
|---|---|
| **Agent Studio** | Full-featured IDE for configuring and launching vision agents |
| **Live Video Stream** | WebRTC-powered video feed with real-time AI overlay |
| **Agent Templates** | Pre-built templates for Golf Coach, Security Camera, Interview Coach |
| **Analysis Log** | Real-time scrollable log of AI detections and analysis |
| **Multi-LLM Support** | Gemini, OpenAI, Claude, and AWS Bedrock providers |
| **Vision Processors** | YOLO, Roboflow, Moondream integration options |
| **Dark Mode** | Full dark/light mode support via CSS variables |
| **Responsive Design** | Works on desktop, tablet, and mobile |

---

## 🏗️ Architecture

```
vision-guidance/
├── app/
│   ├── layout.tsx          # Root layout with metadata & fonts
│   ├── globals.css         # Tailwind v4 + CSS variables (dark mode)
│   ├── page.tsx            # Landing page (hero, features, agent cards)
│   └── studio/
│       └── page.tsx        # Agent Studio — main workspace
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── scroll-area.tsx
│   │   ├── separator.tsx
│   │   └── avatar.tsx
│   ├── agent-card.tsx      # Agent type card with use cases
│   ├── agent-config.tsx    # Configuration panel (LLM, processor, FPS)
│   ├── video-stream.tsx    # Camera feed with status overlays
│   └── live-analysis.tsx   # Real-time AI analysis log
└── lib/
    ├── utils.ts            # cn() class merge helper
    └── vision-agents.ts    # TypeScript types, templates & utilities
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** / **pnpm** / **yarn**
- (Optional) **Stream API Key** — get one free at [getstream.io](https://getstream.io/)

### 1. Clone & install

```bash
git clone https://github.com/HoneyPaptan/Vision-guidance.git
cd Vision-guidance
npm install
```

### 2. Set up environment variables (optional)

Create a `.env.local` file in the root:

```env
# Stream Video credentials (optional for demo mode)
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

> **Note:** The app runs in **demo mode** without credentials, using simulated analysis results. Live Vision Agent integration requires a Stream API key.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm start
```

---

## 🤖 Agent Templates

Vision Guidance ships with four ready-to-use agent templates:

### ⛳ Golf Coach
Analyzes golf swings in real-time using YOLO pose estimation + Gemini Live.
- Swing phase detection (backswing, downswing, follow-through)
- Posture and body alignment feedback
- Club head speed estimation
- Real-time coaching tips via voice

**Recommended config:** Gemini Realtime, YOLO processor, 10 FPS

---

### 📹 Security Camera
Monitors live camera feeds for security events.
- Face detection and recognition
- Package tracking and theft detection
- Anomaly and motion alerts
- Automatic incident reporting

**Recommended config:** Gemini LLM, YOLO processor, 5 FPS

---

### 🎙️ Interview Coach
A silent AI assistant that helps during live interviews.
- Real-time answer suggestions (text back-channel)
- Body language analysis
- Confidence and clarity scoring
- Question preparation

**Recommended config:** Gemini Realtime, no processor, 1 FPS

---

### 🤖 Custom Agent
Build any vision agent from scratch with full control:
- Custom system instructions
- Any supported LLM provider
- Any video processor
- Configurable frame rate

---

## 🔌 Vision Agents Backend

This UI is designed to work alongside the **[GetStream Vision Agents](https://github.com/GetStream/Vision-Agents)** Python SDK.

### Quick Backend Setup

```bash
# Install Vision Agents SDK
uv add vision-agents

# Install with extra integrations
uv add "vision-agents[getstream, openai, elevenlabs, deepgram]"
```

### Example: Golf Coach Agent (Python)

```python
from vision_agents import Agent, User
from vision_agents.integrations import gemini, getstream, ultralytics

agent_user = User(name="Golf Coach AI", id="golf-agent")

agent = Agent(
    edge=getstream.Edge(),
    agent_user=agent_user,
    instructions="Analyze golf swings and provide real-time coaching.",
    llm=gemini.Realtime(fps=10),
    processors=[ultralytics.YOLOPoseProcessor(model_path="yolo11n-pose.pt")],
)

agent.run()
```

### Example: Security Camera Agent (Python)

```python
from vision_agents import Agent, User
from vision_agents.integrations import gemini, getstream, elevenlabs, deepgram

agent = Agent(
    edge=getstream.Edge(),
    agent_user=User(name="Security AI", id="security-agent"),
    instructions="Monitor for suspicious activity and track packages.",
    llm=gemini.LLM("gemini-2.5-flash-lite"),
    tts=elevenlabs.TTS(),
    stt=deepgram.STT(),
)

agent.run()
```

### Supported Integrations

| Plugin | Type | Description |
|---|---|---|
| Gemini | LLM / Realtime | Google's multimodal model with live video support |
| OpenAI | LLM / Realtime | GPT-4o and Realtime API |
| Claude | LLM | Anthropic's Claude models |
| AWS Bedrock | LLM | Amazon Nova with speech-to-speech |
| ElevenLabs | TTS | Realistic voice synthesis |
| Deepgram | STT | Fast real-time transcription |
| YOLO (Ultralytics) | Processor | Object detection & pose estimation |
| Roboflow | Processor | Custom trained vision models |
| Moondream | VLM | Local visual question answering |
| HeyGen | Avatar | Realtime interactive avatars |

---

## 🎨 UI Components

Built with [shadcn/ui](https://ui.shadcn.com/) on top of Tailwind CSS v4:

```tsx
// Import shadcn components
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Use Vision Agents types
import { type AgentConfig, AGENT_TEMPLATES } from '@/lib/vision-agents'
```

---

## 📦 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16 | React framework with App Router |
| [React](https://react.dev/) | 19 | UI rendering |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | latest | Component library |
| [Radix UI](https://www.radix-ui.com/) | latest | Accessible UI primitives |
| [Lucide React](https://lucide.dev/) | latest | Icon library |
| [Stream Node SDK](https://getstream.io/video/docs/) | latest | Video infrastructure |
| [class-variance-authority](https://cva.style/) | latest | Component variants |

---

## 🔧 Configuration

### Agent Config Type

```typescript
interface AgentConfig {
  type: 'golf-coach' | 'security-camera' | 'interview-coach' | 'custom'
  name: string
  instructions: string
  llm: 'gemini' | 'openai' | 'claude' | 'bedrock'
  fps: number                                           // 1–30 frames per second
  processor: 'yolo' | 'roboflow' | 'moondream' | 'none'
  streamApiKey?: string
  streamUserId?: string
}
```

### Analysis Result Type

```typescript
interface AnalysisResult {
  timestamp: Date
  type: 'detection' | 'analysis' | 'alert' | 'info'
  content: string
  confidence?: number   // 0–1 confidence score
}
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel deploy
```

Or click the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/HoneyPaptan/Vision-guidance)

### Deploy to Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t vision-guidance .
docker run -p 3000:3000 vision-guidance
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [GetStream](https://getstream.io/) for the [Vision Agents SDK](https://github.com/GetStream/Vision-Agents) and video infrastructure
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component system
- [Vercel](https://vercel.com/) for Next.js and hosting

---

<p align="center">Built with ❤️ using Next.js, shadcn/ui, and Stream Vision Agents</p>
