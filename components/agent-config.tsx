'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  type AgentConfig,
  type AgentType,
  type LLMProvider,
  type ProcessorType,
  AGENT_TEMPLATES,
} from '@/lib/vision-agents'
import { Play, Square, Settings2 } from 'lucide-react'

interface AgentConfigPanelProps {
  config: AgentConfig
  isRunning: boolean
  onConfigChange: (config: Partial<AgentConfig>) => void
  onStart: () => void
  onStop: () => void
}

export function AgentConfigPanel({
  config,
  isRunning,
  onConfigChange,
  onStart,
  onStop,
}: AgentConfigPanelProps) {
  const handleAgentTypeChange = (type: AgentType) => {
    const template = AGENT_TEMPLATES[type]
    onConfigChange({ type, ...template })
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Settings2 className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-sm">Agent Configuration</h3>
      </div>

      <Separator />

      {/* Agent Type */}
      <div className="space-y-2">
        <Label htmlFor="agent-type" className="text-xs text-muted-foreground uppercase tracking-wider">
          Agent Type
        </Label>
        <Select
          value={config.type}
          onValueChange={(v) => handleAgentTypeChange(v as AgentType)}
          disabled={isRunning}
        >
          <SelectTrigger id="agent-type" className="h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="golf-coach">⛳ Golf Coach</SelectItem>
            <SelectItem value="security-camera">📹 Security Camera</SelectItem>
            <SelectItem value="interview-coach">🎙️ Interview Coach</SelectItem>
            <SelectItem value="custom">🤖 Custom Agent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* LLM Provider */}
      <div className="space-y-2">
        <Label htmlFor="llm-provider" className="text-xs text-muted-foreground uppercase tracking-wider">
          LLM Provider
        </Label>
        <Select
          value={config.llm}
          onValueChange={(v) => onConfigChange({ llm: v as LLMProvider })}
          disabled={isRunning}
        >
          <SelectTrigger id="llm-provider" className="h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gemini">🔵 Google Gemini</SelectItem>
            <SelectItem value="openai">🟢 OpenAI GPT-4</SelectItem>
            <SelectItem value="claude">🟣 Anthropic Claude</SelectItem>
            <SelectItem value="bedrock">🟠 AWS Bedrock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Processor */}
      <div className="space-y-2">
        <Label htmlFor="processor" className="text-xs text-muted-foreground uppercase tracking-wider">
          Vision Processor
        </Label>
        <Select
          value={config.processor}
          onValueChange={(v) => onConfigChange({ processor: v as ProcessorType })}
          disabled={isRunning}
        >
          <SelectTrigger id="processor" className="h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None (LLM only)</SelectItem>
            <SelectItem value="yolo">YOLO (Object Detection)</SelectItem>
            <SelectItem value="roboflow">Roboflow</SelectItem>
            <SelectItem value="moondream">Moondream</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* FPS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="fps" className="text-xs text-muted-foreground uppercase tracking-wider">
            Frame Rate (FPS)
          </Label>
          <Badge variant="secondary" className="text-xs font-mono">
            {config.fps} fps
          </Badge>
        </div>
        <Input
          id="fps"
          type="number"
          min={1}
          max={30}
          value={config.fps}
          onChange={(e) => onConfigChange({ fps: parseInt(e.target.value) || 1 })}
          disabled={isRunning}
          className="h-8 text-sm"
        />
      </div>

      {/* Instructions */}
      <div className="space-y-2">
        <Label htmlFor="instructions" className="text-xs text-muted-foreground uppercase tracking-wider">
          Instructions
        </Label>
        <Textarea
          id="instructions"
          value={config.instructions}
          onChange={(e) => onConfigChange({ instructions: e.target.value })}
          disabled={isRunning}
          placeholder="Describe what the agent should do..."
          className="text-sm min-h-[100px] resize-none"
        />
      </div>

      <Separator />

      {/* Start/Stop Button */}
      <Button
        className="w-full"
        variant={isRunning ? 'destructive' : 'default'}
        onClick={isRunning ? onStop : onStart}
        size="sm"
      >
        {isRunning ? (
          <>
            <Square className="h-3.5 w-3.5 mr-2" />
            Stop Agent
          </>
        ) : (
          <>
            <Play className="h-3.5 w-3.5 mr-2" />
            Start Agent
          </>
        )}
      </Button>
    </div>
  )
}
