import { useState, useEffect, useMemo  } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Home from './components/sections/Home'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'
import AdminPanel from './components/Admin/AdminPanel'
import AdminLogin from './components/Admin/AdminLogin'

const LoadingScreen = () => {
  const [textIndex, setTextIndex] = useState(0)

  // Memoize loadingMessages agar tidak dibuat ulang setiap render
  const loadingMessages = useMemo(() => [
    'Loading',
    'Preparing Experience',
    'Setting Up Interface',
    'Almost Ready',
    'Finalizing Details'
  ], [])

  // Effect untuk mengubah index text
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length)
    }, 800)

    return () => clearInterval(interval)
  }, [loadingMessages.length]) // Sekarang safe karena loadingMessages di-memoize

  // Text saat ini berdasarkan index
  const currentLoadingText = loadingMessages[textIndex]

  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="spinner-container">
          <div className="spinner"></div>
          <div className="spinner-glow"></div>
        </div>
        
        <div className="loading-text-container">
          <h3 className="loading-text" key={textIndex}>
            {currentLoadingText}
          </h3>
          <div className="loading-dots">
            <span className="dot dot-1">.</span>
            <span className="dot dot-2">.</span>
            <span className="dot dot-3">.</span>
          </div>
        </div>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill"></div>
            <div className="progress-shine"></div>
          </div>
          <div className="progress-text">Please wait...</div>
        </div>
      </div>
      
      <div className="background-particles">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
      
      <style jsx>{`
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f8faff 0%, #e8f4ff 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          transition: opacity 0.5s ease-out;
          overflow: hidden;
        }
        
        .background-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(0, 102, 255, 0.3);
          border-radius: 50%;
        }
        
        .particle-1 {
          top: 20%;
          left: 20%;
          animation: float 6s ease-in-out infinite;
        }
        
        .particle-2 {
          top: 60%;
          left: 80%;
          animation: float 8s ease-in-out infinite 2s;
        }
        
        .particle-3 {
          top: 80%;
          left: 30%;
          animation: float 7s ease-in-out infinite 1s;
        }
        
        .particle-4 {
          top: 30%;
          left: 70%;
          animation: float 5s ease-in-out infinite 3s;
        }
        
        .particle-5 {
          top: 50%;
          left: 10%;
          animation: float 9s ease-in-out infinite 1.5s;
        }
        
        .loading-container {
          text-align: center;
          color: #1a1a1a;
          max-width: 350px;
          width: 90%;
          background: rgba(255, 255, 255, 0.95);
          padding: 50px 40px;
          border-radius: 25px;
          box-shadow: 
            0 25px 50px rgba(0, 102, 255, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(0, 102, 255, 0.1);
          position: relative;
          z-index: 10;
        }
        
        .spinner-container {
          position: relative;
          display: inline-block;
          margin-bottom: 30px;
        }
        
        .spinner {
          width: 70px;
          height: 70px;
          border: 4px solid rgba(0, 102, 255, 0.2);
          border-top: 4px solid #0066ff;
          border-right: 4px solid #00d4ff;
          border-radius: 50%;
          animation: spin 1.2s linear infinite;
          position: relative;
          z-index: 2;
        }
        
        .spinner-glow {
          position: absolute;
          top: -10px;
          left: -10px;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 102, 255, 0.3) 0%, transparent 70%);
          animation: pulse 2s ease-in-out infinite;
        }
        
        .loading-text-container {
          margin-bottom: 35px;
          min-height: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .loading-text {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #1a1a1a;
          text-shadow: 0 2px 10px rgba(0, 102, 255, 0.15);
          letter-spacing: 1px;
          animation: textGlow 2s ease-in-out infinite alternate;
          transition: all 0.5s ease-in-out;
          background: linear-gradient(45deg, #0066ff, #6c5ce7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .loading-dots {
          display: inline-flex;
          gap: 4px;
        }
        
        .dot {
          font-size: 24px;
          font-weight: bold;
          color: #0066ff;
          animation: bounce 1.4s ease-in-out infinite;
          text-shadow: 0 2px 5px rgba(0, 102, 255, 0.15);
        }
        
        .dot-1 {
          animation-delay: 0s;
        }
        
        .dot-2 {
          animation-delay: 0.2s;
        }
        
        .dot-3 {
          animation-delay: 0.4s;
        }
        
        .progress-container {
          width: 100%;
        }
        
        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(0, 102, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          box-shadow: inset 0 2px 4px rgba(0, 102, 255, 0.1);
          margin-bottom: 15px;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #0066ff 0%, #00d4ff 50%, #6c5ce7 100%);
          border-radius: 4px;
          animation: progress 3s ease-in-out infinite;
          position: relative;
          box-shadow: 0 0 10px rgba(0, 102, 255, 0.3);
        }
        
        .progress-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          animation: shine 2s ease-in-out infinite;
        }
        
        .progress-text {
          font-size: 14px;
          color: #666666;
          font-weight: 500;
          letter-spacing: 0.5px;
          animation: fadeInOut 2s ease-in-out infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.6;
          }
        }
        
        @keyframes textGlow {
          0% { 
            text-shadow: 0 2px 10px rgba(0, 102, 255, 0.15);
            transform: translateY(0px);
          }
          100% { 
            text-shadow: 0 4px 20px rgba(0, 102, 255, 0.3);
            transform: translateY(-2px);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          40% {
            transform: translateY(-8px);
            opacity: 1;
          }
          60% {
            transform: translateY(-4px);
            opacity: 0.8;
          }
        }
        
        @keyframes progress {
          0% { 
            width: 0%;
            transform: translateX(-100%);
          }
          50% {
            width: 80%;
            transform: translateX(0%);
          }
          100% { 
            width: 100%;
            transform: translateX(0%);
          }
        }
        
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }
        
        @media (max-width: 768px) {
          .loading-container {
            padding: 40px 30px;
            max-width: 300px;
          }
          
          .loading-text {
            font-size: 22px;
          }
          
          .spinner {
            width: 60px;
            height: 60px;
          }
          
          .spinner-glow {
            width: 80px;
            height: 80px;
            top: -10px;
            left: -10px;
          }
        }
        
        @media (max-width: 480px) {
          .loading-text {
            font-size: 20px;
          }
          
          .loading-container {
            padding: 35px 25px;
          }
        }
      `}</style>
    </div>
  )
}

const MainSite = () => (
  <>
    <Home />
    <About />
    <Skills />
    <Projects />
    <Experience />
    <Contact />
  </>
)

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadComponents = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
        
      } catch (error) {
        console.error('Error loading components:', error)
        setIsLoading(false)
      }
    }

    loadComponents()
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="App">
            <Header />
            <main style={{ paddingTop: '76px' }}>
              <Routes>
                <Route path="/" element={<MainSite />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/admin/login" element={<AdminLogin />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App