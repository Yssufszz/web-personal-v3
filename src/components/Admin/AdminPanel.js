import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../services/supabase'

const AdminPanel = () => {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState({
    full_name: '',
    bio_en: '',
    bio_id: '',
    avatar_url: ''
  })

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (data) {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

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
      
      if (error) throw error
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile')
    }
  }

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
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
        <div className="card">
          <div className="card-body">
            <h4>Manage Skills</h4>
            <p>Skills management interface will be here</p>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="card">
          <div className="card-body">
            <h4>Manage Projects</h4>
            <p>Projects management interface will be here</p>
          </div>
        </div>
      )}

      {activeTab === 'experience' && (
        <div className="card">
          <div className="card-body">
            <h4>Manage Experience</h4>
            <p>Experience management interface will be here</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel