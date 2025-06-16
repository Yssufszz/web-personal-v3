import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Instagram, 
  Twitter, 
  Send,
  User,
  MessageSquare
} from 'lucide-react';
import './css/Contact.css';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Contact form submitted:', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      url: 'https://x.com/yssufszz?t=QKy9354auXhcM5-8oppx_Q&s=09',
      color: '#1DA1F2'
    },
    {
      name: 'TikTok',
      icon: () => (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="contactYssfsz-tiktok-icon">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-..05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      url: 'https://www.tiktok.com/@yssfsz?_t=ZS-8wnLia6m4o8&_r=1',
      color: '#000'
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title:<h4 className="h6 mb-3"> Email</h4>,
      value: 'ysuf2303@gmail.com',
      link: 'mailto:ysuf2303@gmail.com'
    },
    {
      icon: Phone,
      title:<h4 className="h6 mb-3">Phone</h4> ,
      value: '+62 85723494016',
      link: 'tel:+6285723494016'
    },
    {
      icon: MapPin,
      title:<h4 className="h6 mb-3">Location</h4> ,
      value: 'Bandung, Indonesia',
      link: 'https://maps.app.goo.gl/Bq3StLbA3V5qckb78'
    }
  ];

  return (
    <section id="contact" >
      <div className="contactYssfsz-container">
        <div className="contactYssfsz-header text-center mb-5">
          <h2 className="display-5 mb-3 contactYssfsz-text-gradient contactYssfsz-glow-text">
            {t('contactMe') || 'Get In Touch'}
          </h2>
          <p className="lead">
            {t('contactDetails') || 'Feel free to reach out through any of these channels.'}
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-5">
            <div className="contactYssfsz-glass-card p-4 h-100">
              <h3 className="h4 mb-4 contactYssfsz-text-gradient">{t('letsConnect') || "Let's Connect"}</h3>
              
              <div className="mb-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contactYssfsz-contact-info-card">
                    <div className="contactYssfsz-icon-wrapper">
                      <info.icon size={20} />
                    </div>
                    <div>
                      <div className="fw-semibold">{info.title}</div>
                      <a href={info.link} className="contactYssfsz-contact-link">
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <h4 className="h6 mb-3">{t('followMe') || 'Follow Me'}</h4>
                <div className="contactYssfsz-social-links">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contactYssfsz-social-icon"
                      style={{ '--social-color': social.color }}
                    >
                      {typeof social.icon === 'function' ? (
                        <social.icon />
                      ) : (
                        <social.icon size={24} />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="contactYssfsz-glass-card p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="contactYssfsz-form-label">
                      <User size={18} className="me-2" />
                      <span>{t('name') || 'Full Name'}</span>
                    </div>
                    <input
                      type="text"
                      className="contactYssfsz-form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t('enterYourName') || 'Enter your name'}
                    />
                  </div>

                  <div className="col-md-6">
                    <div className="contactYssfsz-form-label">
                      <Mail size={18} className="me-2" />
                      <span>{t('email') || 'Email Address'}</span>
                    </div>
                    <input
                      type="email"
                      className="contactYssfsz-form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t('enterYourEmail') || 'Enter your email'}
                    />
                  </div>

                  <div className="col-12">
                    <div className="contactYssfsz-form-label">
                      <MessageSquare size={18} className="me-2" />
                      <span>{t('message') || 'Message'}</span>
                    </div>
                    <textarea
                      className="contactYssfsz-form-control"
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder={t('tellUsAboutYourProject') || 'Tell us about your project'}
                    />
                  </div>

                  <div className="col-12">
                    <button 
                      type="submit"
                      className="contactYssfsz-btn-primary btn-lg w-100"
                      disabled={isSubmitting}
                    >
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;