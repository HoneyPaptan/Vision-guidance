'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { type AgentType, AGENT_TEMPLATES } from '@/lib/vision-agents'

interface AgentCardProps {
  type: AgentType
  selected?: boolean
  onSelect: (type: AgentType) => void
}

const AGENT_META: Record<AgentType, { emoji: string; useCases: string[] }> = {
  'golf-coach': {
    emoji: '⛳',
    useCases: ['Swing analysis', 'Posture feedback', 'Real-time tips', 'Progress tracking'],
  },
  'security-camera': {
    emoji: '📹',
    useCases: ['Motion detection', 'Face recognition', 'Package tracking', 'Anomaly alerts'],
  },
  'interview-coach': {
    emoji: '🎙️',
    useCases: ['Answer coaching', 'Body language tips', 'Confidence scoring', 'Question prep'],
  },
  'custom': {
    emoji: '🤖',
    useCases: ['Custom instructions', 'Any LLM provider', 'Flexible FPS', 'Any processor'],
  },
}

export function AgentCard({ type, selected = false, onSelect }: AgentCardProps) {
  const template = AGENT_TEMPLATES[type]
  const meta = AGENT_META[type]

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:border-primary/50 ${
        selected
          ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
          : 'border-border hover:bg-card/80'
      }`}
      onClick={() => onSelect(type)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="text-3xl">{meta.emoji}</div>
          {selected && (
            <Badge variant="default" className="text-xs">
              Selected
            </Badge>
          )}
        </div>
        <CardTitle className="text-base mt-2">{template.name}</CardTitle>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {template.instructions || 'Configure your own custom AI vision agent with any instructions.'}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-1.5">
          {meta.useCases.map((useCase) => (
            <div key={useCase} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
              {useCase}
            </div>
          ))}
        </div>
        <Button
          size="sm"
          variant={selected ? 'default' : 'outline'}
          className="w-full mt-4"
          onClick={(e) => {
            e.stopPropagation()
            onSelect(type)
          }}
        >
          {selected ? 'Selected' : 'Select Agent'}
        </Button>
      </CardContent>
    </Card>
  )
}
