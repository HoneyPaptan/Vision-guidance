'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AgentConfigPanel } from '@/components/agent-config'
import { VideoStream } from '@/components/video-stream'
import { LiveAnalysis } from '@/components/live-analysis'
import { AgentCard } from '@/components/agent-card'
import {
  type AgentConfig,
  type AgentType,
  type AnalysisResult,
  AGENT_TEMPLATES,
} from '@/lib/vision-agents'
import { ArrowLeft, Eye, LayoutGrid, Settings } from 'lucide-react'

const DEFAULT_CONFIG: AgentConfig = {
  type: 'golf-coach',
  name: 'Golf Coach',
  instructions: AGENT_TEMPLATES['golf-coach'].instructions!,
  llm: 'gemini',
  fps: 10,
  processor: 'yolo',
}

// Simulated analysis results for demo purposes
const DEMO_RESULTS: AnalysisResult[] = [
  {
    timestamp: new Date(Date.now() - 30000),
    type: 'info',
    content: 'Agent initialized. Ready to process video stream.',
  },
  {
    timestamp: new Date(Date.now() - 25000),
    type: 'detection',
    content: 'Person detected in frame. Tracking posture and movement.',
    confidence: 0.97,
  },
  {
    timestamp: new Date(Date.now() - 20000),
    type: 'analysis',
    content: 'Golf swing phase detected: backswing. Arm angle appears slightly off — try keeping left arm straighter.',
    confidence: 0.85,
  },
  {
    timestamp: new Date(Date.now() - 15000),
    type: 'analysis',
    content: 'Hip rotation looks good. Weight transfer from right to left foot is solid.',
    confidence: 0.88,
  },
  {
    timestamp: new Date(Date.now() - 10000),
    type: 'alert',
    content: 'Head movement detected during downswing. Keep your head still for better contact.',
    confidence: 0.91,
  },
]

