import React, { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../services/supabase'

const Experience = () => {
  const { language, t } = useLanguage()
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedExp, setSelectedExp] = useState(null)
  const [visibleCards, setVisibleCards] = useState(new Set())
  const [isDarkMode, setIsDarkMode] = useState(false)
  const observerRef = useRef()

  useEffect(() => {
    fetchExperiences()
    setupIntersectionObserver()
    checkTheme()
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    })
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      observer.disconnect()
    }
  }, [])

  const checkTheme = () => {
    const theme = document.documentElement.getAttribute('data-theme')
    setIsDarkMode(theme === 'dark')
  }

  const setupIntersectionObserver = () => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, entry.target.dataset.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )
  }

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false })
      
      if (data) {
        setExperiences(data)
        // Auto-select first experience
        if (data.length > 0) setSelectedExp(data[0])
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching experiences:', error)
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return t('present')
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', { 
      year: 'numeric', 
      month: 'short' 
    })
  }

  const calculateDuration = (startDate, endDate, isCurrent) => {
    const start = new Date(startDate)
    const end = isCurrent ? new Date() : new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
    
    if (diffMonths < 12) {
      return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'}`
    } else {
      const years = Math.floor(diffMonths / 12)
      const months = diffMonths % 12
      return `${years} ${years === 1 ? 'year' : 'years'}${months > 0 ? ` ${months} ${months === 1 ? 'month' : 'months'}` : ''}`
    }
  }

  const handleCardRef = (el, id) => {
    if (el && observerRef.current) {
      el.dataset.id = id
      observerRef.current.observe(el)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="loading">
          <div className="d-inline-block p-4 glass-effect rounded-circle">
            <div className="spinner-border text-gradient" role="status">
              <span className="visually-hidden">{t('loading')}</span>
            </div>
          </div>
          <p className="mt-3 text-gradient glow-text">{t('loading')} Experience...</p>
        </div>
      </div>
    )
  }

  return (
    <section id="experience" className="py-5 position-relative">
      {/* Animated Background Elements */}
      <div className="position-absolute w-100 h-100" style={{ top: 0, left: 0, zIndex: -1 }}>
        <div 
          className="position-absolute rounded-circle" 
          style={{
            width: '300px',
            height: '300px',
            background: isDarkMode 
              ? 'radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0, 102, 255, 0.3) 0%, transparent 70%)',
            top: '10%',
            right: '5%',
            animation: 'floatingOrbs 20s ease-in-out infinite',
            opacity: 0.1
          }}
        ></div>
        <div 
          className="position-absolute rounded-circle" 
          style={{
            width: '200px',
            height: '200px',
            background: isDarkMode
              ? 'radial-gradient(circle, rgba(0, 102, 255, 0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
            bottom: '15%',
            left: '8%',
            animation: 'floatingOrbs 25s ease-in-out infinite reverse',
            opacity: 0.1
          }}
        ></div>
      </div>

      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5 animate-fade-in">
          <h2 className="display-5 text-gradient glow-text mb-3">
            {t('myExperience')}
          </h2>
          <div className="mx-auto" style={{ width: '60px', height: '4px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: '2px' }}></div>
          <p className="lead mt-3" style={{ color: 'var(--text-secondary)' }}>
            {t('exploreMyExperience')}
          </p>
        </div>

        {experiences.length > 0 ? (
          <div className="row g-4">
            {/* Timeline Column */}
            <div className="col-lg-8">
              <div className="position-relative">
                {/* Timeline Line */}
                <div 
                  className="position-absolute start-0 top-0 bottom-0"
                  style={{
                    width: '3px',
                    background: 'linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent))',
                    borderRadius: '2px',
                    left: '30px'
                  }}
                ></div>

                {experiences.map((exp, index) => (
                  <div 
                    key={exp.id}
                    ref={(el) => handleCardRef(el, exp.id)}
                    className={`position-relative mb-4 ${visibleCards.has(exp.id.toString()) ? 'animate-slide-up' : ''}`}
                    style={{ 
                      paddingLeft: '80px',
                      animationDelay: `${index * 0.2}s`,
                      opacity: visibleCards.has(exp.id.toString()) ? 1 : 0
                    }}
                  >
                    {/* Timeline Dot */}
                    <div 
                      className="position-absolute d-flex align-items-center justify-content-center glass-effect rounded-circle"
                      style={{
                        width: '60px',
                        height: '60px',
                        left: '0',
                        top: '20px',
                        background: exp.is_current 
                          ? 'linear-gradient(135deg, var(--primary), var(--secondary))' 
                          : 'var(--bg-card)',
                        border: `3px solid var(--primary)`,
                        cursor: 'pointer',
                        transition: 'all var(--transition-speed) ease',
                        transform: selectedExp?.id === exp.id ? 'scale(1.1)' : 'scale(1)',
                        zIndex: 2,
                        boxShadow: selectedExp?.id === exp.id 
                          ? '0 0 30px var(--glow-color)' 
                          : '0 8px 32px var(--shadow-color)'
                      }}
                      onClick={() => setSelectedExp(exp)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.15)'
                        e.currentTarget.style.boxShadow = '0 0 30px var(--glow-color)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = selectedExp?.id === exp.id ? 'scale(1.1)' : 'scale(1)'
                        e.currentTarget.style.boxShadow = selectedExp?.id === exp.id 
                          ? '0 0 30px var(--glow-color)' 
                          : '0 8px 32px var(--shadow-color)'
                      }}
                    >
                      {exp.is_current ? (
                        <div className="text-white fw-bold" style={{ fontSize: '12px' }}>NOW</div>
                      ) : (
                        <div 
                          className="rounded-circle"
                          style={{
                            width: '12px',
                            height: '12px',
                            background: 'linear-gradient(135deg, var(--primary), var(--secondary))'
                          }}
                        ></div>
                      )}
                    </div>

                    {/* Experience Card */}
                    <div 
                      className={`card glass-effect h-100`}
                      style={{
                        cursor: 'pointer',
                        transition: 'all var(--transition-speed) ease',
                        transform: selectedExp?.id === exp.id ? 'translateX(10px)' : 'translateX(0)',
                        borderWidth: selectedExp?.id === exp.id ? '2px' : '1px',
                        borderColor: selectedExp?.id === exp.id ? 'var(--primary)' : 'var(--border-color)',
                        background: 'var(--bg-card)',
                        color: 'var(--text-primary)',
                        boxShadow: selectedExp?.id === exp.id 
                          ? '0 20px 40px var(--shadow-color), 0 0 20px var(--glow-color)' 
                          : '0 8px 32px var(--shadow-color)'
                      }}
                      onClick={() => setSelectedExp(exp)}
                      onMouseEnter={(e) => {
                        if (selectedExp?.id !== exp.id) {
                          e.currentTarget.style.transform = 'translateX(5px) translateY(-5px)'
                          e.currentTarget.style.boxShadow = '0 20px 40px var(--shadow-color)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = selectedExp?.id === exp.id ? 'translateX(10px)' : 'translateX(0)'
                        e.currentTarget.style.boxShadow = selectedExp?.id === exp.id 
                          ? '0 20px 40px var(--shadow-color), 0 0 20px var(--glow-color)' 
                          : '0 8px 32px var(--shadow-color)'
                      }}
                    >
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="flex-grow-1">
                            <h5 className="card-title text-gradient mb-2">
                              {language === 'en' ? exp.position_en : exp.position_id}
                            </h5>
                            <h6 className="card-subtitle mb-2" style={{ color: 'var(--text-secondary)' }}>
                              {language === 'en' ? exp.company_en : exp.company_id}
                            </h6>
                          </div>
                          {exp.is_current && (
                            <span 
                              className="badge"
                              style={{
                                background: isDarkMode 
                                  ? 'linear-gradient(135deg, #00ff88, #00d4ff)'
                                  : 'linear-gradient(135deg, #00d4ff, #0066ff)',
                                animation: 'pulse 2s ease-in-out infinite',
                                color: 'white'
                              }}
                            >
                              Current
                            </span>
                          )}
                        </div>
                        
                        <div className="mb-3">
                          <small className="d-block" style={{ color: 'var(--text-secondary)' }}>
                            <i className="fas fa-calendar-alt me-2"></i>
                            {formatDate(exp.start_date)} - {exp.is_current ? t('present') : formatDate(exp.end_date)}
                          </small>
                          <small style={{ color: 'var(--primary)' }}>
                            <i className="fas fa-clock me-2"></i>
                            {calculateDuration(exp.start_date, exp.end_date, exp.is_current)}
                          </small>
                        </div>

                        <p className="card-text" style={{ color: 'var(--text-secondary)' }}>
                          {language === 'en' ? exp.description_en : exp.description_id}
                        </p>

                        {/* Skills or Technologies */}
                        {exp.technologies && (
                          <div className="mt-3">
                            <small className="mb-2 d-block" style={{ color: 'var(--text-secondary)' }}>Technologies:</small>
                            <div className="d-flex flex-wrap gap-1">
                              {exp.technologies.split(',').map((tech, idx) => (
                                <span 
                                  key={idx} 
                                  className="badge"
                                  style={{
                                    background: isDarkMode 
                                      ? 'rgba(0, 212, 255, 0.2)' 
                                      : 'rgba(0, 102, 255, 0.1)',
                                    color: 'var(--primary)',
                                    border: `1px solid var(--primary)`
                                  }}
                                >
                                  {tech.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detail Panel */}
            <div className="col-lg-4">
              <div className="position-sticky" style={{ top: '100px' }}>
                {selectedExp && (
                  <div className="card glass-effect animate-fade-in" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
                    <div className="card-header border-0 pb-0" style={{ background: 'transparent', borderColor: 'var(--border-color)' }}>
                      <h5 className="text-gradient glow-text">{t('experienceDetails')}</h5>
                    </div>
                    <div className="card-body">
                      <div className="text-center mb-4">
                        <div 
                          className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3"
                          style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                          }}
                        >
                          <i className="fas fa-briefcase text-white fs-4"></i>
                        </div>
                        <h6 className="text-gradient">
                          {language === 'en' ? selectedExp.position_en : selectedExp.position_id}
                        </h6>
                        <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
                          {language === 'en' ? selectedExp.company_en : selectedExp.company_id}
                        </p>
                      </div>

                      <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <small style={{ color: 'var(--text-secondary)' }}>Duration</small>
                          <small className="fw-bold" style={{ color: 'var(--primary)' }}>
                            {calculateDuration(selectedExp.start_date, selectedExp.end_date, selectedExp.is_current)}
                          </small>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <small style={{ color: 'var(--text-secondary)' }}>Period</small>
                          <small style={{ color: 'var(--text-secondary)' }}>
                            {formatDate(selectedExp.start_date)} - {selectedExp.is_current ? 'Present' : formatDate(selectedExp.end_date)}
                          </small>
                        </div>

                        {selectedExp.is_current && (
                          <div className="text-center mt-3">
                            <span 
                              className="badge px-3 py-2"
                              style={{
                                background: isDarkMode 
                                  ? 'linear-gradient(135deg, #00ff88, #00d4ff)'
                                  : 'linear-gradient(135deg, #00d4ff, #0066ff)',
                                fontSize: '0.8rem',
                                color: 'white'
                              }}
                            >
                              <i className="fas fa-circle me-2" style={{ fontSize: '0.6rem' }}></i>
                              {t('current')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Summary Card */}
                <div className="card glass-effect mt-4" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
                  <div className="card-body text-center">
                    <h6 className="text-gradient mb-3">{t('careerSumarry')}</h6>
                    <div className="row g-3">
                      <div className="col-6">
                        <div className="text-center">
                          <div className="h4 mb-1" style={{ color: 'var(--primary)' }}>{experiences.length}</div>
                          <small style={{ color: 'var(--text-secondary)' }}>{t('positions')}</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="text-center">
                          <div className="h4 mb-1" style={{ color: 'var(--secondary)' }}>
                            {Math.floor(experiences.reduce((total, exp) => {
                              const duration = calculateDuration(exp.start_date, exp.end_date, exp.is_current)
                              const years = duration.includes('year') ? parseInt(duration.split(' ')[0]) : 0
                              return total + years
                            }, 0))}+
                          </div>
                          <small style={{ color: 'var(--text-secondary)' }}>{t('years')}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="glass-card p-5 mx-auto" style={{ maxWidth: '400px', background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
              <i className="fas fa-briefcase mb-3" style={{ fontSize: '3rem', color: 'var(--text-secondary)' }}></i>
              <h5 className="text-gradient">{t('noData')}</h5>
              <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>Experience data will be displayed here once available.</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .timeline-dot:hover {
          animation: pulse 1s ease-in-out infinite;
        }
        
        .card:hover {
          box-shadow: 0 20px 40px var(--shadow-color) !important;
        }
        
        .position-sticky {
          position: -webkit-sticky !important;
          position: sticky !important;
        }
      `}</style>
    </section>
  )
}

export default Experience