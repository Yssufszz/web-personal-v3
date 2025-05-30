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
    return (
      <div className="skill-progress-container mb-3">
        <div className="skill-progress-track">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className={`skill-progress-bar ${i < level ? 'filled' : 'empty'}`}
              style={{
                animationDelay: `${i * 0.1}s`
              }}
            >
              <div className="skill-progress-glow"></div>
            </div>
          ))}
        </div>
        <div className="skill-level-text">
          <span className="text-gradient">{level}/5</span>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="loading glow-text">{t('loading')}</div>
      </div>
    )
  }

  return (
    <section id="skills" >
      <div className="container">
        <div className="text-center mb-5 animate-fade-in">
          <h2 className="display-5 text-gradient glow-text mb-3">{t('mySkills')}</h2>
          <div className="underline-gradient mx-auto"></div>
        </div>
        
        <div className="row">
          {skills.length > 0 ? skills.map((skill, index) => (
            <div 
              key={skill.id} 
              className="col-md-6 col-lg-4 mb-4 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card glass-card skill-card h-100">
                <div className="card-body">
                  <div className="skill-header mb-3">
                    <h5 className="card-title text-gradient mb-2">
                      {language === 'en' ? skill.name_en : skill.name_id}
                    </h5>
                    <span className="badge skill-category-badge">
                      {skill.category}
                    </span>
                  </div>
                  
                  {getSkillBars(skill.level)}
                  
                  <div className="skill-description">
                    <small className="lead mb-4">
                      {skill.level === 5 ? 'Expert Level' : 
                       skill.level === 4 ? 'Advanced Level' : 
                       skill.level === 3 ? 'Intermediate Level' : 
                       skill.level === 2 ? 'Basic Level' : 'Beginner Level'}
                    </small>
                  </div>
                </div>
                
                <div className="skill-card-overlay"></div>
              </div>
            </div>
          )) : (
            <div className="col-12 text-center animate-fade-in">
              <div className="glass-card p-5">
                <p className="text-muted mb-0">{t('noData')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .skill-card {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: var(--bg-card);
        }
        
        /* Dark mode specific styling */
        [data-theme="dark"] .skill-card {
          background: rgba(10, 31, 60, 0.95);
          border-color: rgba(0, 102, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 102, 255, 0.2);
        }
        
        [data-theme="dark"] .skill-card:hover {
          background: rgba(15, 40, 80, 0.98);
          box-shadow: 0 20px 40px rgba(0, 212, 255, 0.3);
          border-color: rgba(0, 212, 255, 0.5);
        }
        
        .skill-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
        
        /* Light mode card styling */
        [data-theme="light"] .skill-card {
          background: var(--bg-card);
          border-color: var(--border-color);
          box-shadow: 0 8px 32px var(--shadow-color);
        }
        
        [data-theme="light"] .skill-card:hover {
          box-shadow: 0 20px 40px var(--shadow-color);
        }
        
        .skill-card-overlay {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(0, 212, 255, 0.1), 
            transparent
          );
          transition: left 0.6s ease;
          z-index: 1;
        }
        
        /* Dark mode overlay effect */
        [data-theme="dark"] .skill-card-overlay {
          background: linear-gradient(90deg, 
            transparent, 
            rgba(0, 212, 255, 0.2), 
            transparent
          );
        }
        
        .skill-card:hover .skill-card-overlay {
          left: 100%;
        }
        
        .skill-header {
          position: relative;
          z-index: 2;
        }
        
        .skill-category-badge {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border: none;
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          color: white;
          font-weight: 500;
        }
        
        .skill-progress-container {
          position: relative;
          z-index: 2;
        }
        
        .skill-progress-track {
          display: flex;
          gap: 6px;
          margin-bottom: 8px;
          align-items: center;
        }
        
        .skill-progress-bar {
          width: 32px;
          height: 8px;
          border-radius: 4px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          animation: fadeInScale 0.6s ease-out forwards;
          opacity: 0;
          transform: scale(0.8);
        }
        
        .skill-progress-bar.filled {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          box-shadow: 0 2px 8px var(--glow-color);
        }
        
        .skill-progress-bar.empty {
          background: var(--border-color);
          opacity: 0.3;
        }
        
        .skill-progress-bar.filled:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px var(--glow-color);
        }
        
        .skill-progress-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.4), 
            transparent
          );
          transition: left 0.8s ease;
        }
        
        .skill-progress-bar.filled:hover .skill-progress-glow {
          left: 100%;
        }
        
        .skill-level-text {
          text-align: center;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .skill-description {
          position: relative;
          z-index: 2;
          text-align: center;
          margin-top: 0.5rem;
        }
        
        .underline-gradient {
          width: 60px;
          height: 3px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 2px;
          margin-top: 1rem;
        }
        
        @keyframes fadeInScale {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% { 
            box-shadow: 0 2px 8px var(--glow-color); 
          }
          50% { 
            box-shadow: 0 4px 16px var(--glow-color); 
          }
        }
        
        .skill-progress-bar.filled {
          animation: fadeInScale 0.6s ease-out forwards, 
                     pulseGlow 2s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .skill-progress-bar {
            width: 28px;
            height: 6px;
          }
          
          .display-5 {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 576px) {
          .skill-progress-bar {
            width: 24px;
            height: 5px;
          }
          
          .skill-progress-track {
            gap: 4px;
          }
          
          .card-body {
            padding: 1.25rem;
          }
        }
      `}</style>
    </section>
  )
}

export default Skills