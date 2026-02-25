'use client'

import { useEffect, useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { type AnalysisResult, formatTimestamp } from '@/lib/vision-agents'
import { Activity, AlertTriangle, Info, Search, Zap } from 'lucide-react'

interface LiveAnalysisProps {
  results: AnalysisResult[]
  isRunning: boolean
}

const TYPE_CONFIG = {
  detection: {
    icon: Search,
    color: 'text-blue-400',
    badgeVariant: 'secondary' as const,
    label: 'Detection',
  },
  analysis: {
    icon: Activity,
    color: 'text-green-400',
    badgeVariant: 'success' as const,
    label: 'Analysis',
  },
  alert: {
    icon: AlertTriangle,
    color: 'text-red-400',
    badgeVariant: 'destructive' as const,
    label: 'Alert',
  },
  info: {
    icon: Info,
    color: 'text-purple-400',
    badgeVariant: 'secondary' as const,
    label: 'Info',
  },
}

export function LiveAnalysis({ results, isRunning }: LiveAnalysisProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [results])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Live Analysis</h3>
        </div>
        <div className="flex items-center gap-2">
          {isRunning && (
            <div className="flex items-center gap-1.5 text-xs text-green-400">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Processing
            </div>
          )}
          <Badge variant="secondary" className="text-xs font-mono">
            {results.length} events
          </Badge>
        </div>
      </div>

      <Separator className="mb-3" />

      <ScrollArea className="flex-1 pr-2">
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3 text-center">
            <Activity className="h-8 w-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              {isRunning ? 'Waiting for analysis results...' : 'Start the agent to see live analysis'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {results.map((result, index) => {
              const typeConf = TYPE_CONFIG[result.type]
              const TypeIcon = typeConf.icon
              return (
                <div
                  key={index}
                  className="flex gap-3 p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className={`mt-0.5 flex-shrink-0 ${typeConf.color}`}>
                    <TypeIcon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={typeConf.badgeVariant} className="text-[10px] px-1.5 py-0">
                        {typeConf.label}
                      </Badge>
                      {result.confidence !== undefined && (
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {Math.round(result.confidence * 100)}% conf
                        </span>
                      )}
                      <span className="text-[10px] text-muted-foreground font-mono ml-auto">
                        {formatTimestamp(result.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/80 leading-relaxed break-words">
                      {result.content}
                    </p>
                  </div>
                </div>
              )
            })}
            <div ref={bottomRef} />
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
