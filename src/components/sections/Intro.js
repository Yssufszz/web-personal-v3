import React, { useState, useEffect, useCallback, useMemo } from 'react'
import './css/Intro.css'

const Intro = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [showText, setShowText] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const [showShapes, setShowShapes] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Enhanced particle system with more variety
  const particleCount = useMemo(() => {
    const isMobile = window.innerWidth < 768
    return isMobile ? 30 : 60
  }, [])

  const particles = useMemo(() => 
    [...Array(particleCount)].map((_, i) => ({
      id: i,
      type: i % 5,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 6,
      size: 0.5 + Math.random() * 1.5
    })), [particleCount]
  )

  // Enhanced geometric shapes with random positioning
  const shapes = useMemo(() => [
    {
      id: 1,
      className: 'shape-1',
      style: {
        top: `${10 + Math.random() * 20}%`,
        left: `${5 + Math.random() * 15}%`,
        animationDelay: `${Math.random() * 2}s`
      }
    },
    {
      id: 2,
      className: 'shape-2',
      style: {
        top: `${60 + Math.random() * 20}%`,
        right: `${10 + Math.random() * 15}%`,
        animationDelay: `${Math.random() * 2}s`
      }
    },
    {
      id: 3,
      className: 'shape-3',
      style: {
        top: `${30 + Math.random() * 20}%`,
        left: `${0 + Math.random() * 10}%`,
        animationDelay: `${Math.random() * 2}s`
      }
    },
    {
      id: 4,
      className: 'shape-4',
      style: {
        top: `${20 + Math.random() * 15}%`,
        right: `${25 + Math.random() * 15}%`,
        animationDelay: `${Math.random() * 2}s`
      }
    },
    {
      id: 5,
      className: 'shape-5',
      style: {
        bottom: `${15 + Math.random() * 15}%`,
        left: `${25 + Math.random() * 20}%`,
        animationDelay: `${Math.random() * 2}s`
      }
    }
  ], [])

  // Enhanced animation sequence with loading progress
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 3
      })
    }, 50)

    // Staggered animation sequence
    const timer1 = setTimeout(() => setShowParticles(true), 400)
    const timer2 = setTimeout(() => setShowShapes(true), 600)
    const timer3 = setTimeout(() => setShowText(true), 1000)
    const timer4 = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        setIsVisible(false)
        if (onComplete) onComplete()
      }, 1200)
    }, 4500)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onComplete])

  // Handle mouse move for interactive effects
  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth) * 100
    const y = (e.clientY / window.innerHeight) * 100
    
    // Add subtle parallax effect to background
    document.documentElement.style.setProperty('--mouse-x', `${x}%`)
    document.documentElement.style.setProperty('--mouse-y', `${y}%`)
  }, [])

  useEffect(() => {
    if (showText) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [showText, handleMouseMove])

  if (!isVisible) return null

  return (
    <div 
      className={`intro-container ${fadeOut ? 'fade-out' : ''}`}
      role="banner"
      aria-label="Loading screen"
    >
      {/* Enhanced Background with multiple layers */}
      <div className="intro-background">
        <div className="background-layer-1"></div>
        <div className="background-layer-2"></div>
        <div className="background-layer-3"></div>
      </div>
      
      {/* Enhanced Floating particles with variety */}
      <div 
        className={`particles-container ${showParticles ? 'active' : ''}`}
        aria-hidden="true"
      >
        {particles.map((particle) => (
          <div 
            key={particle.id}
            className={`particle particle-${particle.type}`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              transform: `scale(${particle.size})`,
              '--random-x': `${(Math.random() - 0.5) * 200}px`,
              '--random-y': `${(Math.random() - 0.5) * 200}px`
            }}
          ></div>
        ))}
      </div>

      {/* Enhanced Geometric shapes with dynamic positioning */}
      <div 
        className={`geometric-shapes ${showShapes ? 'active' : ''}`}
        aria-hidden="true"
      >
        {shapes.map((shape) => (
          <div 
            key={shape.id}
            className={`shape ${shape.className}`}
            style={shape.style}
          ></div>
        ))}
        
        {/* Additional floating elements */}
        <div className="floating-dots">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="floating-dot"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Enhanced Main content */}
      <div className="intro-content">
        <div className={`text-container ${showText ? 'animate-in' : ''}`}>
          <h1 className="intro-text" role="heading" aria-level="1">
            <span className="letter letter-1" data-letter="Y">Y</span>
            <span className="letter letter-2" data-letter="s">s</span>
            <span className="letter letter-3" data-letter="s">s</span>
            <span className="letter letter-4" data-letter="u">u</span>
            <span className="letter letter-5" data-letter="f">f</span>
            <span className="letter letter-6" data-letter="s">s</span>
            <span className="letter letter-7" data-letter="z">z</span>
          </h1>
          
          {/* Enhanced underline animation with multiple layers */}
          <div className="text-underline-container">
            <div className="text-underline primary"></div>
            <div className="text-underline secondary"></div>
            <div className="text-underline tertiary"></div>
          </div>
          
          {/* Enhanced glowing orb with layers */}
          <div className="text-glow primary"></div>
          <div className="text-glow secondary"></div>
          <div className="text-glow tertiary"></div>
        </div>

        {/* Enhanced ripple effect with more waves */}
        <div className="ripple-container">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className={`ripple ripple-${i + 1}`}
              style={{
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + i * 0.5}s`
              }}
            ></div>
          ))}
        </div>

        {/* Floating text elements */}
        <div className="floating-text-elements">
          <div className="floating-text top-left">Welcome</div>
          <div className="floating-text top-right">Experience</div>
          <div className="floating-text bottom-left">Innovation</div>
          <div className="floating-text bottom-right">Future</div>
        </div>
      </div>

      {/* Enhanced Loading indicator with progress */}
      <div className="loading-indicator">
        <div className="loading-bar-container">
          <div className="loading-bar">
            <div 
              className="loading-progress"
              style={{ width: `${Math.min(loadingProgress, 100)}%` }}
            ></div>
            <div className="loading-shimmer"></div>
          </div>
          <div className="loading-percentage">
            {Math.floor(Math.min(loadingProgress, 100))}%
          </div>
        </div>
        <div className="loading-text">
          {loadingProgress < 30 ? 'Initializing...' :
           loadingProgress < 60 ? 'Loading Experience...' :
           loadingProgress < 90 ? 'Almost Ready...' :
           'Welcome!'}
        </div>
        
        {/* Loading dots animation */}
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>

      {/* Background audio visualization bars */}
      <div className="audio-visualization" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="audio-bar"
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${1 + Math.random()}s`,
              height: `${20 + Math.random() * 60}%`
            }}
          ></div>
        ))}
      </div>

      {/* Corner decorative elements */}
      <div className="corner-decorations">
        <div className="corner-decoration top-left"></div>
        <div className="corner-decoration top-right"></div>
        <div className="corner-decoration bottom-left"></div>
        <div className="corner-decoration bottom-right"></div>
      </div>

      {/* Progress indicators */}
      <div className="progress-indicators">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i}
            className={`progress-indicator ${showParticles && i >= 0 ? 'active' : ''} ${showShapes && i >= 1 ? 'active' : ''} ${showText && i >= 2 ? 'active' : ''} ${loadingProgress >= 100 && i >= 3 ? 'active' : ''}`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Intro