import React, { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../services/supabase'

const Projects = () => {
  const { language, t } = useLanguage()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

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

  if (loading) return <div className="text-center py-5">{t('loading')}</div>

  return (
    <>
      <style>
        {`
          .project-card-img {
            height: 200px;
            width: 100%;
            object-fit: cover;
            object-position: center;
          }
          
          .project-card {
            transition: transform 0.2s ease-in-out;
          }
          
          .project-card:hover {
            transform: translateY(-5px);
          }
        `}
      </style>
      <section id="projects" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">{t('myProjects')}</h2>
          <div className="row">
            {projects.length > 0 ? projects.map((project) => (
              <div key={project.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 project-card">
                  {project.image_url && (
                    <img 
                      src={project.image_url} 
                      className="project-card-img" 
                      alt={language === 'en' ? project.title_en : project.title_id}
                      loading="lazy"
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                      {language === 'en' ? project.title_en : project.title_id}
                    </h5>
                    <p className="card-text">
                      {language === 'en' ? project.description_en : project.description_id}
                    </p>
                    <div className="mb-2">
                      <small className="text-muted">{t('technologies')}: </small>
                      <div>
                        {project.tech_stack?.map((tech, index) => (
                          <span key={index} className="badge bg-secondary me-1 mb-1">{tech}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-auto">
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm me-2">
                          {t('viewGitHub')}
                        </a>
                      )}
                      {project.demo_url && (
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                          {t('viewDemo')}
                        </a>
                      )}
                    </div>
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
    </>
  )
}

export default Projects