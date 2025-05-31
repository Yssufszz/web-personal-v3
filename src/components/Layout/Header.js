import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../contexts/AuthContext'

const Header = () => {
  const { language, t, toggleLanguage } = useLanguage()
  const { user, signOut } = useAuth()
  const location = useLocation()
  const isAdminPage = location.pathname === '/admin'
  
  // Theme state
  const [theme, setTheme] = useState('light')

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (systemPrefersDark) {
      setTheme('dark')
    }
  }, [])

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top glass-effect">
      <div className="container">
        <Link className="navbar-brand text-gradient" to="/">
          Yssufsz
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          style={{
            border: `2px solid var(--primary)`,
            borderRadius: '8px',
            padding: '0.375rem 0.75rem'
          }}
        >
          <span 
            className="navbar-toggler-icon" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='${theme === 'dark' ? '%23ffffff' : '%23000000'}' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`
            }}
          ></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          {!isAdminPage && (
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link" 
                  onClick={() => scrollToSection('home')}
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t('home')}
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link" 
                  onClick={() => scrollToSection('about')}
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t('about')}
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link" 
                  onClick={() => scrollToSection('skills')}
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t('skills')}
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link" 
                  onClick={() => scrollToSection('projects')}
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t('projects')}
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link" 
                  onClick={() => scrollToSection('experience')}
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t('experience')}
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link" 
                  onClick={() => scrollToSection('contact')}
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t('contact')}
                </button>
              </li>
            </ul>
          )}
          
          <div className="d-flex align-items-center flex-wrap gap-2">
            {/* Theme Toggle Button */}
            <button 
              className="theme-toggle btn btn-sm d-flex align-items-center gap-1" 
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                  <span className="d-none d-sm-inline">Dark</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="5"/>
                    <path d="m15.91 11.672a.375.375 0 0 1 0 .656l.422.18a1 1 0 0 1 .55 1.265l-.077.19a1 1 0 0 1-1.265.55l-.479-.205a.375.375 0 0 1-.309-.309l-.205-.479a1 1 0 0 1 .55-1.265l.19-.077a1 1 0 0 1 1.265.55l.18.422-.422-.18zm-7.82-7.82l.18.422-.18-.422zm3.08-3.25a.375.375 0 0 1 .656 0l.18.422a1 1 0 0 1-.55 1.265l-.19.077a1 1 0 0 1-1.265-.55l-.205-.479a.375.375 0 0 1 .309-.309l.479-.205a1 1 0 0 1 1.265.55l.077.19-.077-.19z"/>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                  </svg>
                  <span className="d-none d-sm-inline">Light</span>
                </>
              )}
            </button>
            
            {/* Language Toggle */}
            <button 
              className="btn btn-outline-secondary btn-sm" 
              onClick={toggleLanguage}
              style={{
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                borderRadius: '50px',
                padding: '0.5rem 1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              {language === 'en' ? 'ID' : 'EN'}
            </button>
            
            {user && (
              <div className="d-flex align-items-center gap-2">
                <span 
                  className="d-none d-md-inline" 
                  style={{ color: 'var(--text-primary)', fontWeight: '500' }}
                >
                  {user.user_metadata?.full_name}
                </span>
                <Link 
                  to="/admin" 
                  className="btn btn-outline-primary btn-sm"
                  style={{
                    borderRadius: '50px',
                    padding: '0.5rem 1rem',
                    fontWeight: '600'
                  }}
                >
                  Admin
                </Link>
                <Link 
                  to="/" 
                  className="btn btn-outline-secondary btn-sm"
                  style={{
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: '50px',
                    padding: '0.5rem 1rem',
                    fontWeight: '600'
                  }}
                >
                  Site
                </Link>
                <button 
                  className="btn btn-outline-danger btn-sm" 
                  onClick={signOut}
                  style={{
                    borderRadius: '50px',
                    padding: '0.5rem 1rem',
                    fontWeight: '600'
                  }}
                >
                  {t('logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header