import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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