export default function StudioPage() {
  const [config, setConfig] = useState<AgentConfig>(DEFAULT_CONFIG)
  const [isRunning, setIsRunning] = useState(false)
  const [agentStatus, setAgentStatus] = useState<'idle' | 'connecting' | 'active' | 'error'>('idle')
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([])
  const [activeTab, setActiveTab] = useState('studio')

  const handleConfigChange = useCallback((changes: Partial<AgentConfig>) => {
    setConfig((prev) => ({ ...prev, ...changes }))
  }, [])

  const handleStart = useCallback(() => {
    setIsRunning(true)
    setAgentStatus('connecting')
    setAnalysisResults([])

    // Simulate connection and start streaming demo results
    setTimeout(() => {
      setAgentStatus('active')
      setAnalysisResults(DEMO_RESULTS)
    }, 1500)

    // Simulate ongoing analysis
    let count = 0
    const interval = setInterval(() => {
      count++
      const mockResults: AnalysisResult[] = [
        {
          timestamp: new Date(),
          type: 'analysis',
          content: `Frame ${count * 10 + 50}: Continued analysis — maintaining good overall form. Small corrections needed in follow-through.`,
          confidence: 0.82 + Math.random() * 0.15,
        },
        {
          timestamp: new Date(),
          type: 'detection',
          content: `Club head speed estimated at ${Math.round(85 + Math.random() * 20)} mph during downswing.`,
          confidence: 0.79,
        },
      ]
      setAnalysisResults((prev) => [...prev, ...mockResults].slice(-50))

      if (count >= 20) clearInterval(interval)
    }, 3000)

    // Store interval ID for cleanup
    ;(window as unknown as Record<string, unknown>).__agentInterval = interval
  }, [])

  const handleStop = useCallback(() => {
    setIsRunning(false)
    setAgentStatus('idle')
    const interval = (window as unknown as Record<string, unknown>).__agentInterval
    if (interval) clearInterval(interval as ReturnType<typeof setInterval>)
  }, [])

  const handleAgentSelect = (type: AgentType) => {
    const template = AGENT_TEMPLATES[type]
    setConfig((prev) => ({ ...prev, type, ...template }))
    setActiveTab('studio')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50 h-14">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-5" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Eye className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-sm font-semibold">Agent Studio</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-colors ${
                  agentStatus === 'active'
                    ? 'bg-green-500 animate-pulse'
                    : agentStatus === 'connecting'
                    ? 'bg-yellow-500'
                    : agentStatus === 'error'
                    ? 'bg-red-500'
                    : 'bg-muted-foreground/40'
                }`}
              />
              <Badge
                variant={
                  agentStatus === 'active'
                    ? 'success'
                    : agentStatus === 'error'
                    ? 'destructive'
                    : 'secondary'
                }
                className="text-xs capitalize"
              >
                {agentStatus}
              </Badge>
            </div>
            <Badge variant="outline" className="text-xs border-primary/30 text-primary">
              {config.name}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-[1600px] mx-auto w-full px-4 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList className="h-8">
              <TabsTrigger value="studio" className="text-xs gap-1.5 h-6 px-3">
                <Eye className="h-3 w-3" />
                Studio
              </TabsTrigger>
              <TabsTrigger value="agents" className="text-xs gap-1.5 h-6 px-3">
                <LayoutGrid className="h-3 w-3" />
                Agents
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs gap-1.5 h-6 px-3">
                <Settings className="h-3 w-3" />
                Settings
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Studio Tab */}
          <TabsContent value="studio" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-4 h-[calc(100vh-8rem)]">
              {/* Left Sidebar - Config */}
              <div className="bg-card border border-border/60 rounded-xl p-4 overflow-y-auto">
                <AgentConfigPanel
                  config={config}
                  isRunning={isRunning}
                  onConfigChange={handleConfigChange}
                  onStart={handleStart}
                  onStop={handleStop}
                />
              </div>

              {/* Center - Video Stream */}
              <div className="flex flex-col gap-4">
                <VideoStream
                  config={config}
                  isRunning={isRunning}
                  status={agentStatus}
                />

                {/* Info bar below video */}
                <div className="bg-card border border-border/60 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Agent: <span className="text-foreground font-medium">{config.name}</span></span>
                    <span>LLM: <span className="text-foreground font-medium capitalize">{config.llm}</span></span>
                    <span>Processor: <span className="text-foreground font-medium capitalize">{config.processor}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs font-mono">{config.fps} FPS</Badge>
                    <Badge variant={isRunning ? 'success' : 'secondary'} className="text-xs">
                      {isRunning ? '🔴 Live' : '⚫ Offline'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Live Analysis */}
              <div className="bg-card border border-border/60 rounded-xl p-4 overflow-hidden flex flex-col">
                <LiveAnalysis results={analysisResults} isRunning={isRunning} />
              </div>
            </div>
          </TabsContent>

          {/* Agents Tab */}
          <TabsContent value="agents" className="mt-0">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-1">Choose an Agent Template</h2>
                <p className="text-sm text-muted-foreground">
                  Select a pre-configured agent template or start with a custom configuration
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(['golf-coach', 'security-camera', 'interview-coach', 'custom'] as AgentType[]).map(
                  (type) => (
                    <AgentCard
                      key={type}
                      type={type}
                      selected={config.type === type}
                      onSelect={handleAgentSelect}
                    />
                  )
                )}
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-0">
            <div className="max-w-lg space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Studio Settings</h2>
                <p className="text-sm text-muted-foreground">
                  Configure global settings for Vision Guidance Studio
                </p>
              </div>
              <div className="bg-card border border-border/60 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-medium">Current Configuration</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ['Agent', config.name],
                    ['LLM Provider', config.llm.toUpperCase()],
                    ['Processor', config.processor === 'none' ? 'LLM Only' : config.processor.toUpperCase()],
                    ['Frame Rate', `${config.fps} FPS`],
                    ['Status', agentStatus.charAt(0).toUpperCase() + agentStatus.slice(1)],
                  ].map(([key, value]) => (
                    <div key={key} className="flex flex-col gap-0.5">
                      <span className="text-xs text-muted-foreground">{key}</span>
                      <span className="font-medium text-xs">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
