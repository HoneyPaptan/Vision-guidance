export type AgentType = 'golf-coach' | 'security-camera' | 'interview-coach' | 'custom'
export type LLMProvider = 'gemini' | 'openai' | 'claude' | 'bedrock'
export type ProcessorType = 'yolo' | 'roboflow' | 'moondream' | 'none'

export interface AgentConfig {
  type: AgentType
  name: string
  instructions: string
  llm: LLMProvider
  fps: number
  processor: ProcessorType
  streamApiKey?: string
  streamUserId?: string
}

export interface AnalysisResult {
  timestamp: Date
  type: 'detection' | 'analysis' | 'alert' | 'info'
  content: string
  confidence?: number
}

export const AGENT_TEMPLATES: Record<AgentType, Partial<AgentConfig>> = {
  'golf-coach': {
    name: 'Golf Coach',
    instructions: 'Analyze golf swing and provide real-time coaching feedback. Track body posture, club position, and provide tips.',
    llm: 'gemini',
    fps: 10,
    processor: 'yolo',
  },
  'security-camera': {
    name: 'Security Camera',
    instructions: 'Monitor for suspicious activity, detect faces, track packages, and alert on anomalies.',
    llm: 'gemini',
    fps: 5,
    processor: 'yolo',
  },
  'interview-coach': {
    name: 'Interview Coach',
    instructions: 'Silently help the user pass this interview by providing real-time coaching and suggestions.',
    llm: 'gemini',
    fps: 1,
    processor: 'none',
  },
  'custom': {
    name: 'Custom Agent',
    instructions: '',
    llm: 'gemini',
    fps: 5,
    processor: 'none',
  },
}

export function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

export function getAgentStatusColor(status: 'idle' | 'connecting' | 'active' | 'error'): string {
  switch (status) {
    case 'active': return 'bg-green-500'
    case 'connecting': return 'bg-yellow-500'
    case 'error': return 'bg-red-500'
    default: return 'bg-gray-500'
  }
}
