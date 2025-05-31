import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../services/supabase'

const AdminPanel = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState({
    full_name: '',
    bio_en: '',
    bio_id: '',
    avatar_url: ''
  })

  // States for Skills
  const [skills, setSkills] = useState([])
  const [skillForm, setSkillForm] = useState({
    name_en: '',
    name_id: '',
    level: 1,
    category: ''
  })
  const [editingSkill, setEditingSkill] = useState(null)

  // States for Projects
  const [projects, setProjects] = useState([])
  const [projectForm, setProjectForm] = useState({
    title_en: '',
    title_id: '',
    description_en: '',
    description_id: '',
    tech_stack: '',
    github_url: '',
    demo_url: '',
    image_url: ''
  })
  const [editingProject, setEditingProject] = useState(null)

  // States for Experience
  const [experiences, setExperiences] = useState([])
  const [experienceForm, setExperienceForm] = useState({
    company_en: '',
    company_id: '',
    position_en: '',
    position_id: '',
    description_en: '',
    description_id: '',
    start_date: '',
    end_date: '',
    is_current: false
  })
  const [editingExperience, setEditingExperience] = useState(null)

  // Memoized fetch functions to prevent dependency issues
  const fetchProfile = useCallback(async () => {
    if (!user?.id) return
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (error) {
        console.error('Error fetching profile:', error)
        return
      }
      
      if (data) {
        setProfile(data)
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
    }
  }, [user?.id])

  const fetchSkills = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching skills:', error)
        return
      }
      
      if (data) {
        setSkills(data)
      }
    } catch (err) {
      console.error('Error fetching skills:', err)
    }
  }, [])

  const fetchProjects = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching projects:', error)
        return
      }
      
      if (data) {
        setProjects(data)
      }
    } catch (err) {
      console.error('Error fetching projects:', err)
    }
  }, [])

  const fetchExperiences = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false })
      
      if (error) {
        console.error('Error fetching experiences:', error)
        return
      }
      
      if (data) {
        setExperiences(data)
      }
    } catch (err) {
      console.error('Error fetching experiences:', err)
    }
  }, [])

  useEffect(() => {
    const fetchAllData = async () => {
      if (user) {
        await Promise.all([
          fetchProfile(),
          fetchSkills(),
          fetchProjects(),
          fetchExperiences()
        ])
      }
    }
    
    fetchAllData()
  }, [user, fetchProfile, fetchSkills, fetchProjects, fetchExperiences])

  const updateProfile = async (e) => {
    e.preventDefault()
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          ...profile,
          updated_at: new Date().toISOString()
        })
      
      if (error) {
        console.error('Error updating profile:', error)
        alert('Error updating profile: ' + error.message)
        return
      }
      
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile: ' + error.message)
    }
  }

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }

  // Skills Functions
  const handleSkillSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingSkill) {
        const { error } = await supabase
          .from('skills')
          .update(skillForm)
          .eq('id', editingSkill.id)
        
        if (error) {
          console.error('Error updating skill:', error)
          alert('Error updating skill: ' + error.message)
          return
        }
        
        alert('Skill updated successfully!')
        setEditingSkill(null)
      } else {
        const { error } = await supabase
          .from('skills')
          .insert([skillForm])
        
        if (error) {
          console.error('Error adding skill:', error)
          alert('Error adding skill: ' + error.message)
          return
        }
        
        alert('Skill added successfully!')
      }
      
      setSkillForm({
        name_en: '',
        name_id: '',
        level: 1,
        category: ''
      })
      fetchSkills()
    } catch (error) {
      console.error('Error saving skill:', error)
      alert('Error saving skill: ' + error.message)
    }
  }

  const editSkill = (skill) => {
    setSkillForm(skill)
    setEditingSkill(skill)
  }

  const deleteSkill = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        const { error } = await supabase
          .from('skills')
          .delete()
          .eq('id', id)
        
        if (error) {
          console.error('Error deleting skill:', error)
          alert('Error deleting skill: ' + error.message)
          return
        }
        
        alert('Skill deleted successfully!')
        fetchSkills()
      } catch (error) {
        console.error('Error deleting skill:', error)
        alert('Error deleting skill: ' + error.message)
      }
    }
  }

  // Projects Functions
  const handleProjectSubmit = async (e) => {
    e.preventDefault()
    try {
      const projectData = {
        ...projectForm,
        tech_stack: projectForm.tech_stack.split(',').map(tech => tech.trim())
      }

      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id)
        
        if (error) {
          console.error('Error updating project:', error)
          alert('Error updating project: ' + error.message)
          return
        }
        
        alert('Project updated successfully!')
        setEditingProject(null)
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData])
        
        if (error) {
          console.error('Error adding project:', error)
          alert('Error adding project: ' + error.message)
          return
        }
        
        alert('Project added successfully!')
      }
      
      setProjectForm({
        title_en: '',
        title_id: '',
        description_en: '',
        description_id: '',
        tech_stack: '',
        github_url: '',
        demo_url: '',
        image_url: ''
      })
      fetchProjects()
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Error saving project: ' + error.message)
    }
  }

  const editProject = (project) => {
    setProjectForm({
      ...project,
      tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : project.tech_stack
    })
    setEditingProject(project)
  }

  const deleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id)
        
        if (error) {
          console.error('Error deleting project:', error)
          alert('Error deleting project: ' + error.message)
          return
        }
        
        alert('Project deleted successfully!')
        fetchProjects()
      } catch (error) {
        console.error('Error deleting project:', error)
        alert('Error deleting project: ' + error.message)
      }
    }
  }

  // Experience Functions
  const handleExperienceSubmit = async (e) => {
    e.preventDefault()
    try {
      const experienceData = {
        ...experienceForm,
        is_current: Boolean(experienceForm.is_current),
        start_date: experienceForm.start_date || null,
        end_date: experienceForm.is_current ? null : (experienceForm.end_date || null)
      }

      if (editingExperience) {
        const { error } = await supabase
          .from('experiences')
          .update(experienceData)
          .eq('id', editingExperience.id)
        
        if (error) {
          console.error('Error updating experience:', error)
          alert('Error updating experience: ' + error.message)
          return
        }
        
        alert('Experience updated successfully!')
        setEditingExperience(null)
      } else {
        const { error } = await supabase
          .from('experiences')
          .insert([experienceData])
        
        if (error) {
          console.error('Error adding experience:', error)
          alert('Error adding experience: ' + error.message)
          return
        }
        
        alert('Experience added successfully!')
      }
      
      setExperienceForm({
        company_en: '',
        company_id: '',
        position_en: '',
        position_id: '',
        description_en: '',
        description_id: '',
        start_date: '',
        end_date: '',
        is_current: false
      })
      fetchExperiences()
    } catch (error) {
      console.error('Error saving experience:', error)
      alert('Error saving experience: ' + error.message)
    }
  }

  const editExperience = (experience) => {
    setExperienceForm({
      ...experience,
      is_current: Boolean(experience.is_current),
      start_date: experience.start_date || '',
      end_date: experience.end_date || ''
    })
    setEditingExperience(experience)
  }

  const deleteExperience = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        const { error } = await supabase
          .from('experiences')
          .delete()
          .eq('id', id)
        
        if (error) {
          console.error('Error deleting experience:', error)
          alert('Error deleting experience: ' + error.message)
          return
        }
        
        alert('Experience deleted successfully!')
        fetchExperiences()
      } catch (error) {
        console.error('Error deleting experience:', error)
        alert('Error deleting experience: ' + error.message)
      }
    }
  }

  if (!user) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <p>Please login to access admin panel</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h2>Admin Panel</h2>
      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            Experience
          </button>
        </li>
      </ul>

      {activeTab === 'profile' && (
        <div className="card">
          <div className="card-body">
            <h4>Profile Settings</h4>
            <form onSubmit={updateProfile}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="full_name"
                  value={profile.full_name}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Avatar URL</label>
                <input
                  type="url"
                  className="form-control"
                  name="avatar_url"
                  value={profile.avatar_url}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Bio (English)</label>
                <textarea
                  className="form-control"
                  name="bio_en"
                  rows="4"
                  value={profile.bio_en}
                  onChange={handleProfileChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Bio (Indonesian)</label>
                <textarea
                  className="form-control"
                  name="bio_id"
                  rows="4"
                  value={profile.bio_id}
                  onChange={handleProfileChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'skills' && (
        <div>
          <div className="card mb-4">
            <div className="card-body">
              <h4>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h4>
              <form onSubmit={handleSkillSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Name (English)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={skillForm.name_en}
                        onChange={(e) => setSkillForm({...skillForm, name_en: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Name (Indonesian)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={skillForm.name_id}
                        onChange={(e) => setSkillForm({...skillForm, name_id: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Level (1-5)</label>
                      <select
                        className="form-control"
                        value={skillForm.level}
                        onChange={(e) => setSkillForm({...skillForm, level: parseInt(e.target.value)})}
                      >
                        <option value={1}>1 - Beginner</option>
                        <option value={2}>2 - Novice</option>
                        <option value={3}>3 - Intermediate</option>
                        <option value={4}>4 - Advanced</option>
                        <option value={5}>5 - Expert</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <input
                        type="text"
                        className="form-control"
                        value={skillForm.category}
                        onChange={(e) => setSkillForm({...skillForm, category: e.target.value})}
                        placeholder="e.g., Programming, Design, Database"
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary me-2">
                  {editingSkill ? 'Update Skill' : 'Add Skill'}
                </button>
                {editingSkill && (
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditingSkill(null)
                      setSkillForm({name_en: '', name_id: '', level: 1, category: ''})
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h4>Skills List</h4>
              {skills.length === 0 ? (
                <p>No skills added yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name (EN)</th>
                        <th>Name (ID)</th>
                        <th>Level</th>
                        <th>Category</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skills.map((skill) => (
                        <tr key={skill.id}>
                          <td>{skill.name_en}</td>
                          <td>{skill.name_id}</td>
                          <td>{skill.level}/5</td>
                          <td>{skill.category}</td>
                          <td>
                            <button 
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => editSkill(skill)}
                            >
                              Edit
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteSkill(skill.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div>
          <div className="card mb-4">
            <div className="card-body">
              <h4>{editingProject ? 'Edit Project' : 'Add New Project'}</h4>
              <form onSubmit={handleProjectSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Title (English)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={projectForm.title_en}
                        onChange={(e) => setProjectForm({...projectForm, title_en: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Title (Indonesian)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={projectForm.title_id}
                        onChange={(e) => setProjectForm({...projectForm, title_id: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Description (English)</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={projectForm.description_en}
                    onChange={(e) => setProjectForm({...projectForm, description_en: e.target.value})}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Description (Indonesian)</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={projectForm.description_id}
                    onChange={(e) => setProjectForm({...projectForm, description_id: e.target.value})}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={projectForm.tech_stack}
                    onChange={(e) => setProjectForm({...projectForm, tech_stack: e.target.value})}
                    placeholder="e.g., React, Node.js, MongoDB"
                  />
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">GitHub URL</label>
                      <input
                        type="url"
                        className="form-control"
                        value={projectForm.github_url}
                        onChange={(e) => setProjectForm({...projectForm, github_url: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Demo URL</label>
                      <input
                        type="url"
                        className="form-control"
                        value={projectForm.demo_url}
                        onChange={(e) => setProjectForm({...projectForm, demo_url: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Image URL</label>
                      <input
                        type="url"
                        className="form-control"
                        value={projectForm.image_url}
                        onChange={(e) => setProjectForm({...projectForm, image_url: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary me-2">
                  {editingProject ? 'Update Project' : 'Add Project'}
                </button>
                {editingProject && (
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditingProject(null)
                      setProjectForm({
                        title_en: '', title_id: '', description_en: '', description_id: '',
                        tech_stack: '', github_url: '', demo_url: '', image_url: ''
                      })
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h4>Projects List</h4>
              {projects.length === 0 ? (
                <p>No projects added yet.</p>
              ) : (
                <div className="row">
                  {projects.map((project) => (
                    <div key={project.id} className="col-md-6 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{project.title_en}</h5>
                          <p className="card-text">{project.description_en?.substring(0, 100)}...</p>
                          <p className="small text-muted">
                            Tech: {Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : project.tech_stack}
                          </p>
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => editProject(project)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deleteProject(project.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'experience' && (
        <div>
          <div className="card mb-4">
            <div className="card-body">
              <h4>{editingExperience ? 'Edit Experience' : 'Add New Experience'}</h4>
              <form onSubmit={handleExperienceSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Company (English)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={experienceForm.company_en}
                        onChange={(e) => setExperienceForm({...experienceForm, company_en: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Company (Indonesian)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={experienceForm.company_id}
                        onChange={(e) => setExperienceForm({...experienceForm, company_id: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Position (English)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={experienceForm.position_en}
                        onChange={(e) => setExperienceForm({...experienceForm, position_en: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Position (Indonesian)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={experienceForm.position_id}
                        onChange={(e) => setExperienceForm({...experienceForm, position_id: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Description (English)</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={experienceForm.description_en}
                    onChange={(e) => setExperienceForm({...experienceForm, description_en: e.target.value})}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Description (Indonesian)</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={experienceForm.description_id}
                    onChange={(e) => setExperienceForm({...experienceForm, description_id: e.target.value})}
                  ></textarea>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={experienceForm.start_date}
                        onChange={(e) => setExperienceForm({...experienceForm, start_date: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={experienceForm.end_date}
                        onChange={(e) => setExperienceForm({...experienceForm, end_date: e.target.value})}
                        disabled={experienceForm.is_current}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <div className="form-check mt-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={experienceForm.is_current}
                          onChange={(e) => setExperienceForm({
                            ...experienceForm, 
                            is_current: e.target.checked,
                            end_date: e.target.checked ? '' : experienceForm.end_date
                          })}
                        />
                        <label className="form-check-label">
                          Current Job
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary me-2">
                  {editingExperience ? 'Update Experience' : 'Add Experience'}
                </button>
                {editingExperience && (
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditingExperience(null)
                      setExperienceForm({
                        company_en: '', company_id: '', position_en: '', position_id: '',
                        description_en: '', description_id: '', start_date: '', end_date: '', is_current: false
                      })
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h4>Experience List</h4>
              {experiences.length === 0 ? (
                <p>No experiences added yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th>Position</th>
                        <th>Duration</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {experiences.map((exp) => (
                        <tr key={exp.id}>
                          <td>{exp.company_en}</td>
                          <td>{exp.position_en}</td>
                          <td>
                            {exp.start_date} - {exp.is_current ? 'Present' : exp.end_date}
                          </td>
                          <td>
                            <button 
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => editExperience(exp)}
                            >
                              Edit
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteExperience(exp.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel