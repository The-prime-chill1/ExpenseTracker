import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/profile.css'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('mrchills_user')
    if (userData) {
      const parsed = JSON.parse(userData)
      setUser(parsed)
      setName(parsed.name || '')
      setEmail(parsed.email || '')
    }
  }, [])

  const handleUpdate = () => {
    const updated = { ...user, name, email }
    const users = JSON.parse(localStorage.getItem('mrchills_users') || '[]')
    const updatedUsers = users.map(u => u.id === user.id ? updated : u)
    localStorage.setItem('mrchills_users', JSON.stringify(updatedUsers))
    localStorage.setItem('mrchills_user', JSON.stringify(updated))
    setUser(updated)
    alert('Profile updated!')
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure? This will delete ALL your data.')) {
      localStorage.removeItem('mrchills_user')
      localStorage.removeItem('mrchills_transactions')
      localStorage.removeItem('mrchills_categories')
      navigate('/')
    }
  }

  if (!user) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="profile-page">
      <div className="container">
        <h1>Profile</h1>
        
        <div className="profile-card">
          <div className="profile-avatar">
            <span>{user.name?.charAt(0) || 'U'}</span>
          </div>
          
          <div className="profile-form">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
          </div>
          
          <div className="profile-danger">
            <h3>Delete Account</h3>
            <p>This action is irreversible. All your data will be permanently deleted.</p>
            <button className="btn btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  )
}