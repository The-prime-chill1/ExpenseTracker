import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import Toast from './components/Toast'
import { AppProvider } from './context/AppContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Profile from './pages/Profile'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('mrchills_theme')
    return saved === 'dark' || (saved === null && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('mrchills_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('mrchills_theme', 'light')
    }
  }, [darkMode])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <AppProvider showToast={showToast}>
      <BrowserRouter>
        <div className="app-wrapper">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/transactions" element={
                <PrivateRoute>
                  <Transactions />
                </PrivateRoute>
              } />
              <Route path="/reports" element={
                <PrivateRoute>
                  <Reports />
                </PrivateRoute>
              } />
              <Route path="/settings" element={
                <PrivateRoute>
                  <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
                </PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
          {toast && <Toast message={toast.message} type={toast.type} />}
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App