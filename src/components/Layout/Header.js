import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../contexts/AuthContext'

const Header = () => {
  const { language, t, toggleLanguage } = useLanguage()
  const { user, signOut } = useAuth() // Hapus signInWithGitHub
  const location = useLocation()
  const isAdminPage = location.pathname === '/admin'

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Portfolio
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          {!isAdminPage && (
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
          )}
          
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-secondary btn-sm me-2" onClick={toggleLanguage}>
              {language === 'en' ? 'ID' : 'EN'}
            </button>
            
            {/* Hanya tampilkan navigasi admin jika user sudah login */}
            {user && (
              <div className="d-flex align-items-center">
                <span className="me-2">{user.user_metadata?.full_name}</span>
                <Link to="/admin" className="btn btn-outline-primary btn-sm me-2">
                  Admin
                </Link>
                <Link to="/" className="btn btn-outline-secondary btn-sm me-2">
                  Site
                </Link>
                <button className="btn btn-outline-danger btn-sm" onClick={signOut}>
                  {t('logout')}
                </button>
              </div>
            )}
            {/* Button login dihapus */}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header