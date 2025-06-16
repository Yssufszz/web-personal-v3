import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { supabase } from '../../services/supabase';
import HTMLFlipBook from 'react-pageflip';
import Modal from 'react-modal';
import { gsap } from 'gsap';

// Bind modal to app element for accessibility
Modal.setAppElement('#root');

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="no-data-container">
        <div className="no-data-icon">⚠️</div>
        <p className="no-data-text">Something went wrong. Please try again.</p>
      </div>;
    }
    return this.props.children;
  }
}

const Projects = () => {
  const { language, t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    fetchProjects();

    // Disable vertical scrolling for the section
    const section = sectionRef.current;
    const preventScroll = (e) => e.preventDefault();

    if (section) {
      section.addEventListener('wheel', preventScroll, { passive: false });
      section.addEventListener('touchmove', preventScroll, { passive: false });
    }

    return () => {
      if (section) {
        section.removeEventListener('wheel', preventScroll);
        section.removeEventListener('touchmove', preventScroll);
      }
    };
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setProjects(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error.message);
      setLoading(false);
    }
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setModalIsOpen(true);
    gsap.fromTo(
      '.modal-content',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
  };

  const closeModal = () => {
    gsap.to('.modal-content', {
      y: 50,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setModalIsOpen(false);
        setSelectedProject(null);
      },
    });
  };

  const handleSliderChange = (e) => {
    const page = parseInt(e.target.value, 10);
    if (page <= projects.length + 1) {
      setCurrentPage(page);
      if (bookRef.current) {
        bookRef.current.pageFlip().flip(page);
      }
    }
  };

  const handlePageFlip = (e) => {
    setCurrentPage(e.data);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">{t('loading')}</p>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          /* Book Section Styles */
          .projects-section {
            position: relative;
            padding: 5rem 0;
            background: var(--bg);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: hidden;
            touch-action: none;
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
              radial-gradient(circle at 80% 70%, var(--secondary) 0%, transparent 50%);
            opacity: 0.05;
            z-index: -1;
            animation: floatingOrbs 20s ease-in-out infinite;
          }

          @keyframes floatingOrbs {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }

          .section-title {
            font-size: 3.5rem;
            font-weight: 800;
            text-align: center;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 30px var(--glow-color);
          }

          .section-subtitle {
            text-align: center;
            color: var(--text-secondary);
            font-size: 1.2rem;
            margin-bottom: 3rem;
            max-width: 600px;
          }

          /* Enhanced Book Styles */
          .book-container {
            width: 100%;
            max-width: 1000px;
            height: 600px;
            margin: 0 auto;
            perspective: 2000px;
            overflow: hidden;
            touch-action: none;
          }

          .flip-book {
            width: 100%;
            height: 100%;
            box-shadow: 0 0 0 transparent;
            border-radius: 15px;
            background: linear-gradient(145deg, var(--bg-card), var(--bg));
            transition: transform 0.6s ease;
            transform-style: preserve-3d;
          }

          .flip-book:hover {
            transform: scale(1.02) rotateX(2deg) rotateY(2deg);
          }

          .book-page {
            background: linear-gradient(145deg, var(--bg), var(--bg-card));
            border: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 2.5rem;
            cursor: pointer;
            transition: all var(--transition-speed) ease;
            overflow: hidden;
            position: relative;
            opacity: 0;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="none" stroke="%2300000010" stroke-width="0.5" x="0" y="0" width="100" height="100"/></svg>');
            background-size: 20px 20px;
            box-shadow: none;
          }

          .book-page.entered {
            opacity: 1;
            transition: opacity 0.6s ease-in-out;
          }

          .book-page:hover {
            background: linear-gradient(145deg, var(--bg-card), var(--primary));
            transform: translateZ(10px);
            box-shadow: 0 10px 30px var(--shadow-color);
          }

          .book-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1), transparent);
            opacity: 0;
            transition: opacity var(--transition-speed) ease;
          }

          .book-page:hover::before {
            opacity: 0.3;
          }

          .book-page img {
            width: 100%;
            height: 70%;
            object-fit: cover;
            border-radius: 12px;
            margin-bottom: 1.2rem;
            transition: transform 0.4s ease, box-shadow 0.4s ease;
            box-shadow: 0 5px 20px var(--shadow-color);
          }

          .book-page img:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 30px var(--shadow-color);
          }

          .book-page h3 {
            font-size: 1.6rem;
            font-weight: 700;
            text-align: center;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 10px var(--glow-color);
            transition: transform 0.4s ease;
          }

          .book-page:hover h3 {
            transform: translateY(-5px);
          }

          .book-cover, .book-back-cover {
            background: linear-gradient(145deg, var(--primary), var(--secondary));
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: white;
            text-align: center;
            padding: 3rem;
            border-radius: 15px 0 0 15px;
            position: relative;
            overflow: hidden;
            opacity: 0;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="%23FFFFFF20" stroke-width="0.5"/></svg>');
            background-size: 50px 50px;
            box-shadow: none;
          }

          .book-back-cover {
            border-radius: 0 15px 15px 0;
          }

          .book-cover.entered, .book-back-cover.entered {
            opacity: 1;
            transition: opacity 0.6s ease-in-out;
          }

          .book-cover::before, .book-back-cover::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent);
            transform: rotate(45deg);
            transition: transform 0.8s ease;
          }

          .book-cover:hover::before, .book-back-cover:hover::before {
            transform: rotate(55deg);
          }

          .book-cover h1, .book-back-cover h1 {
            font-size: 3.2rem;
            font-weight: 800;
            margin-bottom: 1.2rem;
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
            transition: transform 0.4s ease;
            z-index: 1;
          }

          .book-cover:hover h1, .book-back-cover:hover h1 {
            transform: scale(1.1);
          }

          .book-cover p, .book-back-cover p {
            font-size: 1.3rem;
            opacity: 0.9;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
            z-index: 1;
          }

          /* Slider Styles */
          .slider-container {
            max-width: 500px;
            margin: 2rem auto;
            padding: 0 1rem;
          }

          .page-slider {
            width: 100%;
            height: 8px;
            border-radius: 5px;
            background: var(--border-color);
            outline: none;
            opacity: 0.7;
            transition: opacity var(--transition-speed) ease;
            cursor: pointer;
          }

          .page-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            cursor: pointer;
            box-shadow: 0 0 10px var(--glow-color);
            transition: transform var(--transition-speed) ease;
          }

          .page-slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            cursor: pointer;
            box-shadow: 0 0 10px var(--glow-color);
            transition: transform var(--transition-speed) ease;
          }

          .page-slider:hover {
            opacity: 1;
          }

          .page-slider::-webkit-slider-thumb:hover {
            transform: scale(1.2);
          }

          .page-slider::-moz-range-thumb:hover {
            transform: scale(1.2);
          }

          /* Modal Styles */
          .modal-overlay {
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            position: fixed;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }

          .modal-content {
            background: var(--bg);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            max-width: 400px;
            width: 85%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 10px 50px var(--shadow-color);
          }

          .modal-close {
            position: absolute;
            top: 0.8rem;
            right: 0.8rem;
            background: none;
            border: none;
            font-size: 1.2rem;
            color: var(--text-secondary);
            cursor: pointer;
            transition: color var(--transition-speed) ease;
          }

          .modal-close:hover {
            color: var(--primary);
          }

          .project-card-img {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-radius: var(--border-radius) var(--border-radius) 0 0;
          }

          .project-card-body {
            padding: 1.2rem;
          }

          .project-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .project-description {
            color: var(--text-secondary);
            margin-bottom: 1rem;
            line-height: 1.5;
            font-size: 0.95rem;
          }

          .tech-stack {
            margin-bottom: 1rem;
          }

          .tech-label {
            color: var(--text-secondary);
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 0.4rem;
            display: block;
          }

          .tech-badges {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
          }

          .tech-badge {
            padding: 0.3rem 0.6rem;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            border-radius: 15px;
            font-size: 0.75rem;
            font-weight: 500;
          }

          .project-actions {
            display: flex;
            gap: 0.8rem;
          }

          .project-btn {
            flex: 1;
            padding: 0.6rem;
            border: none;
            border-radius: 40px;
            font-weight: 600;
            text-align: center;
            text-decoration: none;
            transition: all var(--transition-speed) ease;
            font-size: 0.9rem;
          }

          .project-btn-primary {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
          }

          .project-btn-outline {
            border: 2px solid var(--primary);
            color: var(--primary);
            background: transparent;
          }

          .project-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px var(--glow-color);
          }

          .project-btn-outline:hover {
            background: var(--primary);
            color: white;
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

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .loading-text {
            color: var(--text-secondary);
            font-size: 1.1rem;
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

            .book-container {
              height: 500px;
            }

            .book-cover h1, .book-back-cover h1 {
              font-size: 2.5rem;
            }

            .book-cover p, .book-back-cover p {
              font-size: 1rem;
            }

            .book-page img {
              height: 60%;
            }

            .book-page h3 {
              font-size: 1.3rem;
            }

            .modal-content {
              width: 90%;
            }

            .slider-container {
              max-width: 400px;
            }
          }

          @media (max-width: 480px) {
            .projects-section {
              padding: 3rem 0;
            }

            .section-title {
              font-size: 2rem;
            }

            .book-container {
              height: 400px;
            }

            .modal-content {
              width: 95%;
              border-radius: 10px;
            }

            .slider-container {
              max-width: 300px;
            }
          }
        `}
      </style>

      <section id="projects" ref={sectionRef}>
        <div className="container">
          <h2 className="section-title">{t('myProjects')}</h2>
          <p className="section-subtitle">{t('exploreMyProjects')}</p>

          {projects.length > 0 ? (
            <>
              <div className="book-container">
                <ErrorBoundary>
                  <HTMLFlipBook
                    width={500}
                    height={600}
                    size="stretch"
                    minWidth={300}
                    maxWidth={600}
                    minHeight={400}
                    maxHeight={800}
                    maxShadowOpacity={0}
                    showCover={true}
                    className="flip-book"
                    flippingTime={600}
                    startZIndex={0}
                    drawShadow={false}
                    usePortrait={true}
                    mobileScrollSupport={false}
                    ref={bookRef}
                    onFlip={handlePageFlip}
                    useMouseEvents={true}
                    clickEventForward={true}
                  >
                    <div key="cover" className="book-cover entered">
                      <h1>{t('coverProjects')}</h1>
                      <p>{t('coverExploreMyProjects')}</p>
                    </div>
                    {projects.map((project, index) => (
                      <div
                        key={project.id}
                        className={`book-page entered`}
                        onClick={() => openModal(project)}
                      >
                        {project.image_url && (
                          <img
                            src={project.image_url}
                            alt={(language === 'en' ? project.title_en : project.title_id) || 'Project Image'}
                            loading="lazy"
                          />
                        )}
                        <h3>{(language === 'en' ? project.title_en : project.title_id) || 'Untitled'}</h3>
                      </div>
                    ))}
                    <div key="back-cover" className="book-back-cover entered">
                      <h1>{t('endOfProjects')}</h1>
                      <p>{t('thankYouForExploring')}</p>
                    </div>
                  </HTMLFlipBook>
                </ErrorBoundary>
              </div>
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max={projects.length + 1}
                  value={currentPage}
                  className="page-slider"
                  onChange={handleSliderChange}
                />
              </div>
            </>
          ) : (
            <div className="no-data-container">
              <div className="no-data-icon">📂</div>
              <p className="no-data-text">{t('noData')}</p>
            </div>
          )}

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="modal-content"
            overlayClassName="modal-overlay"
            contentLabel="Project Details"
          >
            {selectedProject && (
              <div>
                <button className="modal-close" onClick={closeModal}>
                  ×
                </button>
                {selectedProject.image_url && (
                  <img
                    src={selectedProject.image_url}
                    className="project-card-img"
                    alt={(language === 'en' ? selectedProject.title_en : selectedProject.title_id) || 'Project Image'}
                  />
                )}
                <div className="project-card-body">
                  <h5 className="project-title">
                    {(language === 'en' ? selectedProject.title_en : selectedProject.title_id) || 'Untitled'}
                  </h5>
                  <p className="project-description">
                    {(language === 'en' ? selectedProject.description_en : selectedProject.description_id) || 'No description available.'}
                  </p>
                  {selectedProject.tech_stack && selectedProject.tech_stack.length > 0 && (
                    <div className="tech-stack">
                      <span className="tech-label">{t('technologies')}:</span>
                      <div className="tech-badges">
                        {selectedProject.tech_stack.map((tech, index) => (
                          <span key={index} className="tech-badge">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="project-actions">
                    {selectedProject.github_url && (
                      <a
                        href={selectedProject.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn project-btn-outline"
                      >
                        {t('viewGitHub')}
                      </a>
                    )}
                    {selectedProject.demo_url && (
                      <a
                        href={selectedProject.demo_url}
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
            )}
          </Modal>
        </div>
      </section>
    </>
  );
};

export default Projects;