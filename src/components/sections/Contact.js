import React, { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Instagram, 
  Twitter, 
  Send,
  User,
  MessageSquare,
  ExternalLink
} from 'lucide-react'

const Contact = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Contact form submitted:', formData)
      alert('Message sent successfully!')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Yssufszz',
      color: '#333'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/yssufsz',
      color: '#E4405F'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://x.com/yssufszz?t=QKy9354auXhcM5-8oppx_Q&s=09 ',
      color: '#1DA1F2'
    },
    {
      name: 'TikTok',
      icon: () => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      url: 'https://www.tiktok.com/@yssfsz?_t=ZS-8wnLia6m4o8&_r=1',
      color: '#000'
    }
  ]

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'ysuf2303@gmail.com',
      link: 'mailto:ysuf2303@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+62 812-3456-7890',
      link: 'tel:+6281234567890'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Bandung, Indonesia',
      link: 'https://maps.app.goo.gl/Bq3StLbA3V5qckb78'
    }
  ]

  return (
    <section id="contact" className="py-5" style={{ minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 animate-fade-in">
          <h2 className="display-5 mb-3 text-gradient glow-text">
            {t('contactMe') || 'Get In Touch'}
          </h2>
          <p className="lead" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            {t('contactDetails')}
          </p>
        </div>

        <div className="row g-4">
          {/* Contact Information */}
          <div className="col-lg-5">
            <div className="glass-card p-4 h-100 animate-slide-up">
              <h3 className="h4 mb-4 text-gradient">{t('letsConnect')}</h3>
              
              {/* Contact Info Cards */}
              <div className="mb-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="d-flex align-items-center mb-3 p-3 rounded-3"
                       style={{ 
                         background: 'var(--bg-secondary)',
                         border: '1px solid var(--border-color)',
                         transition: 'all 0.3s ease'
                       }}
                       onMouseEnter={(e) => {
                         e.target.style.transform = 'translateX(5px)'
                         e.target.style.borderColor = 'var(--primary)'
                       }}
                       onMouseLeave={(e) => {
                         e.target.style.transform = 'translateX(0)'
                         e.target.style.borderColor = 'var(--border-color)'
                       }}>
                    <div className="me-3 d-flex align-items-center justify-content-center"
                         style={{
                           width: '40px',
                           height: '40px',
                           background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                           borderRadius: '50%',
                           color: 'white'
                         }}>
                      <info.icon size={18} />
                    </div>
                    <div>
                      <div className="fw-semibold" style={{ color: 'var(--text-primary)' }}>
                        {info.title}
                      </div>
                      <a href={info.link} 
                         style={{ 
                           color: 'var(--text-secondary)', 
                           textDecoration: 'none',
                           fontSize: '0.9rem'
                         }}
                         onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                         onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media Links */}
              <div className="mt-4">
                <h4 className="h6 mb-3" style={{ color: 'var(--text-primary)' }}>{t('followMe')}</h4>
                <div className="d-flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a key={index}
                       href={social.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="d-flex align-items-center justify-content-center"
                       style={{
                         width: '45px',
                         height: '45px',
                         background: 'var(--bg-secondary)',
                         border: '2px solid var(--border-color)',
                         borderRadius: '50%',
                         color: 'var(--text-secondary)',
                         textDecoration: 'none',
                         transition: 'all 0.3s ease'
                       }}
                       onMouseEnter={(e) => {
                         e.target.style.transform = 'translateY(-3px) scale(1.05)'
                         e.target.style.borderColor = 'var(--primary)'
                         e.target.style.color = 'var(--primary)'
                         e.target.style.boxShadow = '0 5px 15px var(--glow-color)'
                       }}
                       onMouseLeave={(e) => {
                         e.target.style.transform = 'translateY(0) scale(1)'
                         e.target.style.borderColor = 'var(--border-color)'
                         e.target.style.color = 'var(--text-secondary)'
                         e.target.style.boxShadow = 'none'
                       }}>
                      {typeof social.icon === 'function' ? (
                        <social.icon />
                      ) : (
                        <social.icon size={20} />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="glass-card p-4 animate-slide-up">
              <div onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Name Field */}
                  <div className="col-md-6">
                    <div className="form-label d-flex align-items-center mb-2">
                      <User size={16} className="me-2" style={{ color: 'var(--primary)' }} />
                      <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                        {t('name') || 'Full Name'}
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t('enterYourName')}
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '2px solid var(--border-color)',
                        borderRadius: 'var(--border-radius)',
                        color: 'var(--text-primary)',
                        padding: '0.75rem 1rem',
                        width: '100%',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary)'
                        e.target.style.boxShadow = '0 0 0 0.2rem var(--glow-color)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--border-color)'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  </div>

                  {/* Email Field */}
                  <div className="col-md-6">
                    <div className="form-label d-flex align-items-center mb-2">
                      <Mail size={16} className="me-2" style={{ color: 'var(--primary)' }} />
                      <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                        {t('email') || 'Email Address'}
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t('enterYourEmail')}
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '2px solid var(--border-color)',
                        borderRadius: 'var(--border-radius)',
                        color: 'var(--text-primary)',
                        padding: '0.75rem 1rem',
                        width: '100%',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary)'
                        e.target.style.boxShadow = '0 0 0 0.2rem var(--glow-color)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--border-color)'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  </div>

                  {/* Message Field */}
                  <div className="col-12">
                    <div className="form-label d-flex align-items-center mb-2">
                      <MessageSquare size={16} className="me-2" style={{ color: 'var(--primary)' }} />
                      <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                        {t('message') || 'Message'}
                      </span>
                    </div>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder={t('tellUsAboutYourProject')}
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '2px solid var(--border-color)',
                        borderRadius: 'var(--border-radius)',
                        color: 'var(--text-primary)',
                        padding: '0.75rem 1rem',
                        resize: 'vertical',
                        minHeight: '120px',
                        width: '100%',
                        transition: 'all 0.3s ease',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary)'
                        e.target.style.boxShadow = '0 0 0 0.2rem var(--glow-color)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--border-color)'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="col-12">
                    <button 
                      type="button"
                      onClick={handleSubmit}
                      className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center"
                      disabled={isSubmitting}
                      style={{
                        background: isSubmitting 
                          ? 'var(--text-secondary)' 
                          : 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        border: 'none',
                        borderRadius: '50px',
                        padding: '1rem 2rem',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        color: 'white',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.target.style.transform = 'translateY(-2px)'
                          e.target.style.boxShadow = '0 8px 25px var(--glow-color)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) {
                          e.target.style.transform = 'translateY(0)'
                          e.target.style.boxShadow = '0 4px 15px var(--glow-color)'
                        }
                      }}>
                      {isSubmitting ? (
                        <>
                          <div className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          {t('loading') || 'Sending...'}
                        </>
                      ) : (
                        <>
                          <Send size={18} className="me-2" />
                          {t('send') || 'Send Message'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact