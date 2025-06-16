import React, { useState, useEffect } from 'react'

const Intro = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [showText, setShowText] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Animation sequence
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 5
      })
    }, 50)

    const timer1 = setTimeout(() => setShowText(true), 500)
    const timer2 = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) onComplete()
    }, 4000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #f8faff 0%, #e8f4ff 100%)', // --light-gradient-bg
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      transition: 'opacity 1.2s ease-out',
      opacity: isVisible ? 1 : 0,
      zIndex: 9999
    }}>
      {/* Enhanced Text with Improved Clarity */}
      <div style={{
        textAlign: 'center',
        opacity: showText ? 1 : 0,
        transform: showText ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease-in, transform 0.8s ease-in',
        fontFamily: "'Roboto', sans-serif"
      }}>
        <h1 style={{
          color: '#1a1a1a', // --light-text-primary
          fontSize: 'clamp(3rem, 8vw, 4.5rem)',
          fontWeight: 500, // Slightly bolder for clarity
          letterSpacing: '0.25em',
          marginBottom: '1.5rem',
          textTransform: 'uppercase',
          textShadow: '0 0 8px rgba(0, 102, 255, 0.2)', // Reduced glow for sharper text
          display: 'inline-block',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          animation: showText ? 'typing 1.5s steps(5, end)' : 'none',
          '@keyframes typing': {
            '0%': { width: '0%' },
            '100%': { width: '100%' }
          }
        }}>
          YSSFZ
        </h1>
        <div style={{
          width: '180px',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #0066ff, transparent)', // --light-primary
          margin: '0 auto',
          animation: 'pulse 2s infinite ease-in-out',
          boxShadow: '0 0 10px rgba(0, 102, 255, 0.3)', // --light-glow
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scaleX(1)' },
            '50%': { transform: 'scaleX(1.2)' }
          }
        }} />
      </div>

      {/* Enhanced Loading Bar */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        width: 'clamp(200px, 50%, 300px)',
        textAlign: 'center'
      }}>
        <div style={{
          width: '100%',
          height: '6px', // Slightly thicker for visibility
          background: 'rgba(0, 102, 255, 0.1)', // --light-border
          borderRadius: '3px',
          overflow: 'hidden',
          boxShadow: '0 0 10px rgba(0, 102, 255, 0.2)', // --light-glow
          animation: 'barPulse 2.5s infinite ease-in-out',
          '@keyframes barPulse': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.02)' }
          }
        }}>
          <div style={{
            width: `${Math.min(loadingProgress, 100)}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #0066ff, #00d4ff)', // --light-primary to --light-secondary
            transition: 'width 0.3s ease-out',
            borderRadius: '3px',
            boxShadow: '0 0 12px rgba(0, 102, 255, 0.4)', // Enhanced --light-glow
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent)',
              backgroundSize: '20px 20px',
              animation: 'shimmer 2s linear infinite',
              '@keyframes shimmer': {
                '0%': { backgroundPosition: '0 0' },
                '100%': { backgroundPosition: '20px 20px' }
              }
            }} />
          </div>
        </div>
        <div style={{
          color: '#1a1a1a', // --light-text-primary
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          fontWeight: 400,
          marginTop: '0.75rem',
          fontFamily: "'Roboto', sans-serif",
          textShadow: '0 0 5px rgba(0, 102, 255, 0.2)' // Subtle --light-glow
        }}>
          {Math.floor(Math.min(loadingProgress, 100))}%
        </div>
      </div>
    </div>
  )
}

export default Intro