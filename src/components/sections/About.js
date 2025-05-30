import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../services/supabase'

const About = () => {
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
    <section id="about" className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h2 className="text-center mb-4 animate-fade-in">{t('aboutMe')}</h2>
            <div className="card glass-effect animate-slide-up">
              <div className="card-body">
                <p className="card-text">
                  {language === 'en' 
                    ? profile?.bio_en || 'I am a passionate full-stack developer with experience in modern web technologies. I enjoy creating efficient and user-friendly applications that solve real-world problems.'
                    : profile?.bio_id || 'Saya adalah seorang full-stack developer yang bersemangat dengan pengalaman dalam teknologi web modern. Saya senang membuat aplikasi yang efisien dan user-friendly yang menyelesaikan masalah dunia nyata.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About