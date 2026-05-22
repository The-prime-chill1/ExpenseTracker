import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('mrchills_user') !== null
  return isAuthenticated ? children : <Navigate to="/login" />
}