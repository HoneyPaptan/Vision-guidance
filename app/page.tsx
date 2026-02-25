import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AgentCard } from '@/components/agent-card'
import { type AgentType } from '@/lib/vision-agents'
import { ArrowRight, Eye, Zap, Layers, Shield, ChevronRight } from 'lucide-react'

const FEATURES = [
  {
    icon: Eye,
    title: 'Real-time Video AI',
    description: 'Process live video streams with state-of-the-art vision models at up to 30 FPS.',
    badge: 'Core Feature',
  },
  {
    icon: Zap,
    title: 'Ultra-Low Latency',
    description: 'Sub-100ms processing pipeline using optimized WebRTC and edge compute infrastructure.',
    badge: 'Performance',
  },
  {
    icon: Layers,
    title: 'Multi-modal Intelligence',
    description: 'Combine YOLO object detection, Roboflow models, and LLMs for rich analysis.',
    badge: 'AI Powered',
  },
  {
    icon: Shield,
    title: 'Flexible Providers',
    description: 'Choose from Gemini, GPT-4, Claude, or AWS Bedrock as your LLM backbone.',
    badge: 'Integrations',
  },
]

const AGENT_TYPES: AgentType[] = ['golf-coach', 'security-camera', 'interview-coach', 'custom']

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Eye className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold text-sm">Vision Guidance</span>
            <Badge variant="secondary" className="text-xs ml-1">Beta</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/studio">
              <Button size="sm" className="gap-1.5">
                Launch Studio <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <Badge variant="outline" className="mb-6 px-3 py-1 text-xs border-primary/30 text-primary">
            🚀 AI Vision Agents — Now in Beta
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Vision Guidance
            <span className="block bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
              AI-Powered Vision Agents
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Deploy intelligent vision agents that analyze live video streams in real-time.
            From sports coaching to security monitoring — powered by the latest LLMs and computer vision models.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/studio">
              <Button size="lg" className="gap-2 text-base px-8">
                Launch Agent Studio
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-base px-8">
              View Documentation
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: '30', unit: 'FPS', label: 'Max Processing' },
              { value: '<100', unit: 'ms', label: 'Latency' },
              { value: '4', unit: '+', label: 'LLM Providers' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}<span className="text-primary text-lg">{stat.unit}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">Built for Production</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to deploy powerful AI vision agents at scale
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="border-border/60 hover:border-primary/30 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-[10px] w-fit mb-2">
                      {feature.badge}
                    </Badge>
                    <CardTitle className="text-sm">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Agent Templates */}
      <section className="py-20 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">Ready-to-Use Agent Templates</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Launch pre-configured agents or build your own from scratch
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AGENT_TYPES.map((type) => (
              <AgentCardStatic key={type} type={type} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/studio">
              <Button size="lg" className="gap-2">
                Open Agent Studio <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>Vision Guidance</span>
            <span>•</span>
            <span>AI-Powered Vision Agents</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Built with Next.js, shadcn/ui &amp; Stream Video SDK
          </div>
        </div>
      </footer>
    </div>
  )
}

// Server component version of AgentCard for the landing page
function AgentCardStatic({ type }: { type: AgentType }) {
  // Import the data directly without the interactive functionality
  const { AGENT_TEMPLATES } = require('@/lib/vision-agents')

  const AGENT_META: Record<AgentType, { emoji: string; useCases: string[] }> = {
    'golf-coach': { emoji: '⛳', useCases: ['Swing analysis', 'Posture feedback', 'Real-time tips', 'Progress tracking'] },
    'security-camera': { emoji: '📹', useCases: ['Motion detection', 'Face recognition', 'Package tracking', 'Anomaly alerts'] },
    'interview-coach': { emoji: '🎙️', useCases: ['Answer coaching', 'Body language tips', 'Confidence scoring', 'Question prep'] },
    'custom': { emoji: '🤖', useCases: ['Custom instructions', 'Any LLM provider', 'Flexible FPS', 'Any processor'] },
  }

  const template = AGENT_TEMPLATES[type]
  const meta = AGENT_META[type]

  return (
    <Card className="border-border/60 hover:border-primary/30 transition-colors">
      <CardHeader className="pb-3">
        <div className="text-3xl">{meta.emoji}</div>
        <CardTitle className="text-sm mt-2">{template.name}</CardTitle>
        <CardDescription className="text-xs leading-relaxed">
          {template.instructions || 'Configure your own custom AI vision agent with any instructions.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1.5 mb-4">
          {meta.useCases.map((useCase: string) => (
            <div key={useCase} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
              {useCase}
            </div>
          ))}
        </div>
        <Link href="/studio">
          <Button size="sm" variant="outline" className="w-full">
            Launch Agent
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
