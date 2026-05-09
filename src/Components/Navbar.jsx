import React, { useState, useEffect } from 'react'
import { FiHome, FiBarChart2, FiMenu, FiX } from 'react-icons/fi'
import DarkModeToggle from './DarkModeToggle'
import './Navbar.css'

const Navbar = ({ activePage, setActivePage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'reports', label: 'Reports', icon: FiBarChart2 }
  ]

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <h2>💰 ExpenseTracker</h2>
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        
        <div className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          {navItems.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActivePage(item.id)
                  setIsMobileMenuOpen(false)
                }}
              >
                <Icon />
                <span>{item.label}</span>
              </button>
            )
          })}
          <DarkModeToggle />
        </div>
      </nav>
    </>
  )
}

export default Navbar