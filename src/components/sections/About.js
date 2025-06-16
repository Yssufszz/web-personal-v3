import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../services/supabase'
import { User } from 'lucide-react'

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
      
      if (error) {
        console.error('Supabase error:', error)
        return
      }
      
      if (data) setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <section id="about" style={{
      padding: '4rem 0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          animation: 'fadeIn 1s ease-out'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            color: 'var(--text-gradient)',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>{t('aboutMe')}</h2>
          <div style={{
            width: '80px',
            height: '4px',
            background: 'linear-gradient(135deg, deg, var(--primary), var(--secondary))',
            borderRadius: '2px',
            margin: '0 auto'
          }}></div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div 
            className="profile-card"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '2rem',
              maxWidth: '800px',
              width: '100%',
              boxShadow: '0 8px 32px var(--shadow-color)',
              position: 'relative',
              overflow: 'hidden',
              animation: 'slideUp 0.6s ease-out',
              backdropFilter: 'blur(10px)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '--mouse-x': '50%',
              '--mouse-y': '50%'
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 12px 48px var(--glow-color)'
              const shine = e.currentTarget.querySelector('.shine-effect')
              if (shine) shine.style.opacity = '0.4'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 32px var(--shadow-color)'
              const shine = e.currentTarget.querySelector('.shine-effect')
              if (shine) shine.style.opacity = '0'
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
              position: 'relative',
              zIndex: 2
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                border: '3px solid var(--border-color)'
              }}>
                {profile?.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt="Profile" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                  />
                ) : (
                  <User 
                    size={60}
                    style={{
                      color: 'white',
                      strokeWidth: 1.5
                    }}
                  />
                )}
                <div 
                  className="shine-effect"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    transition: 'left 0.6s ease'
                  }}
                ></div>
              </div>

              <div style={{
                textAlign: 'center',
                color: 'var(--text-color)',
                maxWidth: '600px'
              }}>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: 'var(--text-gradient)',
                  marginBottom: '1rem',
                  fontWeight: 600
                }}>
                  {profile?.name || 'Full-Stack Developer'}
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.6',
                  color: 'var(--text-muted)',
                  marginBottom: '1.5rem'
                }}>
                  {language === 'en' 
                    ? profile?.bio_en || 'I am a passionate full-stack developer with experience in modern web technologies. I enjoy creating efficient and user-friendly applications that solve real-world problems.'
                    : profile?.bio_id || 'Saya adalah seorang full-stack developer yang bersemangat dengan pengalaman dalam teknologi web modern. Saya senang membuat aplikasi yang efisien dan user-friendly yang menyelesaikan masalah dunia nyata.'
                  }
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem'
                }}>
                  <a 
                    href={profile?.linkedin_url || 'https://www.linkedin.com/in/yusuf-s-004752258/'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.5rem 1.5rem',
                      background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                      color: 'white',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)'
                      e.currentTarget.style.boxShadow = '0 4px 12px var(--glow-color)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    LinkedIn
                  </a>
                  <a 
                    href={profile?.github_url || 'https://github.com/Yssufszz'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.5rem 1.5rem',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-color)',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)'
                      e.currentTarget.style.boxShadow = '0 4px 12px var(--glow-color)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
            <div 
              className="spotlight-effect"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle 150px at var(--mouse-x) var(--mouse-y), rgba(0, 212, 255, 0.2), transparent 80%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none',
                zIndex: 1
              }}
            ></div>
          </div>
        </div>
      </div>

      <style>
        {`
          :root {
            --primary: #0066ff;
            --secondary: #00d4ff;
            --bg-section: #f5f7fa;
            --bg-card: rgba(255, 255, 255, 0.8);
            --border-color: rgba(0, 102, 255, 0.2);
            --shadow-color: rgba(0, 0, 0, 0.1);
            --glow-color: rgba(0, 212, 255, 0.3);
            --text-color: #333;
            --text-muted: #6c757d;
            --text-gradient: linear-gradient(135deg, #0066ff, #00d4ff);
          }

          [data-theme="dark"] {
            --bg-section: #0a1f3c;
            --bg-card: rgba(10, 31, 60, 0.9);
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

          @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
          }

          .profile-card:hover {
            animation: glitch 0.3s linear;
          }

          @media (max-width: 768px) {
            h2 {
              font-size: 2rem !important;
            }

            .profile-card {
              padding: 1.5rem !important;
            }

            .profile-image {
              width: 100px !important;
              height: 100px !important;
            }
          }

          @media (max-width: 576px) {
            .profile-card {
              padding: 1rem !important;
            }

            .profile-image {
              width: 80px !important;
              height: 80px !important;
            }

            .social-links a {
              padding: 0.4rem 1rem !important;
              font-size: 0.8rem !important;
            }
          }
        `}
      </style>
    </section>
  )
}

export default About