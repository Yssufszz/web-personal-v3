import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../services/supabase'

const Home = () => {
  const { language, t } = useLanguage()
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .single()
      
      if (data) setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="home">
      <div className="container">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-8 col-md-7">
            <div className="animate-slide-up">
              <h1 className="display-4 glow-text mb-3">
                {t('hello')}
              </h1>
              <h2 className="display-5 text-gradient mb-4">
                {isLoading ? (
                  <span className="loading">Loading...</span>
                ) : (
                  profile?.full_name || 'Your Name'
                )}
              </h2>
              <p className="lead mb-4">
                {t('developer')}
              </p>
            </div>
          </div>
          
          <div className="col-lg-4 col-md-5 text-center">
            <div className="animate-fade-in">
              {isLoading ? (
                <div className="glass-card p-4 rounded-circle d-inline-block loading" 
                     style={{ width: '250px', height: '250px' }}>
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <span className="text-muted">Loading...</span>
                  </div>
                </div>
              ) : profile?.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt="Profile" 
                  className="profile-image rounded-circle img-fluid"
                  style={{ maxWidth: '250px', width: '100%', height: '250px', objectFit: 'cover' }}
                />
              ) : (
                <div className="glass-card rounded-circle d-inline-flex align-items-center justify-content-center"
                     style={{ width: '250px', height: '250px' }}>
                  <i className="fas fa-user fa-5x text-gradient"></i>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home