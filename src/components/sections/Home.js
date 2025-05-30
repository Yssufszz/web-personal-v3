import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../services/supabase'

const Home = () => {
  const { language, t } = useLanguage()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .single()
      
      if (data) setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  return (
    <section id="home" className="py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h1 className="display-4">{t('hello')}</h1>
            <h2 className="display-5 text-primary">
              {profile?.full_name || 'Your Name'}
            </h2>
            <p className="lead">{t('developer')}</p>
          </div>
          <div className="col-md-4 text-center">
            {profile?.avatar_url && (
              <img 
                src={profile.avatar_url} 
                alt="Profile" 
                className="img-fluid rounded-circle"
                style={{ maxWidth: '250px' }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home