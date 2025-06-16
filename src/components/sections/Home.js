import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { supabase } from '../../services/supabase';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const { t } = useLanguage();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .single();
      
      if (data) setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="home" className="position-relative">
      {/* Particle Effects */}
      <div className="home-particles">
        <div className="home-particle home-particle-1"></div>
        <div className="home-particle home-particle-2"></div>
        <div className="home-particle home-particle-3"></div>
        <div className="home-particle home-particle-4"></div>
        <div className="home-particle home-particle-5"></div>
      </div>

      <div className="container">
        <div className="row align-items-center" style={{ minHeight: 'auto', height: 'fit-content' }}> {/* Replaced min-vh-75 with fit-content */}
          <div className="col-lg-8 col-md-7 mb-4 mb-md-0">
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
                  className="profile-image rounded-circle img-fluid shadow-lg"
                  style={{ maxWidth: '250px', width: '100%', height: '250px', objectFit: 'cover' }}
                />
              ) : (
                <div className="glass-card rounded-circle d-inline-flex align-items-center justify-content-center shadow-lg"
                     style={{ width: '250px', height: '250px' }}>
                  <i className="fas fa-user fa-5x text-gradient"></i>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --home-primary: #6366f1;
          --home-secondary: #8b5cf6;
          --home-accent: #06b6d4;
          --home-bg-card: rgba(30, 41, 59, 0.5);
          --home-text-primary: #f1f5f9;
          --home-text-secondary: #94a3b8;
          --home-border-color: rgba(148, 163, 184, 0.2);
          --home-glow-color: rgba(99, 102, 241, 0.3);
          --home-shadow-color: rgba(0, 0, 0, 0.2);
          --home-glass-blur: 12px;
          --home-border-radius: 10px;
          --home-transition-speed: 0.3s;
        }

        /* Main Section */
        #home {
          background: transparent;
          position: relative;
          overflow: hidden;
          padding: 1rem 0;
          height: fit-content; /* Ensure section height adapts to content */
        }

        /* Particle Effects */
        .home-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .home-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--home-primary);
          border-radius: 50%;
          opacity: 0;
          animation: home-particle-float 6s ease-in-out infinite;
        }

        .home-particle-1 { left: 10%; animation-delay: 0s; }
        .home-particle-2 { left: 25%; animation-delay: 1s; }
        .home-particle-3 { left: 40%; animation-delay: 2s; }
        .home-particle-4 { left: 60%; animation-delay: 3s; }
        .home-particle-5 { left: 75%; animation-delay: 4s; }

        /* Content Styles */
        .glow-text {
          color: var(--home-text-primary);
          text-shadow: 0 0 10px var(--home-glow-color);
          transition: all var(--home-transition-speed) ease;
        }

        .glow-text:hover {
          text-shadow: 0 0 20px var(--home-primary);
        }

        .text-gradient {
          background: linear-gradient(135deg, var(--home-primary), var(--home-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }

        .lead {
          color: var(--home-text-secondary);
          font-size: 1.25rem;
          transition: all var(--home-transition-speed) ease;
        }

        .lead:hover {
          color: var(--home-text-primary);
        }

        .glass-card {
          background: var(--home-bg-card);
          backdrop-filter: blur(var(--home-glass-blur));
          border: 1px solid var(--home-border-color);
          transition: all var(--home-transition-speed) ease;
        }

        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px var(--home-shadow-color);
          border-color: var(--home-primary);
        }

        .profile-image {
          transition: all var(--home-transition-speed) ease;
        }

        .profile-image:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px var(--home-glow-color);
        }

        .loading {
          animation: pulse 1.5s ease-in-out infinite;
        }

        /* Animations */
        @keyframes animate-slide-up {
          0% { transform: translateY(50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes animate-fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes home-particle-float {
          0% { bottom: 0; opacity: 0; transform: translateX(0) scale(0); }
          50% { opacity: 0.8; transform: translateX(20px) scale(1); }
          100% { bottom: 100%; opacity: 0; transform: translateX(-10px) scale(0.5); }
        }

        .animate-slide-up {
          animation: animate-slide-up 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: animate-fade-in 1s ease-out forwards;
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
          :root {
            --home-bg-card: rgba(30, 41, 59, 0.7);
            --home-text-primary: #e2e8f0;
            --home-text-secondary: #a1a1aa;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .glow-text {
            font-size: 2.5rem;
          }

          .text-gradient {
            font-size: 1.75rem;
          }

          .lead {
            font-size: 1rem;
          }

          .glass-card, .profile-image {
            width: 200px;
            height: 200px;
          }
        }

        @media (max-width: 576px) {
          .glow-text {
            font-size: 2rem;
          }

          .text-gradient {
            font-size: 1.5rem;
          }

          .lead {
            font-size: 0.9rem;
          }

          .glass-card, .profile-image {
            width: 150px;
            height: 150px;
          }

          .fas.fa-user {
            font-size: 3rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Home;