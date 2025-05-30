import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../services/supabase'

const Experience = () => {
  const { language, t } = useLanguage()
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false })
      
      if (data) setExperiences(data)
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
      month: 'long' 
    })
  }

  if (loading) return <div className="text-center py-5">{t('loading')}</div>

  return (
    <section id="experience" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">{t('myExperience')}</h2>
        <div className="row">
          <div className="col-lg-8 mx-auto">
            {experiences.length > 0 ? experiences.map((exp) => (
              <div key={exp.id} className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h5 className="card-title">
                        {language === 'en' ? exp.position_en : exp.position_id}
                      </h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {language === 'en' ? exp.company_en : exp.company_id}
                      </h6>
                      <p className="card-text">
                        {language === 'en' ? exp.description_en : exp.description_id}
                      </p>
                    </div>
                    <div className="col-md-4 text-md-end">
                      <small className="text-muted">
                        {formatDate(exp.start_date)} - {exp.is_current ? t('present') : formatDate(exp.end_date)}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center">
                <p>{t('noData')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience