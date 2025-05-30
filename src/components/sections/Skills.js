import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../services/supabase'

const Skills = () => {
  const { language, t } = useLanguage()
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('level', { ascending: false })
      
      if (data) setSkills(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching skills:', error)
      setLoading(false)
    }
  }

  const getSkillBars = (level) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div key={i} className={`bg-${i < level ? 'primary' : 'light'} me-1`} style={{height: '10px', width: '20px', display: 'inline-block'}}></div>
    ))
  }

  if (loading) return <div className="text-center py-5">{t('loading')}</div>

  return (
    <section id="skills" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">{t('mySkills')}</h2>
        <div className="row">
          {skills.length > 0 ? skills.map((skill) => (
            <div key={skill.id} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    {language === 'en' ? skill.name_en : skill.name_id}
                  </h5>
                  <div className="mb-2">
                    {getSkillBars(skill.level)}
                  </div>
                  <small className="text-muted">{skill.category}</small>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-12 text-center">
              <p>{t('noData')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Skills