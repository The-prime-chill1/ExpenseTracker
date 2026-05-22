import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../styles/navbar.css'

export default function Navbar({ darkMode, setDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem('mrchills_user') !== null

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('mrchills_user')
    localStorage.removeItem('mrchills_transactions')
    localStorage.removeItem('mrchills_categories')
    navigate('/')
    setMobileMenuOpen(false)
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo">
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
            <rect width="100" height="100" rx="24" fill="url(#logoGrad)"/>
            <path d="M50 30 L65 55 L35 55 Z" fill="white" opacity="0.9"/>
            <circle cx="50" cy="55" r="8" fill="white"/>
            <rect x="46" y="55" width="8" height="25" rx="2" fill="white"/>
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB"/>
                <stop offset="100%" stopColor="#38BDF8"/>
              </linearGradient>
            </defs>
          </svg>
          <span>Mr. Chills</span>
        </Link>

        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              <Link to="/transactions" onClick={() => setMobileMenuOpen(false)}>Transactions</Link>
              <Link to="/reports" onClick={() => setMobileMenuOpen(false)}>Reports</Link>
              <Link to="/settings" onClick={() => setMobileMenuOpen(false)}>Settings</Link>
              <button onClick={handleLogout} className="nav-logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="btn-primary nav-cta" onClick={() => setMobileMenuOpen(false)}>Sign Up Free</Link>
            </>
          )}
          <button 
            className="theme-toggle" 
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  )
}