import { useEffect, useState } from 'react'
import '../styles/toast.css'

export default function Toast({ message, type }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className={`toast toast-${type}`}>
      <span>{type === 'success' ? '✓' : type === 'error' ? '⚠' : 'ℹ'}</span>
      <p>{message}</p>
    </div>
  )
}