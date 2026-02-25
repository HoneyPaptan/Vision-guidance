'use client'

import { useRef, useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Camera, CameraOff, Wifi, WifiOff, Loader2 } from 'lucide-react'
import { type AgentConfig } from '@/lib/vision-agents'

interface VideoStreamProps {
  config: AgentConfig
  isRunning: boolean
  status: 'idle' | 'connecting' | 'active' | 'error'
}

export function VideoStream({ config, isRunning, status }: VideoStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)

  useEffect(() => {
    if (isRunning && !cameraActive) {
      startCamera()
    } else if (!isRunning && cameraActive) {
      stopCamera()
    }
  }, [isRunning])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 1280, height: 720 },
        audio: false,
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
        setCameraError(null)
      }
    } catch (err) {
      setCameraError('Camera access denied or unavailable')
      setCameraActive(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setCameraActive(false)
  }

  const statusConfig = {
    idle: { label: 'Idle', color: 'bg-gray-500', icon: WifiOff },
    connecting: { label: 'Connecting...', color: 'bg-yellow-500', icon: Loader2 },
    active: { label: 'Active', color: 'bg-green-500', icon: Wifi },
    error: { label: 'Error', color: 'bg-red-500', icon: WifiOff },
  }

  const currentStatus = statusConfig[status]
  const StatusIcon = currentStatus.icon

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-border">
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          cameraActive ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Placeholder when no camera */}
      {!cameraActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="rounded-full bg-muted p-6">
            {cameraError ? (
              <CameraOff className="h-10 w-10 text-muted-foreground" />
            ) : (
              <Camera className="h-10 w-10 text-muted-foreground" />
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              {cameraError || 'Camera feed will appear here'}
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              {isRunning ? 'Requesting camera access...' : 'Start the agent to enable camera'}
            </p>
          </div>
          {!isRunning && (
            <Button variant="outline" size="sm" onClick={startCamera} className="gap-2">
              <Camera className="h-3.5 w-3.5" />
              Preview Camera
            </Button>
          )}
        </div>
      )}

      {/* Status overlay - top left */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${currentStatus.color} ${status === 'active' ? 'animate-pulse' : ''}`} />
        <Badge variant="secondary" className="text-xs bg-black/60 backdrop-blur-sm border-white/10 text-white gap-1.5">
          <StatusIcon className={`h-3 w-3 ${status === 'connecting' ? 'animate-spin' : ''}`} />
          {currentStatus.label}
        </Badge>
      </div>

      {/* Agent info overlay - top right */}
      {isRunning && (
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="text-xs bg-black/60 backdrop-blur-sm border-white/10 text-white">
            {config.name} • {config.fps} FPS
          </Badge>
        </div>
      )}

      {/* Provider badge - bottom right */}
      {isRunning && (
        <div className="absolute bottom-3 right-3">
          <Badge variant="secondary" className="text-xs bg-black/60 backdrop-blur-sm border-white/10 text-white uppercase">
            {config.llm}
          </Badge>
        </div>
      )}

      {/* Scanning animation when active */}
      {status === 'active' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 animate-[scan_2s_ease-in-out_infinite]" style={{ top: '50%' }} />
        </div>
      )}
    </div>
  )
}
