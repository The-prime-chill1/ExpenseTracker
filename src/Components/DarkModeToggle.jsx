import React, { useState, useEffect } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import './DarkModeToggle.css'

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark' || (!saved && true)
  })

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <button className="dark-mode-toggle" onClick={() => setIsDark(!isDark)}>
      {isDark ? <FiSun /> : <FiMoon />}
    </button>
  )
}

export default DarkModeToggle