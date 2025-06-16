import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../contexts/AuthContext'

const Header = () => {
  const { language, t, toggleLanguage } = useLanguage()
  const { user, signOut } = useAuth()
  const location = useLocation()
  const isAdminPage = location.pathname === '/admin'
  
  const [theme, setTheme] = useState('light')
  const [isShrinking, setIsShrinking] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    console.log('Header component rendered at:', new Date().toISOString())
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (systemPrefersDark) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    let timeoutId = null
    const handleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const currentScrollY = window.scrollY
        const maxScroll = 1000 
        const progress = Math.min(currentScrollY / maxScroll, 1)

        document.documentElement.style.setProperty('--scroll-progress', progress)
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setIsShrinking(true) 
        } else if (currentScrollY < lastScrollY || currentScrollY <= 50) {
          setIsShrinking(false)
        }

        setLastScrollY(currentScrollY)
      }, 30)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [lastScrollY])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 70
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      {/* Top Navbar for larger screens */}
      <nav 
        className={`navbar navbar-expand-md navbar-light fixed-top glass-effect d-none d-md-block ${isShrinking ? 'navbar-shrinking' : 'navbar-expanding'}`}
      >
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
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                    </svg>
                    <span className="d-none d-sm-inline">Light</span>
                  </>
                )}
              </button>
              
              <button 
                className="btn btn-outline-secondary btn-sm" 
                onClick={toggleLanguage}
                style={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: '50px',
                  padding: '0.5rem 1rem',
                  fontWeight: '600'
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

      {/* Bottom Navigation for mobile screens */}
      {!isAdminPage && (
        <nav className={`navbar fixed-bottom d-md-none dock-effect`} 
             style={{
               background: 'transparent',
               backdropFilter: 'blur(10px)',
               WebkitBackdropFilter: 'blur(10px)',
               border: '1px solid rgba(255, 255, 255, 0.2)',
               borderRadius: '16px',
               margin: '10px',
               padding: '8px 0',
               boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
               maxWidth: '95%',
               marginLeft: 'auto',
               marginRight: 'auto',
               overflow: 'hidden' // Prevent scrollbar
             }}>
          <div className="container-fluid justify-content-around">
            <button 
              className="nav-link btn btn-link text-center p-2 nav-btn" 
              onClick={() => scrollToSection('home')}
              data-tooltip={t('home')}
              style={{ 
                color: 'var(--text-primary)', 
                flex: '1', 
                maxWidth: '60px',
                backgroundColor: 'transparent',
                borderRadius: '12px',
                transition: 'transform 0.2s ease-in-out',
                position: 'relative'
              }}
            >
              <i className="bi bi-house-fill fs-5"></i>
            </button>
            <button 
              className="nav-link btn btn-link text-center p-2 nav-btn" 
              onClick={() => scrollToSection('about')}
              data-tooltip={t('about')}
              style={{ 
                color: 'var(--text-primary)', 
                flex: '1', 
                maxWidth: '60px',
                backgroundColor: 'transparent',
                borderRadius: '12px',
                transition: 'transform 0.2s ease-in-out',
                position: 'relative'
              }}
            >
              <i className="bi bi-person-fill fs-5"></i>
            </button>
            <button 
              className="nav-link btn btn-link text-center p-2 nav-btn" 
              onClick={() => scrollToSection('skills')}
              data-tooltip={t('skills')}
              style={{ 
                color: 'var(--text-primary)', 
                flex: '1', 
                maxWidth: '60px',
                backgroundColor: 'transparent',
                borderRadius: '12px',
                transition: 'transform 0.2s ease-in-out',
                position: 'relative'
              }}
            >
              <i className="bi bi-gear-fill fs-5"></i>
            </button>
            <button 
              className="nav-link btn btn-link text-center p-2 nav-btn" 
              onClick={() => scrollToSection('projects')}
              data-tooltip={t('projects')}
              style={{ 
                color: 'var(--text-primary)', 
                flex: '1', 
                maxWidth: '60px',
                backgroundColor: 'transparent',
                borderRadius: '12px',
                transition: 'transform 0.2s ease-in-out',
                position: 'relative'
              }}
            >
              <i className="bi bi-folder-fill fs-5"></i>
            </button>
            <button 
              className="nav-link btn btn-link text-center p-2 nav-btn" 
              onClick={() => scrollToSection('experience')}
              data-tooltip={t('experience')}
              style={{ 
                color: 'var(--text-primary)', 
                flex: '1', 
                maxWidth: '60px',
                backgroundColor: 'transparent',
                borderRadius: '12px',
                transition: 'transform 0.2s ease-in-out',
                position: 'relative'
              }}
            >
              <i className="bi bi-briefcase-fill fs-5"></i>
            </button>
            <button 
              className="nav-link btn btn-link text-center p-2 nav-btn" 
              onClick={() => scrollToSection('contact')}
              data-tooltip={t('contact')}
              style={{ 
                color: 'var(--text-primary)', 
                flex: '1', 
                maxWidth: '60px',
                backgroundColor: 'transparent',
                borderRadius: '12px',
                transition: 'transform 0.2s ease-in-out',
                position: 'relative'
              }}
            >
              <i className="bi bi-envelope-fill fs-5"></i>
            </button>
            <button 
              className="nav-link btn btn-link text-center p-2 nav-btn" 
              onClick={toggleTheme}
              data-tooltip={theme === 'light' ? 'Dark' : 'Light'}
              style={{ 
                color: 'var(--text-primary)', 
                flex: '1', 
                maxWidth: '60px',
                backgroundColor: 'transparent',
                borderRadius: '12px',
                transition: 'transform 0.2s ease-in-out',
                position: 'relative'
              }}
            >
              {theme === 'light' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              )}
            </button>
            <button 
              className="nav-link btn btn-link text-center p-2 nav-btn" 
              onClick={toggleLanguage}
              data-tooltip={language === 'en' ? 'ID' : 'EN'}
              style={{ 
                color: 'var(--text-primary)', 
                flex: '1', 
                maxWidth: '60px',
                backgroundColor: 'transparent',
                borderRadius: '12px',
                transition: 'transform 0.2s ease-in-out',
                position: 'relative'
              }}
            >
              <i className="bi bi-globe fs-5"></i>
            </button>
            {user && (
              <>
                <button 
                  className="nav-link btn btn-link text-center p-2 nav-btn" 
                  onClick={() => window.location.href = '/admin'}
                  data-tooltip="Admin"
                  style={{ 
                    color: 'var(--text-primary)', 
                    flex: '1', 
                    maxWidth: '60px',
                    backgroundColor: 'transparent',
                    borderRadius: '12px',
                    transition: 'transform 0.2s ease-in-out',
                    position: 'relative'
                  }}
                >
                  <i className="bi bi-shield-lock-fill fs-5"></i>
                </button>
                <button 
                  className="nav-link btn btn-link text-center p-2 nav-btn" 
                  onClick={signOut}
                  data-tooltip={t('logout')}
                  style={{ 
                    color: 'var(--text-danger)', 
                    flex: '1', 
                    maxWidth: '60px',
                    backgroundColor: 'transparent',
                    borderRadius: '12px',
                    transition: 'transform 0.2s ease-in-out',
                    position: 'relative'
                  }}
                >
                  <i className="bi bi-box-arrow-right fs-5"></i>
                </button>
              </>
            )}
          </div>
        </nav>
      )}
    </>
  )
}

export default Header