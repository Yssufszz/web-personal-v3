import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../services/supabase'

const Projects = () => {
  const { language, t } = useLanguage()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [visibleProjects, setVisibleProjects] = useState(6)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) setProjects(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching projects:', error)
      setLoading(false)
    }
  }

  // Filter projects based on search term
  const filteredProjects = projects.filter(project => {
    if (!searchTerm) return true
    
    const searchLower = searchTerm.toLowerCase()
    const title = (language === 'en' ? project.title_en : project.title_id)?.toLowerCase() || ''
    const description = (language === 'en' ? project.description_en : project.description_id)?.toLowerCase() || ''
    const techStack = project.tech_stack?.join(' ').toLowerCase() || ''
    
    return title.includes(searchLower) || 
           description.includes(searchLower) || 
           techStack.includes(searchLower)
  })

  const handleLoadMore = () => {
    setVisibleProjects(prev => prev + 6)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setVisibleProjects(6) // Reset visible projects when searching
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">{t('loading')}</p>
      </div>
    )
  }

  return (
    <>
      <style>
        {`
          /* Enhanced Project Styles */
          .projects-section {
            position: relative;
            padding: 5rem 0;
            background: var(--gradient-bg);
            overflow: hidden;
          }

          .projects-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 20% 30%, var(--glow-color) 0%, transparent 60%),
              radial-gradient(circle at 80% 70%, var(--secondary) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, var(--accent) 0%, transparent 80%);
            opacity: 0.05;
            z-index: -1;
            animation: floatingOrbs 20s ease-in-out infinite;
          }

          .section-title {
            font-size: 3.5rem;
            font-weight: 800;
            text-align: center;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, var(--primary), var(--secondary), var(--accent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 30px var(--glow-color);
            position: relative;
          }

          .section-subtitle {
            text-align: center;
            color: var(--text-secondary);
            font-size: 1.2rem;
            margin-bottom: 3rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }

          /* Search Bar */
          .search-container {
            max-width: 500px;
            margin: 0 auto 3rem auto;
            position: relative;
          }

          .search-input {
            width: 100%;
            padding: 1rem 1.5rem 1rem 3.5rem;
            background: var(--bg-card);
            backdrop-filter: blur(var(--glass-blur));
            border: 2px solid var(--border-color);
            border-radius: 50px;
            color: var(--text-primary);
            font-size: 1rem;
            font-weight: 500;
            transition: all var(--transition-speed) ease;
            box-shadow: 0 4px 20px var(--shadow-color);
          }

          .search-input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 4px var(--glow-color), 0 8px 30px var(--shadow-color);
            transform: translateY(-2px);
          }

          .search-input::placeholder {
            color: var(--text-secondary);
            opacity: 0.7;
          }

          .search-icon {
            position: absolute;
            left: 1.2rem;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 1.1rem;
            font-weight: 600;
            pointer-events: none;
          }

          .search-results {
            text-align: center;
            margin-bottom: 2rem;
            color: var(--text-secondary);
            font-weight: 500;
          }

          .search-highlight {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
          }

          /* Project Cards */
          .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
          }

          .project-card {
            background: var(--bg-card);
            backdrop-filter: blur(var(--glass-blur));
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            box-shadow: 0 8px 32px var(--shadow-color);
            transition: all var(--transition-speed) ease;
            overflow: hidden;
            position: relative;
            height: 100%;
            display: flex;
            flex-direction: column;
            animation: slideInUp 0.6s ease-out;
          }

          .project-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
            transform: scaleX(0);
            transition: transform var(--transition-speed) ease;
          }

          .project-card:hover::before {
            transform: scaleX(1);
          }

          .project-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 25px 50px var(--shadow-color);
            border-color: var(--primary);
          }

          .project-card-img {
            height: 220px;
            width: 100%;
            object-fit: cover;
            object-position: center;
            transition: all var(--transition-speed) ease;
            position: relative;
          }

          .project-card:hover .project-card-img {
            transform: scale(1.1);
          }

          .project-card-body {
            padding: 1.5rem;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
          }

          .project-title {
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .project-description {
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
            line-height: 1.6;
            flex-grow: 1;
          }

          .tech-stack {
            margin-bottom: 1.5rem;
          }

          .tech-label {
            color: var(--text-secondary);
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            display: block;
          }

          .tech-badges {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .tech-badge {
            padding: 0.4rem 0.8rem;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
            transition: all var(--transition-speed) ease;
            position: relative;
            overflow: hidden;
          }

          .tech-badge::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.3s;
          }

          .tech-badge:hover::before {
            left: 100%;
          }

          .tech-badge:hover {
            transform: scale(1.05);
            box-shadow: 0 3px 10px var(--glow-color);
          }

          .project-actions {
            display: flex;
            gap: 1rem;
            margin-top: auto;
          }

          .project-btn {
            flex: 1;
            padding: 0.75rem 1rem;
            border: none;
            border-radius: 50px;
            font-weight: 600;
            text-decoration: none;
            text-align: center;
            transition: all var(--transition-speed) ease;
            position: relative;
            overflow: hidden;
          }

          .project-btn-primary {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            box-shadow: 0 4px 15px var(--glow-color);
          }

          .project-btn-outline {
            border: 2px solid var(--primary);
            color: var(--primary);
            background: transparent;
          }

          .project-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px var(--glow-color);
          }

          .project-btn-outline:hover {
            background: var(--primary);
            color: white;
          }

          /* Load More Button */
          .load-more-container {
            text-align: center;
            margin-top: 3rem;
          }

          .load-more-btn {
            padding: 1rem 2rem;
            background: linear-gradient(135deg, var(--secondary), var(--accent));
            color: white;
            border: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all var(--transition-speed) ease;
            position: relative;
            overflow: hidden;
          }

          .load-more-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }

          .load-more-btn:hover::before {
            left: 100%;
          }

          .load-more-btn:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 10px 30px var(--glow-color);
          }

          /* Loading Styles */
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            gap: 1rem;
          }

          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid var(--border-color);
            border-top: 3px solid var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          .loading-text {
            color: var(--text-secondary);
            font-size: 1.1rem;
            font-weight: 500;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* No Data State */
          .no-data-container {
            text-align: center;
            padding: 4rem 2rem;
            color: var(--text-secondary);
          }

          .no-data-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
            opacity: 0.5;
          }

          .no-data-text {
            font-size: 1.2rem;
            font-weight: 500;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .section-title {
              font-size: 2.5rem;
            }
            
            .projects-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }
            
            .filter-container {
              gap: 0.5rem;
            }
            
            .search-container {
              margin-bottom: 2rem;
            }
            
            .search-input {
              padding: 0.8rem 1rem 0.8rem 3rem;
              font-size: 0.9rem;
            }
            
            .project-actions {
              flex-direction: column;
            }
          }

          @media (max-width: 480px) {
            .projects-section {
              padding: 3rem 0;
            }
            
            .section-title {
              font-size: 2rem;
            }
            
            .project-card-body {
              padding: 1rem;
            }
            
            .filter-container {
              justify-content: center;
            }
            
            .search-input {
              padding: 0.7rem 0.8rem 0.7rem 2.5rem;
              font-size: 0.85rem;
            }
            
            .search-icon {
              left: 1rem;
              font-size: 1rem;
            }
          }
        `}
      </style>
      
      <section id="projects">
        <div className="container">
          {/* Section Header */}
          <h2 className="section-title">{t('myProjects')}</h2>
          <p className="section-subtitle">
            {t('exploreMyProjects')}
          </p>

          {/* Search Bar */}
          <div className="search-container">
            <div className="search-icon">🔍</div>
            <input
              type="text"
              className="search-input"
              placeholder={t('searchProjects')}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Search Results Info */}
          {searchTerm && (
            <div className="search-results">
              Found <span className="search-highlight">{filteredProjects.length}</span> project
              {filteredProjects.length !== 1 ? 's' : ''} matching 
              "<span className="search-highlight">{searchTerm}</span>"
            </div>
          )}

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <>
              <div className="projects-grid">
                {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                  <div 
                    key={project.id} 
                    className="project-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {project.image_url && (
                      <img 
                        src={project.image_url} 
                        className="project-card-img" 
                        alt={language === 'en' ? project.title_en : project.title_id}
                        loading="lazy"
                      />
                    )}
                    
                    <div className="project-card-body">
                      <h5 className="project-title">
                        {language === 'en' ? project.title_en : project.title_id}
                      </h5>
                      
                      <p className="project-description">
                        {language === 'en' ? project.description_en : project.description_id}
                      </p>
                      
                      {project.tech_stack && project.tech_stack.length > 0 && (
                        <div className="tech-stack">
                          <span className="tech-label">{t('technologies')}:</span>
                          <div className="tech-badges">
                            {project.tech_stack.map((tech, index) => (
                              <span key={index} className="tech-badge">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="project-actions">
                        {project.github_url && (
                          <a 
                            href={project.github_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="project-btn project-btn-outline"
                          >
                            {t('viewGitHub')}
                          </a>
                        )}
                        {project.demo_url && (
                          <a 
                            href={project.demo_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="project-btn project-btn-primary"
                          >
                            {t('viewDemo')}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {visibleProjects < filteredProjects.length && (
                <div className="load-more-container">
                  <button 
                    className="load-more-btn"
                    onClick={handleLoadMore}
                  >
                    Load More Projects
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-data-container">
              <div className="no-data-icon">📂</div>
              <p className="no-data-text">{t('noData')}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Projects