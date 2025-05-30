import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../contexts/AuthContext'

const Header = () => {
  const { language, t, toggleLanguage } = useLanguage()
  const { user, signInWithGitHub, signOut } = useAuth()

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>
          Portfolio
        </a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('home')}>
                {t('home')}
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('about')}>
                {t('about')}
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('skills')}>
                {t('skills')}
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('projects')}>
                {t('projects')}
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('experience')}>
                {t('experience')}
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('contact')}>
                {t('contact')}
              </button>
            </li>
          </ul>
          
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-secondary btn-sm me-2" onClick={toggleLanguage}>
              {language === 'en' ? 'ID' : 'EN'}
            </button>
            
            {user ? (
              <div className="d-flex align-items-center">
                <span className="me-2">{user.user_metadata?.full_name}</span>
                <button className="btn btn-outline-danger btn-sm" onClick={signOut}>
                  {t('logout')}
                </button>
              </div>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={signInWithGitHub}>
                {t('loginWithGitHub')}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header