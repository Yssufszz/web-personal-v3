import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const AdminLogin = () => {
  const { user, signInWithGitHub } = useAuth()

  if (user) {
    return <Navigate to="/admin" replace />
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body text-center py-5">
              <div className="mb-4">
                <i className="fas fa-user-shield fa-3x text-primary mb-3"></i>
                <h3 className="card-title">Admin Access</h3>
              </div>
              <p className="text-muted mb-4">
                This area is restricted to authorized personnel only.
              </p>
              <button 
                className="btn btn-primary btn-lg px-4"
                onClick={signInWithGitHub}
              >
                <i className="fab fa-github me-2"></i>
                Login with GitHub
              </button>
              <div className="mt-4">
                <small className="text-muted">
                  Only authorized GitHub accounts can access this panel.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin