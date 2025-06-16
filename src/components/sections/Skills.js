import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../services/supabase'
import { FolderOpen } from 'lucide-react'

const Skills = () => {
  const { language, t } = useLanguage()
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState(null)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const { data } = await supabase
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
      <div style={{
        marginBottom: '1rem',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          display: 'flex',
          gap: '6px',
          marginBottom: '8px',
          alignItems: 'center'
        }}>
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              style={{
                width: '32px',
                height: '8px',
                borderRadius: '4px',
                position: 'relative',
                overflow: 'hidden',
                background: i < level 
                  ? 'linear-gradient(135deg, var(--primary), var(--secondary))'
                  : 'var(--border-color)',
                boxShadow: i < level ? '0 2px 8px var(--glow-color)' : 'none',
                opacity: i < level ? 1 : 0.3,
                animation: 'fadeInScale 0.6s ease-out forwards',
                animationDelay: `${i * 0.1}s`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (i < level) {
                  e.currentTarget.style.transform = 'scale(1.1)'
                  e.currentTarget.style.boxShadow = '0 4px 12px var(--glow-color)'
                }
              }}
              onMouseLeave={(e) => {
                if (i < level) {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = '0 2px 8px var(--glow-color)'
                }
              }}
            >
              {i < level && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                  transition: 'left 0.8s ease'
                }}></div>
              )}
            </div>
          ))}
        </div>
        <div style={{
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '0.9rem',
          color: 'var(--text-gradient)'
        }}>
          {level}/5
        </div>
      </div>
    )
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
    setSelectedSkill(null)
  }

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill)
  }

  if (loading) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem 0',
        color: 'var(--text-color)',
        fontSize: '1.2rem'
      }}>
        <div>{t('loading')}</div>
      </div>
    )
  }

  return (
    <section id="skills" style={{
      padding: '3rem 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
          animation: 'fadeIn 1s ease-out'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            color: 'var(--text-gradient)',
            marginBottom: '1rem',
            fontWeight: 700
          }}>{t('mySkills')}</h2>
          <div style={{
            width: '60px',
            height: '3px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            borderRadius: '2px',
            margin: '0 auto'
          }}></div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div 
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              width: '100%',
              maxWidth: '400px',
              position: 'relative',
              boxShadow: '0 4px 16px var(--shadow-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              overflow: 'hidden'
            }}
            onClick={toggleModal}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 8px 24px var(--glow-color)'
              const shine = e.currentTarget.querySelector('.shine-effect')
              if (shine) shine.style.left = '100%'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 16px var(--shadow-color)'
              const shine = e.currentTarget.querySelector('.shine-effect')
              if (shine) shine.style.left = '-100%'
            }}
          >
            <FolderOpen 
              size={24}
              style={{
                color: 'var(--text-gradient)',
                strokeWidth: 2,
                transition: 'transform 0.3s ease',
              }}
              className="icon"
            />
            <span style={{
              fontSize: '1.2rem',
              color: 'var(--text-color)',
              fontWeight: 500,
              transition: 'color 0.3s ease'
            }}>
              {t('clickSkillsToView')}
            </span>
            <div 
              className="shine-effect"
              style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                transition: 'left 0.6s ease',
                zIndex: 1
              }}
            ></div>
          </div>
        </div>

        {isModalOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div style={{
              background: 'var(--bg-card)',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 8px 32px var(--shadow-color)',
              animation: 'slideUp 0.4s ease-out'
            }}>
              <button 
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  color: 'var(--text-color)',
                  cursor: 'pointer'
                }}
                onClick={toggleModal}
              >
                ✕
              </button>

              <h3 style={{
                color: 'var(--text-gradient)',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>{t('clickToViewDetailSkills')}</h3>

              {!selectedSkill ? (
                <ul style={{
                  listStyle: 'none',
                  padding: 0
                }}>
                  {skills.length > 0 ? skills.map((skill, index) => (
                    <li 
                      key={skill.id}
                      style={{
                        padding: '0.75rem 1rem',
                        marginBottom: '0.5rem',
                        background: '#fff',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        animation: 'fadeInRight 0.3s ease-out',
                        animationDelay: `${index * 0.1}s`,
                        border: '1px solid var(--border-color)'
                      }}
                      onClick={() => handleSkillSelect(skill)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(90deg, rgba(0, 212, 255, 0.1), transparent)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      {language === 'en' ? skill.name_en : skill.name_id} - {skill.category}
                    </li>
                  )) : (
                    <p style={{
                      textAlign: 'center',
                      color: 'var(--text-muted)'
                    }}>{t('noData')}</p>
                  )}
                </ul>
              ) : (
                <div style={{
                  animation: 'fadeIn 0.4s ease-out'
                }}>
                  <div style={{
                    background: 'var(--bg-card)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 4px 16px var(--shadow-color)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      <h5 style={{
                        color: 'var(--text-gradient)',
                        margin: 0,
                        fontSize: '1.25rem'
                      }}>
                        {language === 'en' ? selectedSkill.name_en : selectedSkill.name_id}
                      </h5>
                      <span style={{
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 500
                      }}>
                        {selectedSkill.category}
                      </span>
                    </div>

                    {getSkillBars(selectedSkill.level)}

                    <div style={{
                      textAlign: 'center',
                      color: 'var(--text-color)',
                      fontSize: '0.9rem',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      {selectedSkill.level === 5 ? 'Expert Level' : 
                       selectedSkill.level === 4 ? 'Advanced Level' : 
                       selectedSkill.level === 3 ? 'Intermediate Level' : 
                       selectedSkill.level === 2 ? 'Basic Level' : 'Beginner Level'}
                    </div>

                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent)',
                      transition: 'left 0.6s ease',
                      zIndex: 1
                    }}></div>
                  </div>
                  <button 
                    style={{
                      display: 'block',
                      margin: '1rem auto 0',
                      padding: '0.5rem 1rem',
                      background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                    onClick={() => setSelectedSkill(null)}
                  >
                    {t('<')}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          :root {
            --primary: #0066ff;
            --secondary: #00d4ff;
            --bg-section: #f5f7fa;
            --bg-card: rgba(255, 255, 255, 0.9);
            --border-color: rgba(0, 102, 255, 0.2);
            --shadow-color: rgba(0, 0, 0, 0.1);
            --glow-color: rgba(0, 212, 255, 0.3);
            --text-color: #333;
            --text-muted: #6c757d;
            --text-gradient: linear-gradient(135deg, #0066ff, #00d4ff);
          }

          [data-theme="dark"] {
            --bg-section: #0a1f3c;
            --bg-card: rgba(10, 31, 60, 0.95);
            --border-color: rgba(0, 102, 255, 0.3);
            --shadow-color: rgba(0, 0, 0, 0.3);
            --glow-color: rgba(0, 212, 255, 0.4);
            --text-color: #e0e0e0;
            --text-muted: #a0a0a0;
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @keyframes fadeInScale {
            to { opacity: 1; transform: scale(1); }
          }

          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
          }

          .icon:hover {
            transform: rotate(5deg);
          }

          @media (max-width: 768px) {
            h2 {
              font-size: 2rem !important;
            }

            .skill-progress-bar {
              width: 28px !important;
              height: 6px !important;
            }

            .skill-progress-track {
              gap: 4px !important;
            }
          }

          @media (max-width: 576px) {
            .skill-progress-bar {
              width: 24px !important;
              height: 5px !important;
            }

            .modal-content {
              padding: 1.5rem !important;
            }
          }
        `}
      </style>
    </section>
  )
}

export default Skills